from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

from bs4 import BeautifulSoup
import requests
import os
import time

# 설정
options = Options()
# options.add_argument("--headless")  # 필요 시 주석 해제
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

# 크롬 드라이버 실행
driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=options
)

# 타겟 페이지 열기
driver.get("https://en.namu.wiki/w/오버워치 2/전장")
time.sleep(3)  # 렌더링 대기

# 렌더링된 HTML 파싱
html = driver.page_source
soup = BeautifulSoup(html, "html.parser")
driver.quit()

# 저장 디렉토리 설정
SAVE_DIR = "./namuwiki_flags"
os.makedirs(SAVE_DIR, exist_ok=True)

# 국기 이미지 태그 수집
img_tags = soup.find_all("img", class_="aG2YJYo4")
print(f"[INFO] 국기 추정 이미지 개수: {len(img_tags)}")

saved = 0
for img in img_tags:
    src = img.get("data-src") or img.get("src")
    if not src:
        continue
    if src.startswith("//"):
        src = "https:" + src
    alt = img.get("alt", "flag").replace(":", "").replace(" ", "_")[:50]
    ext = ".svg" if ".svg" in src else ".png"
    filename = f"{alt}{ext}"
    save_path = os.path.join(SAVE_DIR, filename)

    try:
        img_data = requests.get(src).content
        with open(save_path, "wb") as f:
            f.write(img_data)
        print(f"[✓] 저장 완료: {filename}")
        saved += 1
    except Exception as e:
        print(f"[X] 저장 실패: {filename} → {e}")

print(f"[완료] 총 {saved}개 국기 이미지 저장됨")

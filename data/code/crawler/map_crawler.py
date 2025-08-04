# D:\final\Watchpoint\frontend\src\crawler\map_crawler.py

import os
import time
import requests
from urllib.parse import urljoin
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

# URL 설정
BASE_URL = "https://statbanana.com/images"

# 저장 경로 설정
SAVE_DIR = os.path.join("..", "..", "public", "map_images")
os.makedirs(SAVE_DIR, exist_ok=True)

# Selenium 브라우저 설정
options = Options()
options.add_argument("--headless")
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# 페이지 로딩
driver.get(BASE_URL)
time.sleep(3)  # JS 로딩 대기

# 렌더링된 페이지 소스 추출
soup = BeautifulSoup(driver.page_source, "html.parser")
driver.quit()

# 이미지 태그 수집
img_tags = soup.find_all("img")
print(f"[INFO] 이미지 {len(img_tags)}개 수집됨")

# 이미지 다운로드
for img in img_tags:
    src = img.get("src")
    if not src:
        continue

    img_url = urljoin(BASE_URL, src)
    filename = os.path.basename(src)
    save_path = os.path.join(SAVE_DIR, filename)

    try:
        img_data = requests.get(img_url).content
        with open(save_path, "wb") as f:
            f.write(img_data)
        print(f"[✓] 저장 완료: {filename}")
    except Exception as e:
        print(f"[X] 저장 실패: {filename} → {e}")

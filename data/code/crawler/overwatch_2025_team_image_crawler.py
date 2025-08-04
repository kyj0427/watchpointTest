
import os
import re
import time
import requests
from urllib.parse import urljoin
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from tqdm import tqdm

# ===================== Helper Functions =====================

def to_camel_case(text):
    return ''.join(word.capitalize() for word in re.split(r'\s+|_', text.strip()))

def sanitize_folder_name(name):
    return re.sub(r'[\\/:*?"<>|]', '', name.strip().lower())

def get_file_extension(src):
    for ext in ['.jpg', '.jpeg', '.png', '.webp', '.svg']:
        if ext in src.lower():
            return ext if ext != '.jpeg' else '.jpg'
    return ''

def download_image(img_url, save_path):
    try:
        response = requests.get(img_url, timeout=10)
        if response.status_code == 200:
            with open(save_path, "wb") as f:
                f.write(response.content)
    except Exception as e:
        print(f"❌ 다운로드 실패: {img_url} → {e}")

# ===================== Crawler Core =====================

BASE_URL = "https://namu.wiki"
ENTRY_URL = "https://namu.wiki/w/2025%20오버워치%20챔피언스%20시리즈%20코리아%20스테이지%202"
SAVE_ROOT = "D:/final/Watchpoint/frontend/public/game_team"

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
driver = webdriver.Chrome(options=chrome_options)

print("🔍 메인 페이지 접속 중...")
driver.get(ENTRY_URL)
time.sleep(3)
soup = BeautifulSoup(driver.page_source, "html.parser")

# 팀 링크 수집
print("📎 팀 링크 수집 중...")
team_links = {}
for a in soup.find_all("a", href=True):
    if a["href"].startswith("/w/") and "2025" not in a["href"]:
        team_name = a.text.strip()
        team_url = urljoin(BASE_URL, a["href"])
        if team_name and "vs" not in team_name.lower() and len(team_name) < 30:
            team_links[team_name] = team_url

print(f"✅ 팀 수집 완료: {len(team_links)}팀\n")

# 팀 페이지별 이미지 수집
for team_name, team_url in tqdm(team_links.items()):
    print(f"\n🚩 크롤링 시작: {team_name} ({team_url})")

    folder_name = sanitize_folder_name(team_name)
    save_dir = os.path.join(SAVE_ROOT, folder_name)
    os.makedirs(save_dir, exist_ok=True)

    driver.get(team_url)
    time.sleep(2)
    soup = BeautifulSoup(driver.page_source, "html.parser")
    images = soup.find_all("img")

    used_filenames = set()

    for idx, img in enumerate(images):
        src = img.get("src") or img.get("data-src")
        if not src:
            continue
        if src.startswith("//"):
            src = "https:" + src
        if not src.startswith("http"):
            continue

        ext = get_file_extension(src)
        if ext == "":
            continue

        alt = img.get("alt") or f"image{idx}"
        alt_clean = re.sub(r'[^\uAC00-\uD7A3\w\s]', '', alt).strip()
        filename = to_camel_case(alt_clean)

        if not filename or filename.lower() in ['px', 'image', 'icon']:
            filename = f"Image{idx+1}"

        while filename in used_filenames:
            filename += "_"

        used_filenames.add(filename)

        save_path = os.path.join(save_dir, f"{filename}{ext}")
        download_image(src, save_path)

driver.quit()
print("\n🎉 모든 팀 이미지 크롤링 완료!")

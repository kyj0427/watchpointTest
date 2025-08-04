# D:\final\Watchpoint\frontend\src\crawler\fandom_map_crawler.py

import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

# 대상 URL
URL = "https://overwatch.fandom.com/wiki/Maps"

# 저장 경로
SAVE_DIR = os.path.join("..", "..", "public", "fandom_map_images")
os.makedirs(SAVE_DIR, exist_ok=True)

# HTML 요청
response = requests.get(URL, headers={"User-Agent": "Mozilla/5.0"})
soup = BeautifulSoup(response.text, "html.parser")

# 맵 섹션 추출 (Gallery 포함)
gallery_divs = soup.select("ul.gallery li.gallerybox")

print(f"[INFO] 맵 개수: {len(gallery_divs)}개")

for i, item in enumerate(gallery_divs):
    # 맵 이름
    name_tag = item.select_one(".gallerytext")
    if not name_tag:
        continue
    map_name = name_tag.text.strip().replace(" ", "_")

    # 이미지 URL
    img_tag = item.select_one("img")
    if not img_tag:
        continue
    img_url = img_tag.get("data-src") or img_tag.get("src")
    if not img_url:
        continue

    # 이미지 저장
    filename = f"{map_name}.jpg"
    save_path = os.path.join(SAVE_DIR, filename)

    try:
        img_data = requests.get(img_url).content
        with open(save_path, "wb") as f:
            f.write(img_data)
        print(f"[✓] {map_name} 저장 완료")
    except Exception as e:
        print(f"[X] {map_name} 저장 실패 → {e}")

import requests
from bs4 import BeautifulSoup
import os
from urllib.parse import urljoin

# 대상 URL
url = "https://en.namu.wiki/w/%ED%95%98%EB%82%98%EC%98%A4%EC%B9%B4"
headers = {
    "User-Agent": "Mozilla/5.0"
}

# 요청 및 파싱
res = requests.get(url, headers=headers)
soup = BeautifulSoup(res.text, 'html.parser')

# 이미지 태그 추출
img_tags = soup.find_all('img')

# 저장 폴더 생성
save_folder = "hanaoka_images"
os.makedirs(save_folder, exist_ok=True)

# 이미지 다운로드
for i, img in enumerate(img_tags):
    src = img.get('src')
    if src:
        full_url = urljoin("https:", src) if src.startswith("//") else src
        try:
            img_data = requests.get(full_url).content
            ext = full_url.split('.')[-1].split('?')[0]  # 확장자 추출
            filename = f"hanaoka_img_{i}.{ext}"
            filepath = os.path.join(save_folder, filename)
            with open(filepath, 'wb') as f:
                f.write(img_data)
            print(f"✔ Saved: {filename}")
        except Exception as e:
            print(f"Failed to download {full_url}: {e}")

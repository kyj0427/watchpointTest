
import os
import time
import requests
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
from tqdm import tqdm

TEAM_URLS = {
    "crazy raccoon": "https://namu.wiki/w/Crazy%20Raccoon/%EC%98%A4%EB%B2%84%EC%9B%8C%EC%B9%98",
    "team falcons": "https://namu.wiki/w/Team%20Falcons/%EC%98%A4%EB%B2%84%EC%9B%8C%EC%B9%98",
    "poker face": "https://namu.wiki/w/Poker%20Face(%ED%94%84%EB%A1%9C%EA%B2%8C%EC%9E%84%EB%8B%A8)",
    "t1": "https://namu.wiki/w/T1/%EC%98%A4%EB%B2%84%EC%9B%8C%EC%B9%98%202",
    "zeta division": "https://namu.wiki/w/ZETA%20DIVISION/%EC%98%A4%EB%B2%84%EC%9B%8C%EC%B9%98",
    "old ocean": "https://namu.wiki/w/Old%20Ocean",
    "vec seongnam": "https://namu.wiki/w/VEC/%EC%98%A4%EB%B2%84%EC%9B%8C%EC%B9%98",
    "onside gaming": "https://namu.wiki/w/ONSIDE%20GAMING/%EC%98%A4%EB%B2%84%EC%9B%8C%EC%B9%98%202",
    "all gamers": "https://namu.wiki/w/All%20Gamers%20Global/%EC%98%A4%EB%B2%84%EC%9B%8C%EC%B9%98%202"
}

BASE_SAVE_PATH = r"D:\final\Watchpoint\frontend\public\game_team"

def to_camel_case(name):
    return ''.join(word.capitalize() for word in name.split())

def get_player_links(team_url):
    driver.get(team_url)
    time.sleep(2)
    soup = BeautifulSoup(driver.page_source, "html.parser")

    # 가장 가까운 '로스터 연혁' span을 찾고 이후 가장 가까운 테이블 추출
    roster_spans = soup.find_all("span", string="로스터 연혁")
    for span in roster_spans:
        table = span.find_parent().find_next("table")
        if table:
            break
    else:
        print(f"❗ '로스터 연혁' 항목을 찾을 수 없습니다: {team_url}")
        return []

    links = []
    for row in table.find_all("tr")[1:]:
        cols = row.find_all("td")
        if len(cols) >= 2:
            id_text = cols[0].text.strip()
            name_tag = cols[1].find("a")
            if name_tag and name_tag.get("href"):
                name_text = name_tag.text.strip()
                links.append(("https://namu.wiki" + name_tag["href"], id_text, name_text))
    return links

def download_images_from_profile(url, player_id, player_name, save_dir):
    driver.get(url)
    time.sleep(2)
    soup = BeautifulSoup(driver.page_source, "html.parser")
    imgs = soup.find_all("img")
    saved = 0
    for img in imgs:
        src = img.get("src")
        if not src or not src.startswith("//i.namu.wiki/i/"):
            continue
        full_url = "https:" + src
        ext = os.path.splitext(full_url)[1].split("?")[0]
        if ext.lower() not in [".webp", ".png", ".jpg", ".jpeg"]:
            continue
        filename = f"{player_id}_{player_name}{ext}"
        save_path = os.path.join(save_dir, filename)
        try:
            response = requests.get(full_url)
            with open(save_path, "wb") as f:
                f.write(response.content)
            saved += 1
        except Exception as e:
            print(f"❌ 저장 실패: {full_url} | {e}")
        if saved >= 2:
            break

# 브라우저 세팅
options = Options()
options.add_argument("--headless")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# 전체 크롤링
for team, url in tqdm(TEAM_URLS.items(), desc="팀별 크롤링"):
    player_links = get_player_links(url)
    team_dir = os.path.join(BASE_SAVE_PATH, team, "players")
    os.makedirs(team_dir, exist_ok=True)
    for link, pid, name in player_links:
        print(f"🔍 {team} - {pid}({name})")
        download_images_from_profile(link, pid, name, team_dir)

driver.quit()
print("✅ 전체 크롤링 완료")

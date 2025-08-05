import requests
from bs4 import BeautifulSoup
import re
import csv

# 크롤링 대상 URL
url = "https://www.inven.co.kr/board/overwatch/4680/20582"

# User-Agent 설정
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36"
}

# 페이지 요청
res = requests.get(url, headers=headers)
soup = BeautifulSoup(res.text, "html.parser")

# 게시글 본문 추출 (div 태그)
content_div = soup.select_one("div#powerbbsContent")
text = content_div.get_text(separator="\n")

# 배틀태그 형식: 영문닉네임#숫자
pattern = r"[가-힣a-zA-Z0-9]+#[0-9]{4,5}"
battle_tags = re.findall(pattern, text)

print(" 추출된 배틀태그:")
for tag in battle_tags:
    print("-", tag)

with open("battle_tags.csv", "w", newline="", encoding="utf-8") as f:

    # CSV 작성자(writer) 객체 생성
    writer = csv.writer(f)

    # CSV 첫 줄 제목 "BattleTag"
    writer.writerow(["BattleTag"])

    # 추출한 배틀태그 리스트를 한 줄씩 CSV에 저장
    for tag in battle_tags:
        writer.writerow([tag])  # 리스트 형태로 넘겨야 열로 저장됨
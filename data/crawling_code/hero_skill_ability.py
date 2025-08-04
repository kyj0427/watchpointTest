#  전체 영웅 URL 수집 함수
def get_hero_urls():
    HERO_NAMES = [
        "D.Va", "Doomfist", "Hazard", "Junker_Queen", "Mauga", "Orisa", "Ramattra", "Reinhardt", "Roadhog",
        "Sigma", "Winston", "Wrecking_Ball", "Zarya",
        "Ashe", "Bastion", "Cassidy", "Echo", "Freja", "Genji", "Hanzo", "Junkrat", "Mei", "Pharah", "Reaper", 
        "Sojourn", "Soldier:_76", "Sombra", "Symmetra", "Torbjörn", "Tracer", "Venture", "Widowmaker",
        "Ana", "Baptiste", "Brigitte", "Illari", "Juno", "Kiriko", "Lifeweaver", "Lúcio", "Mercy", "Moira", 
        "Wuyang", "Zenyatta"
    ]
    return [f"https://overwatch.fandom.com/wiki/{name}" for name in HERO_NAMES]

def crawl_hero(url):
    import requests as rq
    from bs4 import BeautifulSoup
    import csv
    import os
    import pandas as ps

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }

    # 웹페이지 요청 
    response = rq.get(url, headers=headers)  

    # HTML 분석 
    soup = BeautifulSoup(response.text , "html.parser")

    #1. 영웅 이름 추출 (id값)
    hero_name = soup.select_one("h1#firstHeading").text.strip()


    # 중복 체크 (이미 저장된 영웅이면 건너뛰기)
    csv_path = "hero_detail.csv"
    if os.path.exists(csv_path):
        df = ps.read_csv(csv_path)
        if hero_name in df["hero_name"].values:
            print(f" {hero_name} 이미 저장됨")
            return
        
    #2. 결과저장
    rows = []

    #3. 특전 & 스킬 부분 상세정보 추출 
    for box in soup.select(".ability-box"):
        name = box.select_one(".header").text.strip()

        desc_tag = box.select_one(".summary-description i")
        description = desc_tag.text.strip() if desc_tag else None

        # Minor / Major 특전 구분
        type_tag = box.select_one(".type-block")
        perk_type = type_tag.text.replace("Type", "").strip() if type_tag else None

        # type : 패시브, 궁극기 , 스킬 , 무기 = Ability 통합
        type_group = "Perk"
        if "perk" not in perk_type.lower():
            type_group = "Ability"

        # 4. 상세 정보 추출
        stats = {}
        for row_tag in box.select(".stats .data-row"):
            header = row_tag.select_one(".data-row-header b")
            value = row_tag.select_one(".data-row-value")
            if header and value:
                key = header.text.strip().lower()
                val = value.text.strip()
                stats[key] = val

        # 5. 하나의 row 또는 여러 row (stats 유무에 따라)
        if stats:
            for k, v in stats.items():
                rows.append({
                    "hero_name": hero_name,
                    "type": type_group,
                    "name": name,
                    "description": description,
                    "attribute": k,
                    "attribute_detail": v
                })
        else:
            rows.append({
                "hero_name": hero_name,
                "type": type_group,
                "name": name,
                "description": description,
                "attribute": "",
                "attribute_detail": ""
            })

        # 결과 출력
        for k, v in stats.items():
            print(f"{k} : {v}")

    # 6. CSV 저장
    with open("hero_detail.csv", "a", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        
        # 파일이 새로 만들어진 경우에만 헤더 추가
        if f.tell() == 0:
            writer.writeheader()
        writer.writerows(rows)

#  전체 실행
if __name__ == "__main__":
    urls = get_hero_urls()
    print(f" 총 {len(urls)}명의 영웅 크롤링 시작")

    for idx, url in enumerate(urls, 1):
        print(f"[{idx}/{len(urls)}] → {url}")
        try:
            crawl_hero(url)
        except Exception as e:
            print(f" 오류 발생: {e}")

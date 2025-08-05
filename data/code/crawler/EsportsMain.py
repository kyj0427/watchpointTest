from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from webdriver_manager.chrome import ChromeDriverManager
import time
import csv
import os

# 브라우저 옵션 설정
options = Options()
options.add_argument("--start-maximized")
options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option("useAutomationExtension", False)

# 드라이버 실행
driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=options
)

# 자동화 탐지 우회
driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
    "source": """
        Object.defineProperty(navigator, 'webdriver', {
            get: () => undefined
        })
    """
})

# Liquipedia 페이지 접속
url = "https://liquipedia.net/overwatch/Overwatch_Champions_Series/2024/Major"
driver.get(url)
time.sleep(3)

# 경기 카드 수집
match_boxes = driver.find_elements(By.CLASS_NAME, "brkts-match")

# 스테이지 명 추출 함수
def find_round(match_element):
    try:
        round_div = match_element.find_element(
            By.XPATH, "./ancestor::div[contains(@class, 'brkts-round')]")
        header = round_div.find_element(
            By.XPATH, ".//preceding-sibling::div[contains(@class, 'brkts-header')]")
        return header.text.strip()
    except:
        return "Group"

# 결과 저장 (CSV)
file_exists = os.path.isfile("Overwatch Champions Series 2024 Major.csv")
with open("Overwatch Champions Series 2024 Major.csv", "a", newline="", encoding="utf-8-sig") as csvfile:
    writer = csv.writer(csvfile)
    if not file_exists:
        writer.writerow(["Stage", "Match", "Date", "MVP", "Map Result"])

    # 루프 시작
    for idx, match in enumerate(match_boxes):
        stage_name = find_round(match)

        # 팝업 닫기 (이전 팝업이 열려있으면 닫기)
        try:
            existing_popups = driver.find_elements(By.CLASS_NAME, "brkts-popup")
            for p in existing_popups:
                if p.is_displayed():
                    close_btn = p.find_element(By.CLASS_NAME, "brkts-popup-close-button")
                    driver.execute_script("arguments[0].click();", close_btn)
                    WebDriverWait(driver, 3).until(
                        EC.invisibility_of_element_located((By.CLASS_NAME, "brkts-popup"))
                    )
        except:
            pass

        try:
            # 팀명 및 점수
            team_names = match.find_elements(By.CSS_SELECTOR, ".name.hidden-xs")
            team1 = team_names[0].text.strip() if len(team_names) > 0 else "미정"
            team2 = team_names[1].text.strip() if len(team_names) > 1 else "미정"

            score_divs = match.find_elements(By.CSS_SELECTOR, ".brkts-opponent-score-inner")
            score1 = score_divs[0].text.strip() if len(score_divs) > 0 else "?"
            score2 = score_divs[1].text.strip() if len(score_divs) > 1 else "?"

            match_title = f"{team1} ({score1}) vs {team2} ({score2})"

            # 아이콘만 클릭
            info_icon = match.find_element(By.CLASS_NAME, "brkts-match-info-icon")
            driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", info_icon)
            time.sleep(0.8)
            info_icon.click()

            # 팝업 등장 대기
            WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CLASS_NAME, "brkts-popup"))
            )

            # 팝업 등장 대기 (팝업 컨테이너만 보지 말고 내부 게임 정보까지 렌더 완료될 때까지 대기)
            popup = None
            for attempt in range(6):
                time.sleep(0.5)
                popups = driver.find_elements(By.CLASS_NAME, "brkts-popup")
                for p in reversed(popups):  # 가장 최근 팝업 우선
                    if p.is_displayed():
                        try:
                            # 내부 경기 정보가 최소 1개 이상 로딩됐는지 확인
                            game_body = p.find_elements(By.CLASS_NAME, "brkts-popup-body-game")
                            if len(game_body) >= 1 and game_body[0].is_displayed():
                                popup = p
                                break
                        except:
                            continue
                if popup:
                    break

            if not popup:
                print(" 실패 => 스킵")
                continue
            
            WebDriverWait(popup, 5).until(
                EC.presence_of_element_located((By.CLASS_NAME, "brkts-popup-body-game"))
            )

            # 경기 일시
            try:
                date_element = match.find_element(By.CLASS_NAME, "timer-object-date")
                match_date = date_element.get_attribute("innerText").strip()
                print("경기 일시:", match_date)
            except:
                try:
                    date_element = popup.find_element(By.CLASS_NAME, "timer-object-date")
                    match_date = date_element.get_attribute("innerText").strip()
                    print("경기 일시:", match_date)
                except:
                    print("경기 일시 추출 실패")

            # MVP
            try:
                mvp_block = popup.find_element(By.CLASS_NAME, "brkts-popup-mvp")
                mvp_name = mvp_block.find_element(By.TAG_NAME, "a").text.strip()
                print(f"  MVP: {mvp_name}")
            except:
                print("  MVP 정보 없음")

            # 맵 결과
            print("  맵 결과:")
            map_result_list = []  # 추가: 맵 결과를 리스트로 저장할 변수
            maps = popup.find_elements(By.CLASS_NAME, "brkts-popup-body-game")
            for m in maps:
                try:
                    # 맵 타입
                    try:
                        img = m.find_element(By.CSS_SELECTOR, "img")
                        map_type = img.get_attribute("alt").strip()
                    except:
                        map_type = "Unknown"

                    # 맵 이름
                    try:
                        a_tags = m.find_elements(By.CSS_SELECTOR, "a[title]")
                        map_name = a_tags[-1].get_attribute("title").strip() if a_tags else "Unknown"
                    except:
                        map_name = "Unknown"

                    # 점수
                    try:
                        numeric_scores = []
                        for el in m.find_elements(By.CLASS_NAME, "brkts-popup-spaced"):
                            text = el.text.strip()
                            if text.replace('.', '', 1).isdigit():
                                numeric_scores.append(text)
                            elif text.endswith('m') and text[:-1].replace('.', '', 1).isdigit():
                                numeric_scores.append(text)
                        score1 = numeric_scores[0] if len(numeric_scores) > 0 else "?"
                        score2 = numeric_scores[1] if len(numeric_scores) > 1 else "?"
                    except:
                        score1, score2 = "?", "?"

                    map_result_list.append(f"{map_type}: {score1} vs {score2} ({map_name})")
                    print(f"    - {map_type}: {score1} vs {score2} ({map_name})")
                except Exception as e:
                    print(f"    - 맵 정보 추출 실패: {e}")
                    map_result_list.append("맵 정보 추출 실패")

            writer.writerow([
                stage_name,
                match_title,
                match_date if 'match_date' in locals() else "Unknown",
                mvp_name if 'mvp_name' in locals() else "없음",
                "\n".join(map_result_list)
            ])


            # 팝업 닫기
            try:
                close_btn = popup.find_element(By.CLASS_NAME, "brkts-popup-close-button")
                driver.execute_script("arguments[0].click();", close_btn)
                WebDriverWait(driver, 3).until(
                    EC.invisibility_of_element_located((By.CLASS_NAME, "brkts-popup"))
                )
            except Exception as e:
                print(f" 팝업 닫기 실패: {e}")

        except Exception as e:
            print(f" [{stage_name}] 경기 정보 추출 실패 (idx={idx+1}): {e}")
            continue

            # 업데이트 코드 


    # 브라우저 종료
    driver.quit()




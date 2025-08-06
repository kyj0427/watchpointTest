from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime
import time
import json
import os
import uuid

def crawl_overwatch_store():
    # Chrome 옵션 설정
    chrome_options = Options()
    chrome_options.add_argument('--headless')  # 브라우저 창 안보이게
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    
    driver = webdriver.Chrome(options=chrome_options)
    
    try:
        # 페이지 로드
        driver.get("https://kr.shop.battle.net/en-us/family/overwatch#overwatch-2-shop")
        
        # 페이지가 완전히 로드될 때까지 대기
        time.sleep(5)
        
        # Angular 요소들이 로드될 때까지 대기
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "ng-star-inserted"))
        )
        
        # 상품 카드들 찾기
        product_cards = driver.find_elements(By.CSS_SELECTOR, "storefront-browsing-card")
        
        print(f"발견된 상품 카드 수: {len(product_cards)}")
        
        products = []
        for i, card in enumerate(product_cards[1:len(product_cards)]):
            try:
                # 상품 이름
                name_element = card.find_element(By.CSS_SELECTOR, "blz-content-block div[slot='heading']")
                name = name_element.text.strip()

                # 설명 부분
                desc_element = card.find_element(By.CSS_SELECTOR, "blz-content-block div[slot='description']")
                desc = desc_element.text.strip()

                if "|" in desc:
                    parts = desc.split("|")
                    category = parts[0].strip()
                    type_name = parts[1].strip() if len(parts) > 1 else ""
                else:
                    category = desc
                    type_name = ""
                
                # 이미지 URL
                img_element = card.find_element(By.CSS_SELECTOR, "div[slot='media'] img[ng-img='true']")
                image_url = img_element.get_attribute('src')
                
                # 링크
                link_element = card.find_element(By.CSS_SELECTOR, "a")
                link = link_element.get_attribute('href')

                # 가격 정보 (추가할 부분)
                price_info = extract_price_info(card)
                original_price = price_info['original_price']
                discount_rate = price_info['discount_rate']
                currency = price_info['currency']
                
                # print(f"  상품 {i+1}: {name}")
                # print(f"  카테고리: {category}")
                # print(f"  타입: {type_name}")
                # print(f"  이미지: {image_url}")
                # print(f"  링크: {link}")
                # print(f"  가격: {original_price}")
                # print(f"  할인율: {discount_rate}") 
                # print(f"  화폐단위: {currency}")
                # print('-'*50)

                
                
                products.append({
                    'id' : str(uuid.uuid4()),
                    'name': name,
                    'category': category,
                    'type': type_name,
                    'price': original_price,
                    'discount_rate': discount_rate,
                    'currency' : currency,
                    'image': image_url,
                    'link': link,
                    'lastUpdated': datetime.now().isoformat()
                })
                
            except Exception as e:
                print(f"상품 {i+1} 추출 실패: {e}")

                for i, card in enumerate(product_cards[:1]):  # 첫 번째 카드만
                    print(f"\n=== 상품 {i+1} 디버깅 ===")
                    simple_debug(card)
                    break  # 첫 번째만 실행
        return products
        
    finally:
        driver.quit()

def extract_price_info(card):
    """상품 카드에서 가격 정보를 추출하는 함수"""
    price_info = {'original_price': None, 'discount_rate': None, 'currency': None}
    
    try:
        # footer 영역에서 가격 정보 찾기
        footer_element = card.find_element(By.CSS_SELECTOR, "div[slot='footer']")
        all_text = footer_element.text.strip()
        
        import re
        
        # 원화 가격 패턴 (₩숫자, 쉼표 포함)
        krw_pattern = r'₩([\d,]+\.?\d*)'
        krw_matches = re.findall(krw_pattern, all_text)
        
        # Virtual Currency 패턴 (숫자+쉼표)
        virtual_pattern = r'([\d,]+)'
        virtual_matches = re.findall(virtual_pattern, all_text)
        
        # 할인율 추출
        try:
            # storefront-price 내부의 모든 텍스트
            price_element = card.find_element(By.CSS_SELECTOR, "storefront-price")
            price_text = price_element.text.strip()
            
            # 할인율 패턴 찾기
            discount_match = re.search(r'-(\d+)%', price_text)
            if discount_match:
                price_info['discount_rate'] = f"{discount_match.group(1)}"
        except Exception as e:
            pass  # 할인율이 없으면 무시

        
        
        if krw_matches:
            price_info['currency'] = 'KRW'
            price_info['original_price'] = krw_matches[0]
                
        elif virtual_matches:
            price_info['currency'] = 'Coins'
            price_info['original_price'] = virtual_matches[0]
                
    except Exception as e:
        print(f"가격 정보 추출 실패: {e}")
    
    return price_info

def simple_debug(card):
    """간단한 디버깅"""
    try:
        # 카드의 전체 HTML 출력
        print("카드 HTML:")
        print(card.get_attribute('outerHTML')[:1000])  # 처음 1000자만
        
        # 모든 텍스트 내용 확인
        print("\n카드 내 모든 텍스트:")
        all_text = card.text
        lines = all_text.split('\n')
        for i, line in enumerate(lines):
            if line.strip():
                print(f"  {i+1}. {line.strip()}")
                
    except Exception as e:
        print(f"디버깅 실패: {e}")    



def save_to_typescript_file(products, filename="overwatchStoreData_hl.ts"):
    """크롤링한 데이터를 TypeScript 파일로 저장"""

    # frontend/public/data 폴더에 저장 
    data_dir = r"D:\watchpoint\frontend\public\data"

    # 전체 파일 경로
    file_path = os.path.join(data_dir, filename)

    # TypeScript 파일 내용 생성
    ts_content = """// Auto-generated Overwatch Store Data
        // Generated on: """ + datetime.now().strftime("%Y-%m-%d %H:%M:%S") + """

        export interface OverwatchProduct {
            id : string;
            name: string;
            category: string;
            type: string;
            price: string | null;
            discount_rate: string | null;
            currency : string | null;
            image: string;
            link: string;
            lastUpdated: string;
        }

        export const overwatchStoreData: OverwatchProduct[] = """ + json.dumps(products, indent=2, ensure_ascii=False) + """;

        export default overwatchStoreData;
        """
    
    # 파일 저장
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"데이터가 {file_path}에 저장되었습니다.")

if __name__ == "__main__":
    # 메인 크롤링 함수 실행
    products = crawl_overwatch_store()
    print(f"\n총 {len(products)}개의 상품을 크롤링했습니다.")

    # data 폴더에 TypeScript 파일로 저장
    save_to_typescript_file(products)

# 파일 실행 : python overwatchStoreCrawler\OverwatchStoreCrawler.py
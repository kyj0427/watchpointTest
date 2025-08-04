import pandas as pd
import re

# CSV 불러오기
df = pd.read_csv("hero_detail.csv")

# 스킬 키 목록 정의
skill_keys = {"Q", "E", "F", "C", "RMB", "LMB", "LSHIFT", "RSHIFT", "SPACE"}

# 영웅 이름별 그룹
grouped = df.groupby("hero_name")

with open("hero_detail.txt", "w", encoding="utf-8-sig") as f:
    for hero, hero_data in grouped:
        f.write(f"영웅명: {hero}\n\n")
        
        # 스킬(이름+설명+타입)별 그룹
        abilities = hero_data.groupby(["name", "description", "type"])
        
        for (name, desc, typ), rows in abilities:
            name = str(name).strip()
            
            # 스킬 키 분리
            match = re.match(r"^(.*?)([A-Z]{1,6})$", name)
            if match:
                base, key = match.group(1).strip(), match.group(2).strip()
                if key in skill_keys:
                    name_clean = f"{base} [{key}]"
                else:
                    name_clean = name
            else:
                name_clean = name

            f.write(f"[{typ} - {name_clean}]\n")
            if pd.notna(desc) and desc.strip():
                f.write(f"설명: {desc.strip()}\n")

            # 속성 출력
            for _, row in rows.iterrows():
                attr = row["attribute"]
                detail = row["attribute_detail"]
                if pd.notna(attr) and pd.notna(detail) and attr.strip():
                    f.write(f"- {attr.strip()}: {detail.strip()}\n")
            f.write("\n")
        
        f.write("=" * 60 + "\n\n")

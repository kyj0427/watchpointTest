# 바스티온 (Bastion)

## 1. 기본 정보 (Basic Information)

| 항목 | 내용                                 |
| ---- | ------------------------------------ |
| 본명 | SST Laboratories Siege Automaton E54 |
| 역할 | 공격 (Damage)                        |
| 소속 | 없음 (전 기종)                       |

## 2. 스킬 상세 (Abilities)

### A-36 전술 수류탄 (A-36 Tactical Grenade)

벽에 튕기며 적이나 지면에 닿으면 폭발하는 폭탄을 발사합니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Damage | 15 (direct hit bonus)100 - 50 (splash, enemy)50 - 25 (splash, self) |
| Headshot | ✕ |
| Cast time | 0 + 0.5 seconds |
| Duration | 0.37 seconds (explosion delay) |
| Area of effect | 4 meters (explosion) |
| Knockback speed | 17.5 m/s (self)10.5 m/s (enemy) |
| Projectile speed | 40 m/s |
| Projectile radius | 0.37 meters |

### 설정: 포격 (Configuration: Artillery) [Q]

움직일 수 없는 상태가 되어 최대 3발의 강력한 포탄을 발사합니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Damage | 550 (center)250 – 200 (inner ring)200 – (outer ring) |
| Headshot | ✕ |
| Ammo | 3 |
| Cast time | 1.2 + 1.5 seconds |
| Duration | 8 seconds (max targeting)1.25 seconds (impact delay)0.18 seconds (between shots |
| Area of effect | 2.5 meters radius (inner ring)6.5 meter radius (outer ring) |
| Movement speed | 25 m/s (targeting) |
| Projectile radius | 0.015 meters |

### 설정: 강습 (Configuration: Assault) [LSHIFT]

강력한 회전식 기관포를 갖춘 느리게 움직이는 탱크입니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Damage | 12 - 3.6 |
| Falloff range | 30 - 50 meters |
| Headshot | ✕ |
| Rate of fire | 30 shots/s |
| Ammo | ∞ |
| Spread angle | 2 degrees |
| Mov. speed penalty | -35% |
| Projectile radius | 0.04 meters |

### 설정: 수색 (Configuration: Recon)

기동성이 좋고, 가볍고 매우 정확한 무기를 사용합니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Damage | 25 - 7.5 |
| Falloff range | 30 - 50 meters |
| Headshot | ✓ (x2) |
| Rate of fire | 5 shots/s |
| Ammo | 25 |
| Reload time | 1.2 seconds |
| Projectile radius | 0.07 meters |

### 재설정 (Reconfigure) [LSHIFT]

무기 설정을 전환합니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Cast time | 1 + 0.5 seconds |
| Duration | 6 seconds |

## 3. 패시브 및 특성 (Passives & Perks)

### 역할: 공격 (Role: Damage)

적에게 피해를 주면 일시적으로 받는 치유량을 감소시킵니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Healing modification | -30% received (non-tanks)-15% received (tanks) |
| Duration | 2 seconds |

### 장갑 포병 (Armored Artillery)

설정: 포격이 300의 추가 생명력을 부여합니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Overhealth | 300 |

### 린드홀름 폭발물 (Lindholm Explosives)

설정: 강습의 무기가 회전식 기관포 대신 느리게 폭발성 포탄을 발사합니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Damage | 50 (direct hit bonus)90 - 27 (splash, enemy)36 - 10.8 (splash, self) |
| Headshot | ✕ |
| Rate of fire | 1.33 shots/s |
| Area of effect | 3.5 meter radius (splash) |
| Knockback speed | 7.7 m/s (max,enemy)10.9 m/s (self) |
| Projectile speed | 100 m/s |
| Projectile radius | 0.275 meters |

### 자가 수리 (Self-Repair) [E]

E 키를 눌러 신속하게 자신을 치유합니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Healing | 90 per second |
| Cast time | 0.24 + 0.24 seconds |
| Duration | 0.5 seconds (min) 3.3 seconds (max) |

### 스마트 폭탄 (Smart Bomb)

A-36 전술 수류탄의 자가 밀쳐내기 효과가 25% 증가하고 자신에게 피해를 주지 않습니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Knockback speed | 19.8 m/s |

## 4. 플레이스타일 및 고급 공략 (Advanced Guides)

바스티온은 상황에 따라 형태를 바꾸며 전장을 파괴하는 강력한 '변신형 요새'입니다. 그의 잠재력을 극대화하려면 각 설정(Configuration)의 역할을 명확히 이해하고, 적의 조합과 전장 상황에 맞춰 유연하게 대처하는 능력이 요구됩니다.

### **1. 핵심 플레이스타일: 계산된 파괴와 생존**

- **기본 사이클:** 평상시에는 `설정: 수색` 모드로 기동성을 확보하고 안정적으로 포킹합니다. 적의 방벽이나 뭉쳐있는 적, 혹은 진입하는 탱커를 상대할 결정적인 순간에 `재설정 (LSHIFT)`을 사용하여 `설정: 강습`으로 변신, 막강한 화력을 퍼붓습니다. 강습 모드의 지속시간이 끝나면 다시 수색 모드로 돌아와 재정비하는 것이 기본 운영법입니다.
- **포지셔닝:** `수색` 모드에서는 팀원들과 함께 움직이며 중거리 교전을 유도합니다. `강습` 모드로 변신할 때는 적의 주요 화력에 직접 노출되지 않는 반엄폐나 코너를 끼고 자리를 잡는 것이 생존에 매우 중요합니다.

### **2. 핵심 기술 심화 공략**

- **설정: 강습 & 린드홀름 폭발물:** `강습` 모드는 바스티온의 핵심입니다.
  - **기본 회전포:** 방벽을 파괴하거나 덩치가 큰 탱커를 녹이는 데 최적화되어 있습니다. 초당 30발의 무한 탄창으로 지속적인 압박을 가합니다.
  - **린드홀름 폭발물 (특성):** 이 특성을 선택하면 강습 모드가 완전히 다른 스타일로 바뀝니다. 연사력은 느려지지만, 강력한 광역 폭발 피해를 주는 포탄을 발사하여 적 지원가 라인이나 뭉쳐있는 적 그룹을 직접 타격하는 데 매우 효과적입니다.
- **A-36 전술 수류탄 & 스마트 폭탄:** 바스티온의 유일한 유틸리티 기술입니다.
  - **전략적 활용:** 벽에 튕기는 특성을 이용해 엄폐한 적을 끌어내거나, 좁은 입구를 견제하는 데 사용합니다. 적 탱커의 발밑에 던져 진입을 방해하거나 딜러에게 직접 맞춰 킬을 노릴 수 있습니다.
  - **수류탄 점프 (`스마트 폭탄` 특성):** `스마트 폭탄` 특성을 선택하면 자가 피해 없이 더 강력한 넉백으로 '수류탄 점프'가 가능해집니다. 이를 통해 평소에는 갈 수 없었던 고지대를 점령하거나, 적의 공격으로부터 빠르게 회피하는 등 생존과 기동성을 극대화할 수 있습니다.
- **설정: 포격 & 장갑 포병:** 궁극기인 `포격`은 강력한 지역 장악 기술입니다.
  - **사용 시점:** 적들이 거점이나 화물에 뭉쳐있을 때, 혹은 자리야의 '중력자탄'과 같은 아군 궁극기와 연계하여 사용하는 것이 가장 이상적입니다.
  - **`장갑 포병` 특성:** 이 특성은 포격 모드 중 300의 추가 생명력을 제공하여 생존성을 크게 높여줍니다. 이 덕분에 다소 위험한 위치에서도 안정적으로 궁극기를 사용하여 적 진형을 초토화시킬 수 있습니다.

### **3. 고급 전략 및 팁**

- **자원 관리:** `강습` 모드와 `전술 수류탄`은 강력하지만 재사용 대기시간이 존재합니다. 적의 핵심 스킬(예: 아나의 수면총, 로드호그의 갈고리)이 빠진 것을 확인하고 변신해야 생존 확률이 높아집니다.
- **모드 전환의 이해:** 제공된 데이터에는 `경계`, `전차` 등 다양한 설정이 존재합니다. 만약 이 모든 모드를 사용할 수 있다면, 전장 상황에 맞는 최적의 모드를 선택하는 것이 중요합니다. `경계`는 고정된 방어에, `강습`은 기동성 있는 공격에, `전차`는 기습적인 플레이에 유리합니다.
- **능동적인 자가 수리:** `자가 수리`는 바스티온의 생존에 필수적입니다. 교전 중 잠시 엄폐하여 체력을 회복하는 습관을 들이고, 특히 `강철 기갑` 패시브로 피해 감소 효과를 받는 변신 상태에서 수리하면 효율이 더욱 좋습니다.

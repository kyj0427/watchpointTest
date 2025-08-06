# 로드호그 (Roadhog)

## 1. 기본 정보 (Basic Information)

| 항목 | 내용                          |
| ---- | ----------------------------- |
| 본명 | 마코 러틀리지 (Mako Rutledge) |
| 역할 | 돌격 (Tank)                   |
| 소속 | 정커 (Junkers)                |

## 2. 스킬 상세 (Abilities)

### 갈고리 사슬 (Chain Hook) [LSHIFT]

조준한 적을 자신에게 끌어당깁니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Damage | 5 |
| Headshot | ✕ |
| Cast time | 0.1 + 0.2 seconds |
| Duration | 0.5 seconds (min) |
| Max. range | 20 meters |
| Mov. speed penalty | -50% |
| Knockback speed | 40 m/s |
| Projectile speed | 62 m/s |
| Projectile radius | 0.5 meter radius (vs enemy)None (vs wall or barrier) |

### 돼지우리 (Pig Pen) [E]

근처의 적을 느려지게 하고 피해를 주는 덫을 발사합니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Damage | 60 (initial)45/s (periodic)195 (total) |
| Headshot | ✕ |
| Health | 100 |
| Cast time | 0.14 + 0.4 seconds |
| Duration | 0.8 seconds (arming delay)3 seconds (slow) |
| Max. range | 8.2 meters (straight forward)13.5 meters (at 35° angle) |
| Area of effect | 2.5 meter radius (trigger)4 meter radius (slow area) |
| Movement slow | -40% |
| Projectile speed | 27 m/s |

### 고철총 (Scrap Gun)

중거리 파편 탄환을 발사하는 단거리 산탄 무기입니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Damage | 6.25 – 1.88 (per pellet)15 – 4.5 (per shrapnel)160 – 48 (per shot) |
| Falloff range | 30 – 50 meters |
| Headshot | ✓ (x1.5) |
| Rate of fire | 1.25 shots/s |
| Bullets per shot | 16 (pellets)4 (shrapnels) |
| Ammo consumption | 1 |
| Ammo | 6 |
| Reload time | 1.75 seconds animation |
| Spread angle | 20.1 degrees |
| Projectile speed | 80 m/s |
| Projectile radius | 0.05 meters (pellets)0.15 meters (shrapnels) |

### 숨 돌리기 (Take a Breather)

자신을 치유하고 받는 피해를 감소시킵니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Healing | 180 per second |
| Dmg. reduction | -40% taken |
| Cast time | 0.21 + 0.54 seconds |
| Duration | 0.55 seconds (min)2.5 seconds (max) |

### 돼재앙 (Whole Hog) [Q]

전방의 적들에게 피해를 주고 뒤로 밀쳐냅니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Damage | 6 – 1.8 |
| Falloff range | 30 – 40 meters |
| Headshot | ✓ (x2) |
| Rate of fire | 8 shots/s |
| Bullets per shot | 16 per shot |
| Cast time | 0.5 + 1 seconds |
| Duration | 7.5 seconds |
| Spread angle | ~40 degrees (horizontal)~3 degrees (vertical) |
| Mov. speed penalty | -25% |
| Knockback speed | 16 m/s (knockback) |
| Projectile radius | 0.04 meters |

## 3. 패시브 및 특성 (Passives & Perks)

### 역할: 돌격 (Role: Tank)

밀쳐내기 효과와 치명타 피해량이 감소합니다. 받는 피해와 치유로 생성되는 궁극기 충전량이 감소합니다. 역할 고정 게임 모드에서는 기본 생명력이 증가합니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Health | 150 |
| Dmg. reduction | -25% taken |

### 돼지 던지기 (Hog Toss)

돼지우리의 투척 사거리가 50% 증가하고 피해량이 25% 증가합니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Damage | 75 (initial)56.25/s (periodic)238.8 (total) |
| Headshot | ✕ |
| Max. range | 15.2 meters (straight forward)29 meters (at 35° angle) |
| Projectile speed | 40 m/s |

### 돼지수소 노출 (Hogdrogen Exposure)

숨 돌리기가 근처의 아군도 치유량의 50%만큼 치유합니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Healing | 80/s |
| Area of effect | 10 meter radius |

### 활력 (Invigorate)

숨 돌리기가 로드호그의 이동 속도를 30% 빠르게 증가시킵니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Mov. speed buff | +30% |

### 억누름 (Pent Up)

돼지우리가 발동되면, 숨 돌리기 자원을 50% 다시 채우며 과충전될 수 있습니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| | |

### 고철 갈고리 (Scrap Hook)

갈고리 사슬로 적을 맞히면 탄약을 2발 재장전합니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| | |

## 4. 플레이스타일 및 고급 공략 (Advanced Guides)

로드호그는 `갈고리 사슬`이라는 독보적인 스킬로 적의 핵심 영웅을 암살하고, 막대한 체력과 자가 치유 능력으로 버티는 '독고다이형 암살자'입니다. 그의 핵심은 한 번의 실수도 용납하지 않는 정교한 갈고리 에임과, 적의 공격을 받아내는 대담함에 있습니다.

### **1. 핵심 플레이스타일: 고독한 사냥꾼**

- **원샷 원킬:** 로드호그의 존재 이유는 `갈고리 사슬`입니다. 갈고리로 적을 끌어온 후, `고철총` 좌클릭 헤드샷과 근접 공격으로 이어지는 콤보는 대부분의 200~250 체력 영웅을 즉시 처치할 수 있습니다. 이것이 로드호그의 모든 것입니다.
- **측면 공격 (Flanking):** 로드호그는 아군과 함께 있기보다, 적의 측면이나 후방을 노려 예상치 못한 곳에서 갈고리를 던져 변수를 창출하는 데 특화되어 있습니다. 거대한 덩치와 발소리 때문에 은밀한 플레이는 어렵지만, 성공했을 때의 리턴은 매우 큽니다.

### **2. 핵심 기술 심화 공략**

- **갈고리 사슬 & 고철 갈고리:**
  - **성공률이 전부:** 갈고리의 성공 여부가 로드호그의 성능을 결정합니다. 항상 신중하게, 적의 움직임을 예측하여 던져야 합니다. 특히 적의 핵심 생존기(키리코의 순보, 리퍼의 망령 형태 등)가 빠진 것을 확인하고 던지는 것이 중요합니다.
  - **`고철 갈고리` 특성:** 이 특성은 성공적인 갈고리에 대한 보상입니다. 갈고리 콤보 후 부족한 탄약을 즉시 보충해주어, 다음 교전을 더 원활하게 준비할 수 있게 해줍니다.
- **돼지우리 & 특성 연계 (`돼지 던지기`, `억누름`):**
  - **다재다능한 함정:** `돼지우리`는 갈고리를 맞히기 어려운 기동성 좋은 영웅(루시우, 트레이서 등)의 발을 묶거나, 적의 주요 이동 경로를 차단하는 데 사용됩니다. `돼지 던지기` 특성은 이 영향력을 더 넓고 강력하게 만듭니다.
  - **`억누름` 특성:** 이 특성은 로드호그의 자원 순환을 돕습니다. 덫 발동 시 `숨 돌리기` 자원이 회복되므로, 더 자주, 더 오래 생존할 수 있는 발판이 됩니다.
- **숨 돌리기 & 특성 연계 (`돼지수소 노출`, `활력`):**
  - **궁극의 생존기:** `숨 돌리기`는 로드호그를 좀비로 만드는 핵심 스킬입니다. 받는 피해를 감소시키며 막대한 양의 체력을 회복하므로, 적의 집중 포화를 버텨내는 데 사용됩니다.
  - **`돼지수소 노출` & `활력` 특성:** `활력`은 생존기 사용 중에도 기동성을 확보하게 해주며, `돼지수소 노출`은 로드호그를 단순한 이기적인 탱커에서 팀을 위한 서브 힐러로 만들어주는 강력한 특성입니다.
- **돼재앙 (궁극기):** 진형 파괴의 끝판왕입니다.
  - **사용법:** 적을 낭떠러지로 밀어내어 환경 처치를 유도하거나, 좁은 길목에 있는 적들을 구석으로 몰아넣어 움직이지 못하게 만드는 데 매우 효과적입니다. 또한, 라인하르트의 방벽과 같은 보호막을 순식간에 파괴할 수 있습니다.

### **3. 고급 전략 및 팁**

- **갈고리 심리전:** 근접 공격 모션을 통해 갈고리를 사용할 것처럼 행동하여 적의 생존기를 빼게 유도한 후, 진짜 갈고리를 던지는 심리전이 유효합니다.
- **고철총 우클릭 활용:** 고철총의 우클릭은 중거리에서 폭발하는 파편을 발사합니다. 8~10미터 거리의 적에게 사용하여 갈고리를 던지기 전에 미리 피해를 입히는 것이 중요합니다.
- **몸으로 막아라:** 로드호그는 방벽이 없는 대신, 자신의 몸으로 아군을 지켜야 합니다. 위험에 처한 아군 앞으로 나아가 대신 공격을 맞아주고, `숨 돌리기`로 버티는 플레이가 필요합니다.

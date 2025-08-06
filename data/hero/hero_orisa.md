# 오리사 (Orisa)

## 1. 기본 정보 (Basic Information)

| 항목 | 내용           |
| ---- | -------------- |
| 본명 | 오리사 (Orisa) |
| 역할 | 돌격 (Tank)    |
| 소속 | 없음           |

## 2. 스킬 상세 (Abilities)

### 강화된 융합 기관포 (Augmented Fusion Driver)

자동으로 작동하는 열 기반 무기입니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Damage | 14 |
| Headshot | ✓ (x2) |
| Rate of fire | 10 rounds/s |
| Ammo | ∞ |
| Reload time | 3 seconds (cooldown after overheat)2 seconds (recharge from full heat) |
| Projectile speed | 100 m/s |
| Projectile radius | 0.225 meters |

### 투창 (Energy Javelin)

창을 던져 적을 기절시키고 뒤로 밀쳐냅니다. 적이 벽에 부딪히면 더 효과적입니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Damage | 70 (direct impact), 40 (wall collision) |
| Headshot | ✕ |
| Cast time | 0.3 + 0.4 seconds seconds |
| Duration | 0.2 seconds (impact stun)0.3 seconds (wall stun) |
| Knockback speed | 22 m/s |
| Projectile speed | 70 m/s |
| Projectile radius | 0.5 meters |

### 방어 강화 (Fortify) [LSHIFT]

일시적인 추가 생명력을 얻고, 받는 모든 피해를 감소시키며 저지불가 상태가 됩니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Overhealth | 100 |
| Dmg. reduction | -45% taken |
| Duration | 4 seconds |
| Mov. speed penalty | -10% |

### 융합 기관포 (Fusion Driver)

오리사의 자동 투사체 기관포는 지속적인 피해를 주지만, 발사하는 동안 이동 속도를 늦춥니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Damage | 11 |
| Headshot | ✓ (x2) |
| Rate of fire | 12 rounds per second |
| Ammo | 150 |
| Reload time | 2.5 seconds |
| Spread angle | Constant: 1.2 degree |
| Movement speed | -30% penalty |
| Projectile speed | 120 meters per second |

### 수호의 창 (Javelin Spin) [E]

창을 돌려 투사체를 파괴하고 근접 공격을 막으며, 동시에 적을 밀쳐내고 전진 속도를 증가시킵니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Damage | 20 (first hit)5 (subsequent hits) |
| Headshot | ✕ |
| Cast time | 0 + 0.1 seconds |
| Duration | 0.5 seconds (min)1.75 seconds (max)2 seconds (movement speed) |
| Max. range | 3.5 meters |
| Mov. speed buff | +50% (while active)20% after spin |

### 대지의 창 (Terra Surge) [Q]

적들을 끌어당기고 자리를 고정하며, 방어 강화 효과를 얻고 강력한 피해를 충전합니다. 주 발사를 사용하여 충격을 일찍 방출할 수 있습니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Damage | 19.5/s (periodic damage), 72 - 500 (release) |
| Headshot | ✕ |
| Overhealth | 100 (Fortify) |
| Dmg. reduction | -45% taken (Fortify) |
| Cast time | None (initial cast)0.2 seconds (release)0.3 seconds (recovery) |
| Duration | 0.75 - 4 seconds (charge time) |
| Area of effect | 10.5 meter radius (initial pull)8.5 meter radius (damage and slow) |
| Movement slow | -30% |
| Knockback speed | 20 m/s (initial pull)2 m/s (knockback, min)11.5 m/s (knockback, max) |

## 3. 패시브 및 특성 (Passives & Perks)

### 역할: 돌격 (Role: Tank)

밀쳐내기 효과와 치명타 피해량이 감소합니다. 받는 피해와 치유로 생성되는 궁극기 충전량이 감소합니다. 역할 고정 게임 모드에서는 기본 생명력이 증가합니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Health | 150 |
| Dmg. reduction | -25% taken |

### 충전된 투창 (Charged Javelin)

투창을 충전하여 투사체 속도와 밀쳐내기 효과를 증가시킬 수 있습니다. 최대 충전 시 적을 관통합니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Cast time | 0.3 seconds (to min charge)1 second (to max charge)0.64 seconds (recovery) |
| Knockback speed | 22.25 m/s (min charge)27.5 m/s (max charge) |
| Projectile speed | 72 m/s (min charge)140 m/s (max charge) |

### 찰나의 보루 (Fleeting Bulwark)

방어 강화가 활성화될 때 추가로 100의 점차 감소하는 추가 생명력을 잠시 부여합니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Overhealth | +100 |
| Duration | 1.75 seconds |

### 열 방출기 (Heat Dissipator)

주 무기의 치명타가 열을 환급합니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| | |

### 보호 방벽 (Protective Barrier) [E]

수호의 창이 방벽으로 교체됩니다.
| 속성 (Attribute) | 값 (Value) |
|---|---|
| Barrier health | 600 |
| Duration | 6 seconds |
| Area of effect | 7.4 meter width3.8 meter height2.9 meter depth |
| Cooldown | 8 seconds |

## 4. 플레이스타일 및 고급 공략 (Advanced Guides)

오리사는 강력한 생존기와 군중 제어 능력을 바탕으로 최전선에서 버티며 적의 공격을 무력화하는 '불굴의 요새'입니다. 그녀의 핵심은 스킬을 순환하며 끊임없이 압박을 가하고, 적의 핵심 영웅을 고립시키는 데 있습니다.

### **1. 핵심 플레이스타일: 멈추지 않는 압박 기계**

- **전선 유지:** 오리사의 주 임무는 최전선에서 적의 공격을 받아내며 아군을 위한 공간을 만드는 것입니다. `방어 강화`와 `수호의 창`를 번갈아 사용하며 적의 공격을 흡수하고, `융합 기관포`로 끊임없이 압박을 가해야 합니다.
- **스킬셋 선택 (`수호의 창` vs. `보호 방벽`):**
  - **`수호의 창` (기본):** 현대 오버워치의 공격적인 플레이스타일에 적합합니다. 적진으로 파고들며 투사체를 지우고, 적들을 밀쳐내며 진형을 파괴하는 데 유리합니다.
  - **`보호 방벽` (특성):** 대치 구도가 중요한 특정 맵이나, 아군 저격수를 보호해야 할 때 전략적으로 선택할 수 있습니다.

### **2. 핵심 기술 심화 공략**

- **융합 기관포 & 열 방출기:**
  - **`열 방출기` 특성:** 이 특성은 오리사의 지속 화력을 극대화합니다. 헤드샷을 꾸준히 맞히면 과열 없이 더 오랫동안 사격할 수 있으므로, 적 탱커의 머리를 집중적으로 노리는 것이 중요합니다.
- **방어 강화 & 찰나의 보루:**
  - **최고의 생존기:** `방어 강화`는 오리사를 저지불가 상태로 만들고 받는 피해를 크게 줄여줍니다. 아나의 수면총, 로드호그의 갈고리 등 치명적인 CC기를 무시하거나, 적의 집중 포화를 버텨낼 때 사용합니다.
  - **`찰나의 보루` 특성:** 이 특성은 방어 강화의 생존 능력을 한층 더 끌어올립니다. 활성화 즉시 얻는 추가 생명력은 순간적인 폭딜로부터 살아남을 확률을 극적으로 높여줍니다.
- **투창 & 충전된 투창:**
  - **다재다능한 CC기:** `투창`은 적의 채널링 궁극기(리퍼, 모이라 등)를 끊거나, 돌진하는 적을 막거나, 벽에 부딪혀 추가 피해와 긴 기절을 유발하는 등 활용도가 무궁무진합니다.
  - **`충전된 투창` 특성:** 이 특성은 투창을 저격 기술로 만들어줍니다. 최대 충전 시 더 빠른 탄속으로 원거리의 적을 저격하거나, 여러 명의 적을 관통하여 진형을 파괴하는 강력한 변수를 창출합니다.
- **대지의 창 (궁극기):** 진형 파괴의 끝판왕입니다.
  - **사용법:** 적들이 뭉쳐있는 곳, 특히 화물이나 거점 위에서 사용하여 최대한 많은 적을 끌어당기는 것이 중요합니다. 궁극기 사용 중에는 `방어 강화` 상태가 되므로, 과감하게 적진 한가운데서 시전해야 합니다.
  - **충전과 해방:** 상황에 따라 충전 시간을 조절해야 합니다. 적 지원가의 생존기가 빠졌다면 최대 충전으로 '한 방'을 노리고, 아니라면 빠르게 사용하여 광역 피해와 둔화 효과를 주는 데 집중하는 것이 좋습니다.

### **3. 고급 전략 및 팁**

- **스킬 순환:** 오리사 운영의 핵심은 스킬을 끊임없이 순환시키는 것입니다. `방어 강화` -> `수호의 창` -> `투창` 순으로 사용하여 스킬 공백을 최소화하고, 그 사이 `융합 기관포`로 압박을 유지하세요.
- **환경 처치:** `수호의 창`와 `투창`의 넉백 효과를 이용해 낭떠러지 근처의 적을 밀어내어 낙사시키는 플레이는 매우 효과적입니다.
- **몸으로 막아라:** 오리사는 아군을 지키기 위해 자신의 몸을 던져야 하는 영웅입니다. 위험에 처한 아군 앞으로 나아가 `방어 강화`나 `수호의 창`로 공격을 대신 맞아주세요.

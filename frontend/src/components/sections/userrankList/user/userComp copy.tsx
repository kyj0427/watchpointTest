// "use client";

// import { useMemo } from "react";
// import { useSearchParams } from "next/navigation";
// import { userData, Profile } from "@/../public/data/userData";

// type MostPlayedHero = {
//   name: string; kda: string; kdaDetail: string; winRate: string; games: string;
//   kdaWeight: "font-black" | "font-semibold";
// };
// type RecentHero = { name: string; winRate: string; record: string };
// type PositionBar = { name: "탱커" | "딜러" | "힐러"; height: string; top: string };

// export default function UserComp() {
//   const params = useSearchParams();
//   const id = (params.get("id") ?? params.get("q") ?? "").trim();

// const profile: Profile = useMemo(() => {
//   const id = (params.get("id") ?? params.get("q") ?? "").trim();
//   if (!id) return userData.defaultProfile;

//   // profiles는 Record<string, Profile>로 타입이기 때문에 바로 인덱싱 OK
//   return userData.profiles[id] ?? userData.defaultProfile;
// }, [params]);

//   const mostPlayedHeroes: MostPlayedHero[] = profile?.mostPlayedHeroes ?? [];
//   const recentHeroes: RecentHero[] = profile?.recentHeroes ?? [];
//   const positionData: PositionBar[] = profile?.positionData ?? [];
//   const seasons: string[] = profile?.seasons ?? [];
//   const srValues: string[] = profile?.srValues ?? [];
//   const statsCards = profile?.statsCards ?? [];

//   return (
//     <main className="relative w-[1114px] h-[756px]" role="main">
//       {/* Header */}
//       <header className="absolute w-[1086px] h-[205px] top-3.5 left-[18px] bg-[#d9d9d9]">
//         <div className="absolute w-[79px] h-[79px] top-[67px] left-[3px] bg-[#a6a6a6] rounded-[10px] border-[3px] border-solid border-white shadow-[0px_4px_4px_#00000040]" role="img" aria-label="프로필 이미지" />
//         <button className="absolute w-[90px] h-[34px] top-[113px] left-[109px] bg-[#565e6d] rounded-[10px] hover:bg-[#4a5261] transition-colors">
//           <span className="h-[9px] top-[11px] left-[21px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-xs text-center leading-[normal] whitespace-nowrap absolute tracking-[0]">
//             전적 갱신
//           </span>
//         </button>
//         <p className="h-[9px] top-[159px] left-[110px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-xs text-center leading-[normal] whitespace-nowrap absolute tracking-[0]">
//           최근 업데이트 : {profile?.lastUpdated ?? "—"}
//         </p>
//         <h1 className="h-5 top-[79px] left-[107px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[28px] text-center leading-[normal] whitespace-nowrap absolute tracking-[0]">
//           {profile?.name ?? "유저"}
//         </h1>
//         {profile?.tag && (
//           <span className="h-3 top-[83px] left-[189px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-base text-center leading-[normal] whitespace-nowrap absolute tracking-[0]">
//             #{profile.tag}
//           </span>
//         )}

//         {/* Play Style */}
//         <section className="absolute w-[205px] h-[177px] top-3.5 left-[550px]" aria-labelledby="playstyle-title">
//           <div className="absolute w-[149px] h-[103px] top-[37px] left-0">
//             <div className="absolute w-[124px] h-[21px] top-[27px] left-[42px] bg-[#565e6d] rounded-[60px]">
//               <p className="h-1.5 top-[7px] left-[22px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[8px] text-center leading-[normal] whitespace-nowrap absolute tracking-[0]">
//                 플레이 스타일 : {profile?.playStyle ?? "—"} &nbsp;&gt;
//               </p>
//             </div>
//             <h2 id="playstyle-title" className="h-[15px] top-[-7px] left-[45px] [font-family:'Inter-Black',Helvetica] font-black text-white text-xl text-center leading-[normal] whitespace-nowrap absolute tracking-[0]">
//               {profile?.playStyleLabel ?? "—"}
//             </h2>
//             <div className="h-[9px] top-[78px] left-[42px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-xs text-center leading-[normal] whitespace-nowrap absolute tracking-[0]">
//               주요 영웅
//             </div>
//             <div className="absolute w-[26px] h-[27px] top-[76px] left-[104px] bg-[#a6a6a6] rounded-[13px/13.5px] shadow-[0px_4px_4px_#00000040]" role="img" aria-label="주요 영웅 1" />
//             <div className="absolute w-[26px] h-[27px] top-[76px] left-[131px] bg-[#a6a6a6] rounded-[13px/13.5px] shadow-[0px_4px_4px_#00000040]" role="img" aria-label="주요 영웅 2" />
//             <div className="absolute w-[26px] h-[27px] top-[76px] left-[158px] bg-[#a6a6a6] rounded-[13px/13.5px] shadow-[0px_4px_4px_#00000040]" role="img" aria-label="주요 영웅 3" />
//           </div>
//           <div className="absolute w-[177px] h-[177px] top-0 left-7 rounded-lg border border-solid border-[#8c8d8b]" />
//         </section>

//         {/* Best Highlight */}
//         <section className="absolute w-[303px] h-[177px] top-3.5 left-[769px] rounded-lg" aria-labelledby="highlight-title">
//           <div className="absolute w-[94px] h-[21px] top-[7px] left-1.5 bg-[#565e6d] rounded-[10px]" />
//           <h2 id="highlight-title" className="h-1.5 top-3.5 left-[23px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[8px] text-center leading-[normal] whitespace-nowrap absolute tracking-[0]">
//             베스트 하이라이트
//           </h2>
//           <div className="h-1.5 top-[88px] left-[109px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[8px] text-center leading-[normal] whitespace-nowrap absolute tracking-[0]">
//             {profile?.bestHighlight ?? "설정된 베스트 하이라이트"}
//           </div>
//           <div className="absolute w-[303px] h-[177px] top-0 left-0 rounded-lg border border-dashed border-[#8c8d8b]" />
//         </section>
//       </header>

//       {/* Tier */}
//       <section className="absolute w-[336px] h-[120px] top-[267px] left-[17px] bg-[#a6a6a6] rounded-[10px]" aria-labelledby="tier-title">
//         <h2 id="tier-title" className="h-2.5 top-[22px] left-[15px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-sm text-center leading-[normal] whitespace-nowrap absolute tracking-[0]">티어</h2>
//         <div className="h-[9px] top-14 left-[84px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-xs leading-[normal] whitespace-nowrap absolute tracking-[0]">
//           {profile?.tier ?? "—"}
//         </div>
//         <div className="absolute h-[9px] top-[76px] left-[85px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-xs text-center tracking-[0] leading-[normal] whitespace-nowrap">
//           {profile?.lp != null ? `${profile.lp.toLocaleString()} LP` : "—"}
//         </div>
//         <div className="h-[9px] top-[76px] left-[268px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-xs text-center leading-[normal] whitespace-nowrap absolute tracking-[0]">
//           승률 {profile?.wins != null && profile?.losses != null
//             ? Math.round((profile.wins / (profile.wins + profile.losses)) * 100)
//             : 0}%</div>
//         <div className="h-[9px] top-14 left-[246px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-xs text-center leading-[normal] whitespace-nowrap absolute tracking-[0]">
//           {(profile?.wins ?? 0)}승 {(profile?.losses ?? 0)}패
//         </div>
//         <div className="absolute w-[35px] h-9 top-[57px] left-7 bg-[#d9d9d9] rounded-[17.5px/18px] shadow-[0px_4px_4px_#00000040]" role="img" aria-label="티어 아이콘" />
//       </section>

//       {/* Match History */}
//       <section className="absolute w-[557px] h-[191px] top-[267px] left-[370px] bg-[#a6a6a6] rounded-[9.42px]" aria-labelledby="match-history-title">
//         <h2 id="match-history-title" className="h-2.5 top-[21px] left-[18px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[13.2px] leading-[normal] whitespace-nowrap absolute tracking-[0]">
//           매치 히스토리
//         </h2>
//         <div className="h-2 top-[57px] left-[18px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[11.3px] text-center leading-[normal] whitespace-nowrap absolute tracking-[0]">
//           20전 {profile?.recent20Wins ?? 9}승 {profile?.recent20Losses ?? 11}패
//         </div>

//         {/* Win Rate Circle */}
//         <div className="absolute w-[97px] h-[97px] top-[85px] left-3.5">
//           <div className="absolute h-[11px] top-[38px] left-9 [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[15.1px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
//             {profile?.recent20WinRate ?? 45}%
//           </div>
//           <div className="absolute w-[90px] h-[90px] top-0 left-1 bg-[#d9d9d9] rounded-[44.77px]" />
//           <img className="absolute w-[97px] h-[97px] top-0 left-0" alt="승률 차트" src="/images/user/exclude.svg" />
//           <img className="absolute w-px h-3.5 top-0 left-12" alt="Line" src="/images/user/line-111.svg" />
//           <img className="absolute w-px h-[15px] top-[74px] left-12" alt="Line" src="/images/user/line-112.svg" />
//         </div>

//         <div className="absolute h-[11px] top-[116px] left-[123px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[15.1px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
//           KDA {profile?.kda ?? 0}
//         </div>

//         <p className="h-2 top-[134px] left-[123px] [font-family:'Inter-Medium',Helvetica] font-normal text-white text-[11.3px] text-center leading-[normal] whitespace-nowrap absolute tracking-[0]">
//           <span className="font-medium">킬 관여율 </span>
//           <span className="[font-family:'Inter-ExtraBold',Helvetica] font-extrabold">{profile?.killPart ?? 0}%</span>
//         </p>

//         {/* Position Preference */}
//         <div className="h-2 top-[59px] left-[245px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[11.3px] text-center leading-[normal] whitespace-nowrap absolute tracking-[0]">
//           선호 포지션
//         </div>

//         {positionData.map((p, i) => (
//           <div key={p.name}>
//             {/* ✅ 스타일 템플릿 리터럴 올바르게 수정됨 */}
//             <div
//               className="h-[5px] top-[164px] [font-family:'Inter-Regular',Helvetica] font-normal text-white text-[7.5px] text-center leading-[normal] whitespace-nowrap absolute tracking-[0]"
//               style={{ left: `${248 + i * 37}px` }}
//             >
//               {p.name}
//             </div>
//             <div
//               className="absolute w-2.5 h-[74px] top-[85px] bg-[#d9d9d9] rounded-[7.54px]"
//               style={{ left: `${250 + i * 37}px` }}
//             >
//               <div className={`relative ${p.height} ${p.top} bg-[#565e6d] rounded-[7.54px] shadow-[0px_3.77px_3.77px_#00000040]`} />
//             </div>
//           </div>
//         ))}

//         {/* Recent Heroes */}
//         <div className="h-2 top-[58px] left-[388px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[11.3px] text-center leading-[normal] whitespace-nowrap absolute tracking-[0]">
//           플레이한 영웅 *최근 20게임)
//         </div>

//         {recentHeroes.map((h, i) => (
//           <div key={h.name}>
//             <div
//               className="absolute w-6 h-[25px] bg-[#d9d9d9] rounded-[11.9px/12.5px] shadow-[0px_3.77px_3.77px_#00000040]"
//               style={{ top: `${82 + i * 33}px`, left: "389px" }}
//               role="img" aria-label={`${h.name} 아이콘`}
//             />
//             <div
//               className="h-[5px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[7.1px] leading-[normal] whitespace-nowrap absolute tracking-[0]"
//               style={{ top: `${89 + i * 33}px`, left: "417px" }}
//             >
//               {h.name}
//             </div>
//             <div
//               className="h-[5px] [font-family:'Inter-Medium',Helvetica] font-medium text-[7.1px] absolute text-white tracking-[0] leading-[normal] whitespace-nowrap"
//               style={{ top: `${89 + i * 33}px`, left: "455px" }}
//             >
//               {h.winRate}
//             </div>
//             <div
//               className="h-[5px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[7.1px] leading-[normal] whitespace-nowrap absolute tracking-[0]"
//               style={{ top: `${89 + i * 33}px`, left: "497px" }}
//             >
//               {h.record}
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* Most Played Heroes */}
//       <section className="absolute w-[336px] h-[347px] top-[397px] left-4" aria-labelledby="most-played-title">
//         <div className="absolute w-[336px] h-[341px] top-1.5 left-0 bg-[#a6a6a6] rounded-[10px]" />
//         <h2 id="most-played-title" className="w-[110px] h-[75px] top-0 left-[15px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-sm text-center leading-[normal] absolute tracking-[0]">
//           모스트 플레이 영웅
//         </h2>

//         {mostPlayedHeroes.map((h, i) => (
//           <div key={h.name}>
//             <div
//               className="absolute w-10 h-[42px] bg-[#d9d9d9] rounded-[20px/21px] shadow-[0px_4px_4px_#00000040]"
//               style={{ top: `${67 + i * 55}px`, left: "15px" }}
//               role="img" aria-label={`${h.name} 아이콘`}
//             />
//             <div
//               className="h-[9px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-xs leading-[normal] whitespace-nowrap absolute tracking-[0]"
//               style={{ top: `${79 + i * 55}px`, left: "62px" }}
//             >
//               {h.name}
//             </div>
//             <div
//               className={`absolute h-[9px] ${h.kdaWeight} text-white text-xs tracking-[0] leading-[normal] whitespace-nowrap`}
//               style={{ top: `${72 + i * 55}px`, left: "188px" }}
//             >
//               {h.kda}
//             </div>
//             <p
//               className="absolute h-[7px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[10px] tracking-[0] leading-[normal] whitespace-nowrap"
//               style={{ top: `${88 + i * 55}px`, left: "180px" }}
//             >
//               {h.kdaDetail}
//             </p>
//             <div
//               className={`h-[9px] ${h.kdaWeight === "font-black" ? "font-black" : "font-medium"} text-xs absolute text-white tracking-[0] leading-[normal] whitespace-nowrap`}
//               style={{ top: `${72 + i * 55}px`, left: "294px" }}
//             >
//               {h.winRate}
//             </div>
//             <div
//               className="h-[7px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[10px] leading-[normal] whitespace-nowrap absolute tracking-[0]"
//               style={{ top: `${88 + i * 55}px`, left: "288px" }}
//             >
//               {h.games}
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* Summary + Divider */}
//       <div className="h-[9px] top-[230px] left-[17px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#565e6d] text-xs text-center leading-[normal] whitespace-nowrap absolute tracking-[0]">
//         종합
//       </div>
//       <img className="absolute w-[22px] h-[3px] top-[249px] left-[17px]" alt="구분선" src="/images/user/line-109.svg" />

//       {/* SR Progression */}
//       <section className="w-[553px] h-[244px] top-[472px] left-[370px] rounded-[9.42px] border-[0.64px] border-solid absolute bg-[#a6a6a6] border-[#9095a0]" aria-labelledby="sr-progression-title">
//         <h2 id="sr-progression-title" className="absolute top-[17px] left-4 [font-family:'Archivo-SemiBold',Helvetica] font-semibold text-white text-[12.7px] tracking-[0] leading-[17.8px] whitespace-nowrap">
//           SR Progression Over Seasons
//         </h2>
//         <div className="absolute top-[38px] left-4 [font-family:'Inter-Regular',Helvetica] font-normal text-white text-[8.9px] tracking-[0] leading-[12.7px] whitespace-nowrap">
//           텍스트
//         </div>
//         <div className="absolute w-[523px] h-[132px] top-[65px] left-4">
//           <div className="relative w-[503px] h-[132px] bg-[url(/image-2.svg)] bg-[100%_100%]">
//             {seasons.map((s, i) => (
//               <div key={s} className="absolute top-[116px] [font-family:'Inter-Regular',Helvetica] font-normal text-white text-[6.2px] tracking-[0] leading-[9.3px] whitespace-nowrap" style={{ left: `${45 + i * 85}px` }}>
//                 {s}
//               </div>
//             ))}
//             {srValues.map((v, i) => (
//               <div key={v} className="absolute [font-family:'Inter-Regular',Helvetica] font-normal text-[6.2px] leading-[9.3px] text-white tracking-[0] whitespace-nowrap" style={{ top: `${110 - i * 35}px`, left: "22px" }}>
//                 {v}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Stats Cards */}
//       {statsCards.map((s: any) => (
//         <div key={s.title} className={`w-[165px] h-[63px] left-[939px] rounded-lg border-[0.67px] border-solid absolute bg-[#a6a6a6] border-[#9095a0] ${s.position}`}>
//           <div className="absolute top-[11px] left-[11px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[9.4px] tracking-[0] leading-[13.5px] whitespace-nowrap">
//             {s.title}
//           </div>
//           <div className="top-7 left-[11px] [font-family:'Archivo-ExtraBold',Helvetica] font-extrabold text-white text-[20.2px] leading-[24.3px] whitespace-nowrap absolute tracking-[0]">
//             {s.value}
//           </div>
//           {s.icon ? (
//             <img className="absolute w-[11px] h-[11px] top-10" style={{ left: s.trend === "Down" ? "114px" : "127px" }} alt={`${s.trend} 화살표`} src={s.icon} />
//           ) : (
//             s.trend === "Neutral" && (
//               <div className="absolute w-[11px] h-[11px] top-10 left-[107px]">
//                 <div className="relative w-[7px] h-px top-[5px] left-0.5 bg-[url(/vector.svg)] bg-[100%_100%]" />
//               </div>
//             )
//           )}
//           <div className="absolute top-[38px] [font-family:'Inter-Regular',Helvetica] font-normal text-white text-[9.4px] tracking-[0] leading-[13.5px] whitespace-nowrap" style={{ left: s.trend === "Down" ? "127px" : s.trend === "Neutral" ? "121px" : "140px" }}>
//             {s.trend}
//           </div>
//         </div>
//       ))}
//     </main>
//   );
// }

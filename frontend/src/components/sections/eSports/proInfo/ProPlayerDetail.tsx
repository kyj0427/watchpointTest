"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// 2. 데이터 소스를 import 합니다.
import { proplayerData } from "@public/data/proplayerData";
import { proteamData } from "@public/data/proteamData"; // 팀 데이터도 import 해야 합니다.
import ESportsMatchesPast from "../ESportsMatchesPast";

// 3. 데이터 타입을 명확하게 정의합니다. (any 대신)
//    (별도의 types/player.ts 파일로 분리하는 것이 가장 좋습니다.)
interface PlayerData {
  player_id: number;
  player_rank: string;
  player_position: string;
  player_name: string;
  signature_hero: any[]; // StaticImageData[]
  player_img_url: any; // StaticImageData
  win_rate: number;
  region: string;
  team_id: number;
  player_ability: number;
}

interface TeamData {
  team_id: number;
  logo: any;
  rank: string;
  region: string;
  team_name: string;
  players: any[];
  win_rate: number;
}

// 4. 컴포넌트가 받을 props 타입을 정의합니다.
interface PlayerDetailViewProps {
  player_id: string; // URL 파라미터는 보통 string 타입입니다.
}

const ProPlayerDetail = ({ player_id }: PlayerDetailViewProps) => {
  // 5. state의 타입을 명확하게 지정합니다.
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [team, setTeam] = useState<TeamData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 6. useEffect를 사용하여 데이터를 가져옵니다.
  useEffect(() => {
    // --- 여기가 핵심 수정 부분 ---
    console.log(
      `[디버그] useEffect가 playerId: '${player_id}' 값으로 실행되었습니다.`
    );

    if (!player_id) {
      console.log("[디버그] playerId가 없으므로 데이터 fetching을 중단합니다.");
      setIsLoading(false); // playerId가 없어도 로딩은 끝내야 함
      return;
    }

    const fetchData = () => {
      // async/await를 제거하여 흐름을 더 명확하게 만듭니다. (이 경우엔 비동기 작업이 없음)
      try {
        console.log("[디버그] 데이터 검색을 시작합니다...");
        setIsLoading(true);
        setError(null);

        const numericId = parseInt(player_id, 10);

        // 1. 선수를 찾습니다.
        const foundPlayer = proplayerData.find(
          (p) => p.player_id === numericId
        );
        console.log("[디버그] 선수 검색 결과:", foundPlayer);

        // 2. 선수를 찾지 못했다면, 에러를 발생시킵니다.
        if (!foundPlayer) {
          throw new Error(
            `ID '${player_id}'에 해당하는 선수 정보를 찾을 수 없습니다.`
          );
        }

        // 3. 팀을 찾습니다.
        const foundTeam = proteamData[foundPlayer.team_id];
        console.log("[디버그] 팀 검색 결과:", foundTeam);

        // 4. 팀을 찾지 못했다면, 에러를 발생시킵니다.
        if (!foundTeam) {
          throw new Error(
            `Team ID '${foundPlayer.team_id}'에 해당하는 팀 정보를 찾을 수 없습니다.`
          );
        }

        setPlayer(foundPlayer);
        setTeam(foundTeam);
        console.log("[디버그] 선수와 팀 state가 성공적으로 설정되었습니다.");
      } catch (err) {
        console.error("[에러 발생]", err); // 에러를 콘솔에 출력
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        console.log("[디버그] finally 블록 실행됨. 로딩을 종료합니다.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [player_id]); // playerId가 바뀔 때마다 이 useEffect는 다시 실행됩니다.

  // 8. 로딩 및 에러 상태에 따른 UI를 렌더링합니다.
  if (isLoading) {
    return (
      <div className="container py-20 text-center">
        데이터를 불러오는 중입니다...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-20 text-center text-red-500">
        오류: {error}
      </div>
    );
  }

  if (!player || !team) {
    return (
      <div className="container py-20 text-center">
        선수 또는 팀 정보가 없습니다.
      </div>
    );
  }

  return (
    <section className="container py-10 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* --- 왼쪽 사이드바 (선수 프로필) --- */}
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="space-y-6">
            {/* 1. 선수 기본 정보 카드 */}
            <div className="bg-b-neutral-3 p-6 rounded-lg text-center border border-shap">
              <Image
                src={player.player_img_url}
                alt={player.player_name}
                width={120}
                height={120}
                className="mx-auto rounded-full mb-4 ring-2 ring-primary"
              />
              <h1 className="text-3xl font-bold text-white">
                {player.player_name}
              </h1>
              <p className="text-gray-400 mt-1">{player.region}</p>
            </div>

            {/* 2. 팀, 역할, 소셜 링크 */}
            <div className="bg-b-neutral-3 p-6 rounded-lg border border-shap">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Team</span>
                  <Link
                    href={`/teams/${player.team_id}`}
                    className="font-semibold text-white link-1 flex items-center gap-2"
                  >
                    <Image
                      src={team.logo}
                      alt={team.team_name}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                    {team.team_name}
                  </Link>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Role</span>
                  <span className="font-semibold text-white">
                    {player.player_position}
                  </span>
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-6 border-t border-shap pt-4">
                <Link href="#" className="text-gray-400 hover:text-primary">
                  <i className="ti ti-brand-twitch text-2xl"></i>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-primary">
                  <i className="ti ti-brand-twitter text-2xl"></i>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-primary">
                  <i className="ti ti-brand-youtube text-2xl"></i>
                </Link>
              </div>
            </div>

            {/* 3. 플레이 영웅 */}
            <div className="bg-b-neutral-3 p-6 rounded-lg border border-shap">
              <h3 className="text-xl font-bold text-white mb-4">
                주요 플레이 영웅
              </h3>
              <div className="flex gap-2">
                {player.signature_hero.map((heroImg, i) => (
                  <Image
                    key={i}
                    src={heroImg}
                    alt={`${player.player_name}'s hero ${i + 1}`}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* --- 오른쪽 메인 콘텐츠 주요 스탯 --- */}
        <main className="lg:col-span-8 xl:col-span-9">
          <div className="space-y-6">
            <div className="bg-b-neutral-3 p-6 rounded-lg border border-shap">
              <h2 className="text-2xl font-bold text-white mb-4">
                선수 주요 스탯
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-b-neutral-2 p-4 rounded-md">
                  <p className="text-gray-400 text-sm">총 경기 수</p>
                  <p className="text-2xl font-bold text-white">250</p>
                </div>
                <div className="bg-b-neutral-2 p-4 rounded-md">
                  <p className="text-gray-400 text-sm">승률</p>
                  <p className="text-2xl font-bold text-white">
                    {player.win_rate}%
                  </p>
                </div>
                <div className="bg-b-neutral-2 p-4 rounded-md">
                  <p className="text-gray-400 text-sm">평균 KDA</p>
                  <p className="text-2xl font-bold text-white">10.5</p>
                </div>
                <div className="bg-b-neutral-2 p-4 rounded-md">
                  <p className="text-gray-400 text-sm">Player Rank</p>
                  <p className="text-2xl font-bold text-primary">
                    #{player.player_rank}
                  </p>
                </div>
              </div>
            </div>
            {/* --- 오른쪽 메인 콘텐츠 지난 경기 결과 --- */}
            <div className="bg-b-neutral-3 p-6 rounded-lg border border-shap">
              <h2 className="text-2xl font-bold text-white mb-4">
                지난 경기 결과
              </h2>
              <p className="text-gray-400">지난 경기 결과 표시</p>
            </div>
            {/* --- 오른쪽 메인 콘텐츠 통계 --- */}
            <div className="bg-b-neutral-3 p-6 rounded-lg border border-shap">
              <h2 className="text-2xl font-bold text-white mb-4">통계</h2>
              <p className="text-gray-400">통게 차트 표시</p>
            </div>
            {/* --- 오른쪽 메인 콘텐츠 영상 --- */}
            <div className="bg-b-neutral-3 p-6 rounded-lg border border-shap">
              <h2 className="text-2xl font-bold text-white mb-4">영상</h2>
              <p className="text-gray-400">플레이 영상 및 링크 표시</p>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default ProPlayerDetail;

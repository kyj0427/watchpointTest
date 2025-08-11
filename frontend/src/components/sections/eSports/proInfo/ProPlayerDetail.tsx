"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import { proplayerData } from "@public/data/proplayerData";
import { proteamData } from "@public/data/proteamData";
import { esportsmatchespast } from "@public/data/esportsmatchespast";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js에 BarElement를 추가로 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Chart.js에 필요한 모듈 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

interface PlayerDetailViewProps {
  player_id: string;
}

const ProPlayerDetail = ({ player_id }: PlayerDetailViewProps) => {
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [team, setTeam] = useState<TeamData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(`useEffect가 '${player_id}' 값으로 실행되었습니다.`);

    if (!player_id) {
      setIsLoading(false);
      return;
    }

    const fetchData = () => {
      try {
        setIsLoading(true);
        setError(null);

        const numericId = parseInt(player_id, 10);

        const foundPlayer = proplayerData.find(
          (p) => p.player_id === numericId
        );
        console.log("[디버그] 선수 검색 결과:", foundPlayer);

        if (!foundPlayer) {
          throw new Error(
            `ID '${player_id}'에 해당하는 선수 정보를 찾을 수 없습니다.`
          );
        }

        const foundTeam = proteamData.find(
          (t) => t.team_id === foundPlayer.team_id
        );

        if (!foundTeam) {
          throw new Error(
            `Team ID '${foundPlayer.team_id}'에 해당하는 팀 정보를 찾을 수 없습니다.`
          );
        }

        setPlayer(foundPlayer);
        setTeam(foundTeam);
      } catch (err) {
        console.error("[에러 발생]", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [player_id]); // playerId가 바뀔 때마다 이 useEffect는 다시 실행됩니다.

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

  const playerMatches = esportsmatchespast
    .filter(
      (match) =>
        match.leftPlayer.name === team.team_name ||
        match.rightPlayer.name === team.team_name
    )
    .slice(0, 5); // 최근 5경기만

  const abilityLineChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "선수 능력치 변화",
        data: [65, 59, 80, 81, 56, player.player_ability],
        fill: false,
        borderColor: "#F99E1A",
        tension: 0.1,
      },
    ],
  };

  const heroWinRateBarChartData = {
    labels: ["겐지", "애쉬", "트레이서", "에코", "솜브라"],
    datasets: [
      {
        label: "주요 영웅 승률 (%)",
        data: [72, 68, 65, 62, 58],
        backgroundColor: "rgba(249, 158, 26, 0.6)",
        borderColor: "#F99E1A",
        borderWidth: 1,
      },
    ],
  };

  const youtubeVideoIds = ["RxTKvLyB17w", "jlan5VO2-fY", "3zgYNsawGfU"];

  return (
    <section className="container py-10 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* --- 왼쪽 사이드바 (선수 프로필) --- */}
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="space-y-6">
            {/* 선수 기본 정보 카드 */}
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

            {/* 팀, 역할, 소셜 링크 */}
            <div className="bg-b-neutral-3 p-6 rounded-lg border border-shap">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Team</span>
                  <Link
                    href={`/e-sports/pro-teams/${team.team_id}`}
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

            {/* 플레이 영웅 */}
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
              {/* 필터링된 경기 결과 렌더링 */}
              {playerMatches.length > 0 ? (
                <div className="space-y-4">
                  {playerMatches.map((match) => (
                    <div
                      key={match.id}
                      className="flex justify-between items-center bg-b-neutral-2 p-3 rounded-md text-white"
                    >
                      <span className="w-1/3 text-right">
                        {match.leftPlayer.name}
                      </span>
                      <span className="font-bold">
                        {match.leftScore} : {match.rightScore}
                      </span>
                      <span className="w-1/3 text-left">
                        {match.rightPlayer.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">지난 경기 결과가 없습니다.</p>
              )}
            </div>
            {/* --- 오른쪽 메인 콘텐츠 통계 --- */}
            <div className="bg-b-neutral-3 p-6 rounded-lg border border-shap">
              <h2 className="text-2xl font-bold text-white mb-4">통계</h2>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* --- 왼쪽 차트 영역 --- */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2 text-center">
                    능력치 변화 추이
                  </h3>
                  <Line data={abilityLineChartData} />
                </div>

                {/* --- 오른쪽 차트 영역 --- */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2 text-center">
                    주요 영웅 승률
                  </h3>
                  <Bar data={heroWinRateBarChartData} />
                </div>
              </div>
            </div>

            {/* --- 오른쪽 메인 콘텐츠 영상 --- */}
            <div className="bg-b-neutral-3 p-6 rounded-lg border border-shap">
              <h2 className="text-2xl font-bold text-white mb-4">주요 영상</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {youtubeVideoIds.map((videoId) => (
                  <div key={videoId} className="aspect-w-16 aspect-h-7">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`Player Highlight Video ${videoId}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-lg"
                    ></iframe>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default ProPlayerDetail;

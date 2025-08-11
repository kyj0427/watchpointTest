"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { proteamData } from "@public/data/proteamData";
import { proplayerData } from "@public/data/proplayerData";
import { esportsmatches } from "@public/data/esportsmatches";

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

interface ProTeamDetailProps {
  team_id: string;
}

const ProTeamDetail = ({ team_id }: ProTeamDetailProps) => {
  const [team, setTeam] = useState<TeamData | null>(null);
  const [roster, setRoster] = useState<PlayerData[]>([]); // 선수 목록은 배열
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- 데이터 로딩 로직 ---
  useEffect(() => {
    if (!team_id) return;

    const fetchData = () => {
      try {
        setIsLoading(true);
        const numericId = parseInt(team_id, 10);

        const foundTeam = proteamData.find((t) => t.team_id === numericId);
        if (!foundTeam) {
          throw new Error(
            `ID '${team_id}'에 해당하는 팀 정보를 찾을 수 없습니다.`
          );
        }

        // 해당 팀 ID를 가진 모든 선수 필터링
        const foundRoster = proplayerData.filter(
          (p) => p.team_id === numericId
        );

        setTeam(foundTeam);
        setRoster(foundRoster);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("알 수 없는 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [team_id]);

  // --- 로딩 및 에러 처리 UI ---
  if (isLoading)
    return (
      <div className="container py-20 text-center">
        팀 정보를 불러오는 중입니다...
      </div>
    );
  if (error)
    return (
      <div className="container py-20 text-center text-red-500">
        오류: {error}
      </div>
    );
  if (!team)
    return (
      <div className="container py-20 text-center">팀 정보가 없습니다.</div>
    );

  const playerMatches = esportsmatches
    .filter(
      (match) =>
        match.leftPlayer.name === team.team_name ||
        match.rightPlayer.name === team.team_name
    )
    .slice(0, 5);

  // --- 최종 UI 렌더링 ---
  return (
    <section className="container py-10 md:py-20">
      {/* 상단 팀 배너 및 정보 */}
      <div className="flex items-center gap-6 mb-8">
        <div className="bg-b-neutral-2 p-2 rounded-md ring-4 ring-shap">
          <Image
            src={team.logo}
            alt={team.team_name}
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white">{team.team_name}</h1>
          <p className="text-gray-400">
            Professional Esports Team / {team.region}
          </p>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 왼쪽 메인 콘텐츠 (현재 로스터) */}
        <div className="lg:w-2/3">
          <div className="bg-b-neutral-3 p-6 rounded-lg h-full">
            {" "}
            <h2 className="text-2xl font-bold text-white mb-4">현재 로스터</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {roster.map((player) => (
                <Link
                  href={`/e-sports/pro-players/${player.player_id}`}
                  key={player.player_id}
                  className="block bg-b-neutral-2 p-4 rounded-lg text-center group hover:bg-primary/20 transition-colors"
                >
                  <div
                    className="mx-auto rounded-full mb-2 w-[80px] h-[80px] bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${player.player_img_url.src})`,
                    }}
                  ></div>

                  <p className="font-bold text-white group-hover:text-primary transition-colors">
                    {player.player_name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {player.player_position}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽 사이드바*/}
        <aside className="lg:w-1/3">
          <div className="space-y-6 h-full flex flex-col">
            {" "}
            {/* 팀 정보 카드 */}
            <div className="bg-b-neutral-3 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">팀 정보</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">지역</span>
                  <span className="text-white">{team.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">리그</span>
                  <span className="text-white">OWCS Korea</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">코치</span>
                  <span className="text-white">Kong , Pavane</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">매니저</span>
                  <span className="text-white">Moon</span>
                </div>
              </div>

              {/* SNS 아이콘 링크 */}
              <div className="flex justify-center gap-4 mt-6 border-t border-shap pt-4">
                <Link
                  href={"#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  title="트위터 방문하기"
                >
                  <i className="ti ti-brand-twitter text-2xl"></i>
                </Link>
                <Link
                  href={"#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  title="유튜브 채널 방문하기"
                >
                  <i className="ti ti-brand-youtube text-2xl"></i>
                </Link>
              </div>
            </div>
            {/* 예정된 경기 카드 */}
            <div className="bg-b-neutral-3 p-6 rounded-lg flex-1">
              {" "}
              <h3 className="text-xl font-bold text-white mb-4">예정된 경기</h3>
              <div className="space-y-3">
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
                  <p className="text-gray-400">예정된 경기가 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ProTeamDetail;

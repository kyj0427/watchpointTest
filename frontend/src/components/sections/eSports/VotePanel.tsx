"use client";

//나중에 DB값 넣어서 경기 status가 END가 되면 투표를 못하게 막아놨으니 활용해주세요

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

interface Player {
  name: string;
  image: string;
}

interface VotePanelProps {
  leftPlayer: Player;
  rightPlayer: Player;
}

const VotePanel = ({ leftPlayer, rightPlayer }: VotePanelProps) => {
  // 1. 투표 현황을 관리할 state: 초기값
  const [votes, setVotes] = useState({ left: 0, right: 0 });

  // 2. 사용자가 어디에 투표했는지 관리할 state
  const [userVote, setUserVote] = useState<string | null>(null);

  // 3. 투표 버튼 클릭 시 실행될 함수
  const handleVote = (team: "left" | "right") => {
    if (userVote !== null) return;
    setUserVote(team);

    if (team === "left") {
      setVotes((prevVotes) => ({ ...prevVotes, left: prevVotes.left + 1 }));
    } else {
      setVotes((prevVotes) => ({ ...prevVotes, right: prevVotes.right + 1 }));
    }
  };

  // 4. state가 변경될 때마다, 총 투표 수와 퍼센티지를 다시 계산
  const totalVotes = votes.left + votes.right;
  const leftPercentage = totalVotes > 0 ? (votes.left / totalVotes) * 100 : 50;
  const rightPercentage = 100 - leftPercentage;

  if (!leftPlayer || !rightPlayer) {
    return null;
  }

  // 나중에 DB or 크롤링과 연동해서 사용하기
  if (status === "END") {
    return (
      <div className="flex flex-col items-center gap-4 text-center py-10">
        <i className="ti ti-lock text-4xl text-gray-500"></i>
        <h4 className="text-xl font-bold text-white">투표 종료</h4>
        <p className="text-gray-400">
          이 경기는 이미 종료되어 투표할 수 없습니다.
        </p>
        {/* 여기에 최종 투표 결과만 보여주는 UI를 추가할 수도 있습니다. */}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <h4 className="text-xl font-bold text-white">유저 승부 예측 투표</h4>
      <p className="text-sm text-gray-400">
        총 {totalVotes.toLocaleString()}명 참여
      </p>

      {/* --- 실시간 투표 현황 바 --- */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-primary">
            {leftPercentage.toFixed(0)}%
          </span>
          <span className="font-semibold text-gray-400">
            {rightPercentage.toFixed(0)}%
          </span>
        </div>
        <div className="relative w-full h-4 bg-gray-700 rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${leftPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* --- 투표 버튼 --- */}
      <div className="w-full grid grid-cols-2 gap-4 text-center mt-4">
        {/* 왼쪽 팀 투표 */}
        <div>
          <Image
            className="avatar size-16 mx-auto mb-2 object-contain"
            src={leftPlayer.image}
            width={64}
            height={64}
            alt={leftPlayer.name}
          />
          <p className="font-semibold text-white mb-3">{leftPlayer.name}</p>
          <button
            onClick={() => handleVote("left")}
            disabled={userVote !== null}
            className={clsx(
              "w-full py-2 rounded-lg font-bold transition-all",
              userVote === "left"
                ? "bg-primary text-white"
                : "bg-b-neutral-2 text-white hover:bg-primary/80",
              userVote !== null && userVote !== "left"
                ? "opacity-50 cursor-not-allowed"
                : ""
            )}
          >
            {userVote === "left" ? "✔ 투표 완료" : "투표하기"}
          </button>
        </div>

        {/* 오른쪽 팀 투표 */}
        <div>
          <Image
            className="avatar size-16 mx-auto mb-2 object-contain"
            src={rightPlayer.image}
            width={64}
            height={64}
            alt={rightPlayer.name}
          />
          <p className="font-semibold text-white mb-3">{rightPlayer.name}</p>
          <button
            onClick={() => handleVote("right")}
            disabled={userVote !== null}
            className={clsx(
              "w-full py-2 rounded-lg font-bold transition-all",
              userVote === "right"
                ? "bg-primary text-white"
                : "bg-b-neutral-2 text-white hover:bg-primary/80",
              userVote !== null && userVote !== "right"
                ? "opacity-50 cursor-not-allowed"
                : ""
            )}
          >
            {userVote === "right" ? "✔ 투표 완료" : "투표하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotePanel;

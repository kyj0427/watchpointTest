// VotePanel

"use client";

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
  const [userVote, setUserVote] = useState<string | null>(null);
  const totalVotes = 1234;
  const leftVotes = Math.round(totalVotes * 0.62);
  const rightVotes = totalVotes - leftVotes;

  if (!leftPlayer || !rightPlayer) {
    return null;
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
            {((leftVotes / totalVotes) * 100).toFixed(0)}%
          </span>
          <span className="font-semibold text-gray-400">
            {((rightVotes / totalVotes) * 100).toFixed(0)}%
          </span>
        </div>
        <div className="relative w-full h-4 bg-gray-700 rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${(leftVotes / totalVotes) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* --- VS 대결 및 투표 버튼 --- */}
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
            onClick={() => setUserVote("left")}
            disabled={userVote !== null}
            className={clsx(/* ... */)}
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
            onClick={() => setUserVote("right")}
            disabled={userVote !== null}
            className={clsx(/* ... */)}
          >
            {userVote === "right" ? "✔ 투표 완료" : "투표하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotePanel;

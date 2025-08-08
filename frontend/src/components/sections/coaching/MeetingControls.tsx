"use client";

import { useState } from "react";

const MeetingControls = () => {
  // 각 버튼의 켜기/끄기 상태를 관리하기 위한 state
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(true); // 기본값을 카메라 끈 상태로 설정
  const [isSharing, setIsSharing] = useState(false);

  // 아이콘 버튼에 공통으로 적용할 스타일
  const iconButtonClasses =
    "bg-neutral-700 hover:bg-neutral-600 text-white p-3 rounded-lg transition-colors duration-200";

  return (
    // 전체 컨트롤 바를 감싸는 컨테이너
    <div className="bg-transparent p-3 flex items-center justify-center">

      <div className="flex items-center gap-3">
        {/* 1. 마이크 버튼 */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={iconButtonClasses}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          <i
            className={`ti ${
              isMuted ? "ti-microphone-off" : "ti-microphone"
            } text-2xl`}
          ></i>
        </button>

        {/* 2. 볼륨(스피커) 버튼 */}
        <button className={iconButtonClasses} aria-label="Volume settings">
          <i className="ti ti-volume text-2xl"></i>
        </button>

        {/* 3. 미팅 나가기 버튼 */}
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 mx-4">
          End meeting
        </button>

        {/* 4. 화면 공유 버튼 */}
        <button
          onClick={() => setIsSharing(!isSharing)}
          className={iconButtonClasses}
          aria-label={isSharing ? "Stop sharing" : "Share screen"}
        >
          <i
            className={`ti ti-screen-share text-2xl ${
              isSharing ? "text-blue-400" : "" // 공유 중일 때 파란색으로 강조
            }`}
          ></i>
        </button>

        {/* 5. 비디오(카메라) 버튼 */}
        <button
          onClick={() => setIsCameraOff(!isCameraOff)}
          className={iconButtonClasses}
          aria-label={isCameraOff ? "Turn camera on" : "Turn camera off"}
        >
          <i
            className={`ti ${
              isCameraOff ? "ti-video-off" : "ti-video"
            } text-2xl`}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default MeetingControls;
"use client";

import LiveChatRoom from "./LiveChatRoom";
import LiveVideoFeed from "./LiveVideoFeed";
import MeetingControls from "./MeetingControls";

const CoachingRoom = () => {
  
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4 py-8 gap-4">

      {/* websocker연결 및 이벤트 추가 */}

      {/*  코칭방 제목 + 날짜 + 시간 뱃지 */}
      <div className="w-full max-w-screen-2xl text-white flex justify-between items-center">
        {/* 제목 + 날짜 */}
        <div>
          <h2 className="text-xl font-bold">코칭방 제목</h2>
          <div className="flex items-center text-sm text-gray-300 mt-1">
            <svg
              className="w-4 h-4 mr-1 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Sep 02, 2022, 09:00 AM
          </div>
        </div>

        {/* 시간 뱃지 */}
        <div>
          <span className="bg-white text-black text-sm px-3 py-1 rounded-full shadow flex items-center gap-1">
            <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
            12:00
          </span>
        </div>
      </div>

      {/*  비디오 + 채팅 컨테이너 */}
      <div className="flex flex-col lg:flex-row gap-4 w-full max-w-screen-2xl h-[700px]">

        {/* 실시간 영상 영역 */}
        <div className="lg:w-2/3 w-full h-full bg-white rounded-xl shadow-md flex items-center justify-center">
          <p className="text-black text-xl font-semibold">
            강의 준비 중입니다...
          </p>
          {/* 이후 실제 LiveVideoFeed 연결 시 아래 코드 사용 */}
          {/* <LiveVideoFeed /> */}
        </div>

        {/* 채팅 영역 */}
        <div className="lg:w-1/3 w-full h-full">
          <LiveChatRoom />
        </div>
      </div>

      {/* 컨트롤 바 */}
      <div className="w-full max-w-screen-2xl mt-0 bg-transparent p-0">
        <MeetingControls />
      </div>
    </div>
  );
};

export default CoachingRoom;
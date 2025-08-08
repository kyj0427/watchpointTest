"use client";

import { useEffect, useRef } from "react";

const LiveVideoFeed = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    //현재는 로컬 스트림만 표시 중
  //WebRTC 연결 시 peer connection 생성하고,
  //ffer/answer, ICE candidate 교환 후 remoteStream도 렌더링해야 함


    // 카메라 + 마이크 스트림 요청
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        //여기서 stream을 외부러 넘겨서 외부로 넘겨서 WebRTc에 연결해야 함

      })
      .catch((err) => {
        console.error("Error accessing media devices.", err);
      });
  }, []);

  return (
    <div className="w-full h-full bg-black rounded-xl overflow-hidden flex items-center justify-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted // 자기 자신 소리 차단 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default LiveVideoFeed;

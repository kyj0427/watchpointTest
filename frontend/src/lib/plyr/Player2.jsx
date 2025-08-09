"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

const Player = ({ videoSrc, posterSrc, videoTitle = "" }) => {
  // YouTube URL인지 확인
  const isYouTube = videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be');
  
    useEffect(() => {
    console.log("Player2 useEffect 실행됨, isYouTube:", isYouTube);
    
    // YouTube가 아닐 때만 Plyr 초기화
    if (!isYouTube) {
      console.log("로컬 비디오 감지됨, Plyr 초기화 시작");
      
      // DOM이 완전히 렌더링된 후 초기화
      const timer = setTimeout(() => {
        const videoElement = document.querySelector("video");
        console.log("video 요소 찾기:", videoElement);

        if (videoElement) {
          console.log("video 요소 발견, Plyr 초기화 중...");
          
          const controls = [
            "play-large",
            "play",
            "progress",
            "current-time",
            "mute",
            "volume",
            "pip",
            "fullscreen",
          ];

          try {
                         const player = new Plyr(videoElement, {
               muted: false,
               volume: 1,
               controls,
             });
            
            console.log("Plyr 초기화 성공:", player);

            // Plyr이 준비되면 콘솔에 메시지
            player.on("ready", () => {
              console.log("Plyr 준비 완료, 컨트롤 표시됨");
            });

            // Cleanup function to destroy the Plyr instance when the component is unmounted
            return () => {
              player.destroy();
            };
          } catch (error) {
            console.error("Plyr 초기화 실패:", error);
          }
        } else {
          console.log("video 요소를 찾을 수 없음");
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isYouTube, posterSrc]);

  return (
    <div className={`${isYouTube ? 'plyr__video-embed' : 'plyr__video-wrapper'} player relative w-full aspect-video`}>
      {isYouTube ? (
        <>
          {/* YouTube용 썸네일 이미지 */}
          {posterSrc && (
            <Image 
              className="absolute inset-0 w-full h-full object-cover z-10 plyr_custom_poster cursor-pointer" 
              src={posterSrc} 
              alt="poster" 
              fill
            />
          )}
          {/* YouTube iframe */}
          <iframe
            src={videoSrc}
            title={videoTitle}
            allowFullScreen
            allow="autoplay"
            className="w-full h-full relative z-20"
          />
        </>
            ) : (
                   // 로컬 비디오 파일
          <video
            src={videoSrc}
            className="w-full h-full"
          />
      )}
    </div>
  );
};

export default Player;

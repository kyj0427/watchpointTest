"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Modal } from "@/components/ui";
import VideoUploader from "@/components/ui/fileUpload/VideoUpload";
import Link from "next/link";

const EmptyState = () => {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState<null | boolean>(null);
  const [selectedFile, setSelectedFile] = useState<File | { type: 'url', url: string, platform: string } | null>(null);

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("파일을 먼저 선택해주세요.");
      return;
    }

    const formData = new FormData();
    
    // 파일인지 URL인지 확인
    if (selectedFile instanceof File) {
      formData.append("file", selectedFile);
    } else if (selectedFile.type === 'url') {
      // URL인 경우
      formData.append("url", selectedFile.url);
      formData.append("platform", selectedFile.platform);
    }

    try {
      const response = await fetch("/api/ai-process-video", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      console.log("서버 응답:", data);
      setOpenModal(null); // 모달 닫기
    } catch (error) {
      console.error("업로드 실패:", error);
    }
  };

  // 데모 동영상 데이터
  const demoVideos = [
    {
      id: 1,
      title: "플레이 영상 1",
      date: "2024.01.15",
      status: "분석 완료",
      thumbnail: ""
    },
    {
      id: 2,
      title: "플레이 영상 2", 
      date: "2024.01.14",
      status: "분석 완료",
      thumbnail: ""
    },
    {
      id: 3,
      title: "플레이 영상 3",
      date: "2024.01.13", 
      status: "분석 완료",
      thumbnail: ""
    }
  ];

  return (
    <div className="space-y-30p">
      

      {/* 데모 동영상 라이브러리 섹션 */}
      <div className="demo-video-section  rounded-24 p-40p border border-b-neutral-3">
        
        
        {user ? (
          // 로그인 유저: 빈 상태 안내
          <div className="text-center py-40p">
            
            <h4 className="heading-4 text-w-neutral-1 mb-8p">첫 번째 동영상을 업로드해보세요!</h4>
            <p className="text-l-regular text-w-neutral-4 mb-24p">
              동영상을 업로드하면 Athena AI가 자세한 분석을 제공합니다.
            </p>
            <button 
              onClick={() => setOpenModal(true)}
              className="btn btn-md btn-primary rounded-12"
            >
              동영상 업로드하기
            </button>
          </div>
        ) : (
          // 비로그인 유저: 데모 동영상 목록
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-24p mb-24p">
              {demoVideos.map((video) => (
                <div key={video.id} className="video-card p-24p rounded-16 hover:bg-b-neutral-4 transition-1 cursor-pointer">
                  <div className="aspect-video bg-b-neutral-4 rounded-12 mb-16p flex items-center justify-center">
                    <span className="text-2xl">{video.thumbnail}</span>
                  </div>
                  <h4 className="heading-5 text-w-neutral-1 mb-8p">{video.title}</h4>
                  <p className="text-s-regular text-w-neutral-4 mb-16p">{video.date} 업로드</p>
                  <div className="flex-y justify-between">
                    <span className="text-s-regular text-primary">{video.status}</span>
                    <button className="btn btn-sm btn-primary rounded-12">상세보기</button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 회원가입 유도 섹션 */}
            <div className="guest-notice  rounded-24 p-40p border border-primary/20 text-center">
              <h3 className="heading-4 text-w-neutral-1 mb-16p">더 많은 기능을 이용하세요!</h3>
              <p className="text-l-regular text-w-neutral-4 mb-24p">
                회원가입하면 채팅 기록 저장, 개인화된 분석 등 모든 기능을 이용할 수 있습니다.
              </p>
            <div className="flex-y gap-16p justify-center">
               <Link href="/login" className="btn btn-md btn-primary rounded-12">
                로그인
               </Link>
               <Link href="/sign-up" className="btn btn-md btn-neutral-1 rounded-12">
                회원가입
               </Link>
            </div>
            </div>
          </>
        )}
      </div>

      

      {/* 동영상 업로드 모달 */}
      {openModal !== null && (
        <Modal open={openModal !== null} onClick={() => setOpenModal(null)}>
          <div className="relative bg-b-neutral-3 py-5 px-32p md:w-[680px] sm:w-[500px] xsm:w-[360px] w-[280px] rounded-20 overflow-hidden">
            <button
              onClick={() => setOpenModal(null)}
              className="absolute top-3 right-3 flex items-center justify-center icon-32 bg-b-neutral-3 text-w-neutral-2 hover:text-primary transition-1 icon-24"
            >
              <i className="ti ti-circle-x"></i>
            </button>
            <div className="overflow-y-auto scrollbar-sm">
              <div className="pr-2 mt-5">
                <h3 className="heading-3 text-white mb-3 text-center">
                  Athena에게 피드백 받기
                </h3>
                {/* 비디오 업로드 컴포넌트 */}
                <VideoUploader onFileChange={setSelectedFile}/>
                <div className="flex justify-center">
                  <button
                    onClick={handleSubmit}
                    className="btn btn-md btn-primary rounded-12"
                  >
                    제출하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EmptyState;

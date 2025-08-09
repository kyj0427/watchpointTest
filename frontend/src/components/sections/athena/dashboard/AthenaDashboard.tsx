import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Modal } from "@/components/ui";
import VideoUploader from "@/components/ui/fileUpload/VideoUpload";
import AthenaVideoList from "./AthenaVideoList";
import EmptyState from "./EmptyState";
import { userVideosData, Video } from "@public/data/athenaVideos";
import { resolve } from "path";

//동영상에서 썸네일 생성
const generateThumbnail = (videoFile: File): Promise<string> => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    video.onloadeddata = () => {
      //동영상 1초 지점에서 썸네일 추출출
      video.currentTime = 1;
      video.onseeked = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx?.drawImage(video, 0, 0);

        // Canvas를 base64 이미지로 변환
        const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
        resolve(thumbnail);
      };
    };
    
    video.src = URL.createObjectURL(videoFile);
  });
};

const AthenaDashboard = ({ isGuest = false, userId = null }) => {
    const { user } = useAuth(); //유저정보불러오기
    const [userVideos, setUserVideos] = useState<Video[]>([]); // 유저 비디오 임시데이터
    const [openModal, setOpenModal] = useState<null | boolean>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    
    // props로 받은 값이 없으면 현재 유저 정보 사용
    const currentUserId = userId || user?.id;
    const isCurrentGuest = isGuest || !user;

    
    // 로그인 유저만 동영상 데이터 가져오기
    useEffect(()=>{
      if (user) {
        // 유저별 동영상목록 불러오기
        const userData = userVideosData[user.id];
        if (userData) {
          setUserVideos(userData.videos);
        } else {
          // 유저 데이터가 없으면 빈 배열
          setUserVideos([]);
        }
      }
    },[user])



    const handleSubmit = async () => {
        if (!selectedFile) {
            alert("파일을 먼저 선택해주세요.");
            return;
        }

        //썸네일 추출
        // const thumbnail = await generateThumbnail(selectedFile);

        const formData = new FormData();
        formData.append("file", selectedFile);
        // formData.append("thumbnail", thumbnail); //썸네일도 함께 전송

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

    return (
      <section className="section-title">
        <div className="container mx-auto px-4 py-8">
          <h2 className="heading-2 text-w-neutral-1 mb-3">
            {isCurrentGuest ? "게스트 Athena 라이브러리" : `${user?.name || currentUserId}님의 Athena 라이브러리`}
          </h2>
          {/* 동영상 업로드 버튼 - 로그인 유저 + 동영상 있을 때만 표시 */}
          {user && userVideos.length > 0 && (
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setOpenModal(true)}
                className="btn btn-md btn-primary rounded-12 flex items-center gap-2 hover:bg-primary/80 transition-colors"
              >
                <i className="ti ti-upload icon-20"></i>
                동영상 업로드
              </button>
            </div>
          )}
          <div>
            {!user ? (
            // 비로그인 유저: 항상 EmptyState
            <EmptyState />
              ) : userVideos.length > 0 ? (
              // 로그인 유저 + 동영상 있음
              <AthenaVideoList />
            ) : (
              // 로그인 유저 + 동영상 없음: 안내 + 업로드 유도
              <EmptyState />
            )}

          </div>
  
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
      </section>
    );
  };

export default AthenaDashboard
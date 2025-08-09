import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Modal } from "@/components/ui";
import VideoUploader from "@/components/ui/fileUpload/VideoUpload";


const AthenaDashboard = ({ isGuest = false, userId = null }) => {
    const { user } = useAuth(); //유저정보불러오기
    const [userVideos, setUserVideos] = useState([]); // 유저 비디오
    const [openModal, setOpenModal] = useState<null | boolean>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    
    // props로 받은 값이 없으면 현재 유저 정보 사용
    const currentUserId = userId || user?.id;
    const isCurrentGuest = isGuest || !user;

    // 로그인 유저만 동영상 데이터 가져오기
    useEffect(()=>{
      if (user) {
        // DB 유저 동영상목록 불러오기
        // fetchUserVideos(user.id);
      }
    },[user])




    const handleSubmit = async () => {
        if (!selectedFile) {
            alert("파일을 먼저 선택해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

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
            {isCurrentGuest ? "게스트 Athena 라이브러리리" : `${user?.name || currentUserId}님의 Athena 라이브러리`}
          </h2>
          <div>
            {/* {!user ? (
            // 비로그인 유저: 항상 EmptyState
            <EmptyState />
              ) : userVideos.length > 0 ? (
              // 로그인 유저 + 동영상 있음: 목록 + AI 챗봇
              <VideoListAndChat videos={userVideos} />
            ) : (
              // 로그인 유저 + 동영상 없음: 안내 + 업로드 유도
              <EmptyState />
            )}
           */}
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
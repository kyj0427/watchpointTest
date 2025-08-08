import { useAuth } from "@/contexts/AuthContext";

// AthenaAnalysis.tsx
const AthenaAnalysis = ({ isGuest = false, userId = null }) => {
    const { user } = useAuth(); //유저정보불러오기
    
    // props로 받은 값이 없으면 현재 유저 정보 사용
    const currentUserId = userId || user?.id;
    const isCurrentGuest = isGuest || !user;

    return (
      <section className="section-title">
        <div className="container mx-auto px-4 py-8">
          <h2 className="heading-2 text-w-neutral-1 mb-3">
            {isCurrentGuest ? "게스트 Athena 분석" : `${user?.name || currentUserId}님의 Athena 분석`}
          </h2>
          
          {/* 공통 UI */}
          <div className="mt-8">
            {/* 동영상 업로드 */}
            {/* 분석 결과 */}
            {/* 채팅 기록 */}
          </div>
        </div>
      </section>
    );
  };

export default AthenaAnalysis
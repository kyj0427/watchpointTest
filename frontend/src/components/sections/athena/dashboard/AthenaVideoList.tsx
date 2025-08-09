"use client";

import { Menu } from "@headlessui/react";
import { athenaVideosData, type Video } from "@public/data/athenaVideos";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Pagination from "@/components/shared/Pagination";

const AthenaVideoList = () => {
  const { user } = useAuth();
  const router = useRouter();
  const videos = athenaVideosData.videos;
  
  // 페이징 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // 페이지당 12개씩 보여주기
  
  // 전체 페이지 수 계산
  const totalPages = Math.ceil(videos.length / itemsPerPage);
  
  // 현재 페이지에 해당하는 데이터만 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVideos = videos.slice(indexOfFirstItem, indexOfLastItem);
  
  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleVideoClick = (videoId: string) => {
    if (user) {
      router.push(`/coaching/athena/library/${videoId}`);
    } else {
      // 비로그인 유저는 로그인 페이지로 이동
      router.push('/login');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "분석 완료":
        return "text-primary";
      case "분석 중":
        return "text-yellow-500";
      case "분석 실패":
        return "text-red-500";
      default:
        return "text-w-neutral-4";
    }
  };

  return (
    <section className="section-pb pt-60p">
      <div className="container">
        <div className="grid xxl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-30p">
          {currentVideos?.map((video, idx) => (
            <div key={idx} className="library-card group" data-aos="fade-up">
              <div className="flex flex-col justify-between h-full relative z-[2]">
                <div className="flex-y justify-end flex-wrap gap-16p">
                  {/* <span className={`badge badge-compact badge-glass flex-y gap-1 text-w-neutral-1 ${getStatusColor(video.analysisStatus)}`}>
                    <i className="ti ti-star icon-24 text-primary"></i>
                    {video.analysis?.overallScore || "N/A"}
                  </span> */}
                  <Menu as="div" className="dropdown shrink-0">
                    <Menu.Button className="dropdown-toggle dropdown-toggle w-fit btn-c btn-c-md sm:size-10 size-9 btn-primary">
                      <i className="ti ti-dots-vertical icon-24"></i>
                    </Menu.Button>
                    <Menu.Items className="dropdown-content">
                      <Menu.Item as="button" className="dropdown-item">
                        상세보기
                      </Menu.Item>
                      <Menu.Item as="button" className="dropdown-item">
                        삭제
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
                <div>
                  <div
                    onClick={() => handleVideoClick(video.id)}
                    className="heading-4 text-w-neutral-1 line-clamp-1 mb-1 link-1 cursor-pointer hover:text-primary transition-colors"
                  >
                    {video.title}
                  </div>
                  <div className="flex-y gap-3 text-l-regular text-w-neutral-2">
                    <span>{video.hero}</span>
                    <span className="badge badge-circle badge-dot badge-light size-1"></span>
                    <span>{formatDate(video.upload_date || '')}</span>
                  </div>                 
                </div>
              </div>
              {/* 썸네일 렌더링 로직 */}
              {video.thumbnail.startsWith('data:') ? (
                // 사용자 업로드 썸네일 (base64)
                <img
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-1"
                  src={video.thumbnail}
                  alt={video.title}
                />
              ) : video.thumbnail.startsWith('/') ? (
                // 정적 이미지 경로
                <Image
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-1"
                  src={video.thumbnail}
                  alt={video.title}
                  width={260}
                  height={260}
                />
              ) : (
                // 기본값
                <div className="absolute inset-0 w-full h-full bg-b-neutral-4 flex items-center justify-center group-hover:scale-110 transition-1">
                  <span className="text-6xl">{video.thumbnail}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex-c mt-48p">
          <div className="text-center">
            <p className="text-l-regular text-w-neutral-4 mb-16p">
              총 {videos.length}개의 동영상이 있습니다
            </p>
            {!user && (
              <p className="text-s-regular text-w-neutral-4">
                * 로그인하면 동영상 상세보기와 AI 챗봇을 이용할 수 있습니다
              </p>
            )}
          </div>
        </div>
        
        {/* 페이징 컴포넌트 */}
        
          <div className="mt-48p">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        
      </div>
    </section>
  );
};

export default AthenaVideoList;


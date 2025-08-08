"use client";

import React, { FC, useState } from "react";
import VideoUploader from "../../ui/fileUpload/VideoUpload";
import { Modal } from "@/components/ui";
import Link from "next/link";

const AthenaMain: FC = () => {
    const [openModal, setOpenModal] = useState<null | boolean>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

        const handleSubmit = async () => {
        if (!selectedFile) {
            alert("파일을 먼저 선택해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("/api/ai-process-video", { // 요청값 ai 구동시 완성
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Upload failed");

            const data = await response.json();
            console.log("서버 응답:", data);
        } catch (error) {
            console.error("업로드 실패:", error);
        }
    }; // 요청 흐름 : AthenaMain -> Athena AI -> AthenaFeedback.tsx

    const handleLearnMore = (e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById('athena-description');
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // 스크롤 완료 후 줌인 효과를 위한 클래스 추가
            setTimeout(() => {
                element.classList.add('animate-zoom-in');
            }, 500);
        }
    };

    return (
        <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Main content */}
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-white">

        {/* Heading and description */}
        <div className="text-center">
            <h1 className="text-6xl font-semibold tracking-tight text-balance sm:text-6xl leading-normal sm:leading-[1.15] drop-shadow-md">
                당신만의 오버워치 코치, <br/>
                <span className="text-orange-400">Athena</span>가 함께합니다.
            </h1>
            <p className="mt-8 text-lg font-medium sm:text-xl/8 text-gray-300 drop-shadow-sm">
            수천 가지 데이터를 기반으로, Athena는 당신의 경기 스타일을 분석하고<br />
            맞춤형 피드백으로 랭크 상승을 돕습니다.
            </p>

            {/* Buttons */}
            <div className="mt-30 flex flex-col items-center justify-center gap-y-4">
                <button
                    onClick={() => setOpenModal(true)}
                    className="rounded-md bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 text-lg font-semibold 
                    text-white shadow-lg hover:from-orange-400 hover:to-amber-400 focus-visible:outline-2 
                    focus-visible:outline-offset-2 focus-visible:outline-orange-500 transition-all duration-300 transform hover:scale-105"
                >
                    시작하기
                </button>

                <button
                    onClick={handleLearnMore}
                    className="flex flex-col items-center gap-2 text-base font-semibold text-gray-200 hover:text-orange-400 transition-colors duration-300 mt-20 group"
                >
                    더 알아보기
                    <div className="w-12 h-12 mt-3 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center animate-bounce group-hover:bg-orange-500/30 transition-all duration-300">
                        <span className="text-orange-400 text-base animate-pulse">↓</span>
                    </div>
                </button>
            </div>
        </div>
        </div>

        {/* 모달 */}
        {/* Modal */}
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

export default AthenaMain;

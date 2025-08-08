"use client";

import React, { FC, useState } from "react";
import VideoUploader from "../../ui/fileUpload/VideoUpload";
import { Modal } from "@/components/ui";

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

    return (
    <div>
        <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Main content */}
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-white">

        {/* Heading and description */}
        <div className="text-center">
            <h1 className="text-6xl font-semibold tracking-tight text-balance sm:text-6xl leading-normal sm:leading-[1.15] drop-shadow-md">
                당신만의 오버워치 코치, <br/>
                Athena가 함께합니다.
            </h1>
            <p className="mt-8 text-lg font-medium sm:text-xl/8 text-gray-300 drop-shadow-sm">
            수천 가지 데이터를 기반으로, Athena는 당신의 경기 스타일을 분석하고<br />
            맞춤형 피드백으로 랭크 상승을 돕습니다.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
                onClick={() => setOpenModal(true)}
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
                시작하기
            </button>

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
                        <div className="sm:h-[528px] h-[400px] overflow-y-auto scrollbar-sm">
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

            <a
                href="#athena-details"
                className="text-sm font-semibold text-gray-200 hover:text-white transition"
            >
                더 알아보기 <span aria-hidden="true">→</span>
            </a>
            </div>
        </div>
        </div>
        </div>
    </div>
    );
};

export default AthenaMain;

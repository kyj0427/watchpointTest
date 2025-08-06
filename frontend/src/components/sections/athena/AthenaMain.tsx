"use client";

import React, { FC, useState } from "react";
import AthenaVideoUpload from "./AthenaVideoUpload";
import VideoUploader from "../fileUpload/VideoUpload";

const AthenaMain: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 모달 열기
    const openModal = () => setIsModalOpen(true);
    // 모달 닫기
    const closeModal = () => setIsModalOpen(false);

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
                onClick={openModal}
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
                시작하기
            </button>

            {/* 모달 */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
                            {/* 닫기 버튼 */}
                            <button
                                onClick={closeModal}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                                aria-label="Close modal"
                            >
                                ✕
                            </button>

                        {/* 비디오 업로드 컴포넌트 */}
                        {/* <AthenaVideoUpload /> */}
                        <VideoUploader/>
                        </div>
                    </div>
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

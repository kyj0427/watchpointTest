"use client";
import { FC } from "react";

interface WelcomeModalProps {
    onNext: () => void;
}

const WelcomeModal: FC<WelcomeModalProps> = ({ onNext }) => {
    return (
    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
        <div className="bg-b-neutral-3 rounded-12 w-full max-w-[488px] p-8 shadow-xl text-w-neutral-1 flex flex-col">
        {/* 타이틀 */}
        <h2 className="text-2xl font-bold mb-4 text-center">환영합니다!</h2>
        {/* 설명 텍스트 */}
        <p className="text-m-medium text-center mb-8 leading-relaxed">
        다음 몇 가지 질문에 대한 답변은 회원님에게 꼭 맞는 정보를 찾는 데 도움이 됩니다.
        </p>
        {/* 버튼 */}
        <button
            onClick={onNext}
            className="btn btn-md btn-primary rounded-12 w-full">
        계속하기
        </button>
        </div>
    </div>
    );
};

export default WelcomeModal;

"use client";

import { useEffect, useState } from "react";
import WelcomeModal from "@/components/sections/preference/WelcomeModal";
import ProgressBar from "@/components/sections/preference/ProgressBar";
import PreferenceStepOne from "@/components/sections/preference/PreferenceStepOne";
import PreferenceStepTwo from "@/components/sections/preference/PreferenceStepTwo";


// 문자열 or 문자열 형식의 배열을 저장
type Answers = { [key: string]: string | string[] };

//preferencetotal의 props타입 
type PreferenceTotalProps = {
  // 온보딩 기본값 유지
  initialStep?: 0 | 1 | 2;         
  showWelcome?: boolean;              // 기본 true
  showProgress?: boolean;             // 기본 true
  asModal?: boolean;                  // 기본 true 

  // 마이페이지용 수정 버전 
  initialAnswers?: Answers;
  initialTopics?: string[];

  // 저장/닫기 콜백(선택) — 없으면 기존처럼 console+alert
  onComplete?: (data: { answers: Answers; topics: string[] }) => void;
  onClose?: () => void;
};

const PreferenceTotal = ({
  initialStep = 0,
  showWelcome = true,
  showProgress = true,
  asModal = true,
  initialAnswers,
  initialTopics,
  onComplete,
  onClose,
}: PreferenceTotalProps = {}) => {
  const [step, setStep] = useState<0 | 1 | 2>(initialStep); // 0: Welcome, 1: Step1, 2: Step2
  const [answers, setAnswers] = useState<Answers>({});
  const [topics, setTopics] = useState<string[]>([]);

  // 수정 모드 프리필(선택)
  useEffect(() => {
    if (initialAnswers) setAnswers(initialAnswers);
  }, [initialAnswers]);
  useEffect(() => {
    if (initialTopics) setTopics(initialTopics);
  }, [initialTopics]);

  // 웰컴 스킵 옵션도 나중에 쉽게 쓸 수 있게 준비(지금은 기본 true라 변화 없음)
  useEffect(() => {
    if (!showWelcome && step === 0) setStep(1);
  }, [showWelcome, step]);

  const handleStepOneNext = (a: Answers) => {
    setAnswers(prev => ({ ...prev, ...a }));
    setStep(2);
  };

  const handleStepTwoNext = (t: string[]) => {
    const finalData = { answers, topics: t };

    //  실제 저장은 부모에서(onComplete) 수행. 없으면 기존 동작 유지.
    if (onComplete) {
      onComplete(finalData);
    } else {
      console.log("최종 데이터:", finalData);
    }

    onClose?.();
  };

  const Content = (
    <div className="bg-b-neutral-3 rounded-12 w-full max-w-[900px] p-6 text-w-neutral-1">
      {showProgress && step > 0 && step <= 2 && (
        <ProgressBar currentStep={step} totalSteps={2} />
      )}
      {showWelcome && step === 0 && <WelcomeModal onNext={() => setStep(1)} />}
      {step === 1 && <PreferenceStepOne onNext={handleStepOneNext} />}
      {step === 2 && <PreferenceStepTwo onNext={handleStepTwoNext} />}
    </div>
  );

  if (!asModal) return Content;

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
      {Content}
    </div>
  );
};

export default PreferenceTotal;
"use client";

import { useState } from "react";
import WelcomeModal from "@/components/sections/preference/WelcomeModal";
import ProgressBar from "@/components/sections/preference/ProgressBar";
import PreferenceStepOne from "@/components/sections/preference/PreferenceStepOne";
import PreferenceStepTwo from "@/components/sections/preference/PreferenceStepTwo";

const PreferenceTotal = () => {
  const [step, setStep] = useState(0); // 0: Welcome, 1: Step1, 2: Step2
  const [formData, setFormData] = useState({});

  const handleStepOneNext = (answers: { [key: string]: string | string[] }) => {
    setFormData(prev => ({ ...prev, ...answers }));
    setStep(2);
  };

  const handleStepTwoNext = (topics: string[]) => {
    const finalData = { ...formData, topics };
    //여기서 DB에 저장시킵니다.
    console.log("최종 데이터:", finalData); 
    alert("모든 스텝 완료!");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
      <div className="bg-b-neutral-3 rounded-12 w-full max-w-[900px] p-6 text-w-neutral-1">
        {step > 0 && step <= 2 && (
          <ProgressBar currentStep={step} totalSteps={2} />
        )}

        {step === 0 && <WelcomeModal onNext={() => setStep(1)} />}
        {step === 1 && <PreferenceStepOne onNext={handleStepOneNext} />}
        {step === 2 && <PreferenceStepTwo onNext={handleStepTwoNext} />}
      </div>
    </div>
  );
};

export default PreferenceTotal;

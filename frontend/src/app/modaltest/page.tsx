"use client";

import { useState } from "react";
import WelcomeModal from "@/components/sections/preference/WelcomeModal";
import PreferenceStepOne from "@/components/sections/preference/PreferenceStepOne";
import PreferenceStepTwo from "@/components/sections/preference/PreferenceStepTwo";

export default function ModalTestPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-6">모달 테스트 페이지</h1>

      {step === 1 && (
        <WelcomeModal
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <PreferenceStepOne
          onNext={(answers) => {
            console.log("Step 1 결과:", answers);
            setStep(3);
          }}
        />
      )}

      {step === 3 && (
        <PreferenceStepTwo
          onNext={(selectedTopics) => {
            console.log("Step 2 결과:", selectedTopics);
            alert("모든 설정 완료!");
          }}
        />
      )}
    </div>
  );
}

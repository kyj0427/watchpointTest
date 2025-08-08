"use client";

import { useState } from "react";
import Image from "next/image";
import { preferenceTopics } from "@public/data/preferenceTopics";

interface PreferenceStepTwoProps {
  onNext: (selected: string[]) => void;
}

const PreferenceStepTwo = ({ onNext }: PreferenceStepTwoProps) => {
  //유저가 선택한 성향의 id값을 저장 
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  //특정 선택창 눌렀을때 선택/해제 클릭가능
  const toggleSelect = (id: string) => {
    setSelectedTopics(prev =>
      
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  //선택 되어있는지 확인 
  const isSelected = (id: string) => selectedTopics.includes(id);

  return (
    <div className="w-full max-w-[700px] mx-auto bg-b-neutral-3 rounded-12 p-6 text-white space-y-10 overflow-y-auto max-h-[120vh]">
      <h2 className="text-2xl font-bold">선호하는 카테고리를 골라주세요</h2>
      <div></div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {preferenceTopics.map(topic => (
          <div  
            key={topic.id}
            onClick={() => toggleSelect(topic.id)}
            className={`relative rounded-xl overflow-hidden border-2 group cursor-pointer transition-all
              ${isSelected(topic.id) ? "border-blue-500" : "border-transparent"}`}
          >
            <Image
              src={topic.image}
              alt={topic.label}
              width={300}
              height={300}
              className="w-full h-[120px] object-cover"
            />
            <div className="text-center py-2 text-sm font-semibold">
              {topic.label}
            </div>
            {isSelected(topic.id) && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-primary/90 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 5.707 10.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => onNext(selectedTopics)}
        disabled={selectedTopics.length === 0}
        className={`w-full py-3 rounded-xl text-white font-bold
          ${selectedTopics.length > 0 ? "bg-primary text-white hover:bg-primary/90" : "bg-gray-300 cursor-not-allowed"}`}
      >
        계속
      </button>
    </div>
  );
};

export default PreferenceStepTwo;

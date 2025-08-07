"use client";

import { useState } from "react";
import { questions } from "@public/data/preferenceQuestions";


interface PreferenceStepOneProps {
  onNext: (answers: { [key: string]: string | string[] }) => void;
}

const PreferenceStepOne = ({ onNext }: PreferenceStepOneProps) => {
    //사용자가 선택한 답변 저장
    const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});

    //옵션 클릭시 상태 업데이트
    const handleSelect = (questionId: string, option: string, isMulti: boolean) => {
    setAnswers(prev => {
      if (isMulti) {
        // 다중 선택인 경우 배열로 관리 (있으면 제거, 없으면 추가)
        const prevArr = (prev[questionId] as string[]) || [];
        const newArr = prevArr.includes(option)
          ? prevArr.filter(item => item !== option)
          : [...prevArr, option];
        return { ...prev, [questionId]: newArr };
      } else {
        // 단일 선택은 문자열로 저장
        return { ...prev, [questionId]: option };
      }
    });
  };
    // 모든 질문에 응답했는지 여부 확인
  const isAnswered = questions.every(q =>
    answers[q.id] && (q.type === "single" || (answers[q.id] as string[]).length > 0)
  );

  return (
    <div className="w-full max-w-[700px] mx-auto bg-b-neutral-3 rounded-12 p-6 text-white space-y-10 overflow-y-auto max-h-[70vh]">
      {questions.map(q => (
        <div key={q.id} className="space-y-4">
          <h3 className="text-base font-semibold">{q.question}</h3>

          <div className="flex gap-6 flex-wrap">
            {q.options.map(option => {
              const selected = q.type === "multi"
                ? (answers[q.id] as string[] || []).includes(option)
                : answers[q.id] === option;

              return (
                <label
                  key={option}
                  className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type={q.type === "multi" ? "checkbox" : "radio"}
                    // image={} 체크박스 옆에 이미지 띄우는용 
                    name={q.id}
                    value={option}
                    checked={selected}
                    onChange={() => handleSelect(q.id, option, q.type === "multi")}
                    className="w-5 h-5 accent-primary"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}

      <button
        onClick={() => onNext(answers)}
        disabled={!isAnswered}
        className={`btn btn-md w-full rounded-12 mt-6 font-bold
          ${isAnswered ? "bg-primary text-white hover:bg-primary/90" : "bg-gray-500 text-gray-300 cursor-not-allowed"}`}
      >
        다음
      </button>
    </div>
  );
};

export default PreferenceStepOne;

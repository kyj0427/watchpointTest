"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IconBrandKakoTalk, IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import AnimateHeight from "react-animate-height";
import {useRef,ChangeEvent}from "react";
import Head from "next/head";

const CourseRegister = () => {
  // 이미지 업로드 관련 state
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  //선호 포지션 선택
const allPositions = ["탱커", "딜러", "힐러"];
const [selectedPositions, setSelectedPositions] = useState<string[]>([]);

//포지션 토글 핸들러
const handlePositionToggle = (position: string) => {
  setSelectedPositions((prev) =>
    prev.includes(position)
      ? prev.filter((p) => p !== position)
      : [...prev, position]
  );
};


 //이미지 선택 핸들러
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;


    //용량 제한
    if (file.size > 5 * 1024 * 1024) {
      alert("최대 5MB 이하 이미지만 업로드할 수 있습니다.");
      return;
    }
    //확장자 제한
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      alert("JPG, PNG, GIF 파일만 업로드할 수 있습니다.");
      return;
    }

    //미리보기 처리
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  //업로드 버튼 클릭시 input 클릭 유도
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  //이미지 제거 처리
  const handleRemove = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

//시간대 설정 상태변수
const [selectedDays, setSelectedDays] = useState<string[]>([]);
const [selectedDate, setSelectedDate] = useState("");
const [selectedHour, setSelectedHour] = useState("01");
const [selectedMinute, setSelectedMinute] = useState("15");
const [ampm, setAmpm] = useState<"AM" | "PM">("AM");

//요일 선택 토글
const toggleDay = (day: string) => {
  setSelectedDays((prev) =>
    prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
  );
};

//시간/분 옵션 배열
const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const minutes = ["00", "05", "10", "15", "20", "25", "30"];



  return (
    <>
    {/* 폰트 불러오기 */}
  <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          rel="stylesheet"
        />
      </Head>




    {/* 전체 폼 영역 */}
    <section className="pt-32 pb-36 font-[Poppins]">
      <div className="container text-lg">
        <h1 className="text-4xl font-bold mb-8">강의 등록하기</h1>

        {/*  이미지 업로드 섹션 */}
        <div className="space-y-2 mb-10">
          <label className="block text-sm font-medium">강좌 썸네일</label>

          <div
            className="upload-area h-[200px] rounded flex flex-col items-center justify-center cursor-pointer border border-dashed border-gray-400 relative overflow-hidden"
            onClick={handleClick}
          >
            {/* 미리보기 유무에 따라 조건 렌더링 */}
            {!imagePreview ? (
              <div id="uploadPlaceholder" className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <i className="ri-image-add-line text-gray-400 text-3xl"></i>
                </div>
                <p className="text-sm text-gray-500">이미지를 드래그하거나 클릭하여 업로드</p>
                <p className="text-xs text-gray-400 mt-1">
                  지원 형식: JPG, PNG, GIF (최대 5MB)
                </p>
              </div>
            ) : (
              <div className="w-full h-full relative">
                <img
                  src={imagePreview}
                  alt="미리보기"
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={handleRemove}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                >
                  <i className="ri-close-line text-gray-600 text-lg"></i>
                </button>
              </div>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/jpeg, image/png, image/gif"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/*  여기에 나중에 다른 강의 등록 input 폼 추가 가능 */}

              {/*  [추가] 닉네임 배틀태그 입력 폼 */}
       <div className="mb-8">
                {/* 라벨 구성 */}
                <label htmlFor="nickname" className="block text-sm mb-2">
                    <span className="font-bold">닉네임#배틀태그</span>{" "}
                    
                </label>

                {/* 입력 필드 */}
                <input
                    id="nickname"
                    name="nickname"
                    type="text"
                    placeholder="예: Gamer#1234"
                    className="w-[200px] border border-gray-300 rounded-lg px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

        {/*  여기에 나중에 다른 강의 등록 input 폼 추가 가능 */}

         <div className="mb-8">
                {/* 라벨 구성 */}
                <label htmlFor="nickname" className="block text-sm mb-2">
                    <span className="font-bold">강의횟수</span>{" "}
                    
                </label>

                {/* 입력 필드 */}
                <input
                    id="nickname"
                    name="nickname"
                    type="text"
                    placeholder="예: 3회"
                    className="w-[200px] border border-gray-300 rounded-lg px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

            {/*  선호하는 시간대 입력 섹션 */}
        <div className="mb-8">
          <label className="block text-sm font-bold mb-2">선호하는 시간대</label>
           <p className="text-xs text-red-500 mb-4">
          추후에 변경가능
          </p>
   {/* 날짜 선택 */}
  <div className="mb-4">
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
      className="border border-gray-300 bg-white text-black rounded px-3 py-2 w-[200px]"
    />
  </div>
  {/* 요일 선택 - 2열로 정렬 */}
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-6 mb-4 text-sm">
    {["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"].map((day) => (
      <label key={day} className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={selectedDays.includes(day)}
          onChange={() => toggleDay(day)}
          className="accent-blue-500"
        />
        {day}
      </label>
    ))}
  </div>

 

  {/* 시간 선택 */}
  <div className="flex items-center gap-2 text-sm">
    <select
      value={selectedHour}
      onChange={(e) => setSelectedHour(e.target.value)}
      className="border border-gray-300 bg-white text-black rounded px-2 py-1"
    >
      {hours.map((h) => (
        <option key={h} value={h}>{h}</option>
      ))}
    </select>
    :
    <select
      value={selectedMinute}
      onChange={(e) => setSelectedMinute(e.target.value)}
      className="border border-gray-300 bg-white text-black rounded px-2 py-1"
    >
      {minutes.map((m) => (
        <option key={m} value={m}>{m}</option>
      ))}
    </select>

    {/* AM/PM 버튼 */}
    <div className="flex gap-1">
      {["AM", "PM"].map((val) => (
        <button
          key={val}
          type="button"
          onClick={() => setAmpm(val as "AM" | "PM")}
          className={`px-3 py-1 rounded border ${
            ampm === val
              ? "bg-black text-white border-white"
              : "bg-white text-black border-gray-300"
          }`}
        >
          {val}
        </button>
      ))}
    </div>
  </div>
</div>

{/*  소개 입력 섹션 */}
<div className="mb-8">
  <label htmlFor="description" className="block text-sm font-bold mb-2">
    소개
  </label>
  <textarea
    id="description"
    name="description"
    rows={5}
    placeholder="강의에 대한 소개를 입력하세요"
    className="w-full max-w-xl border border-gray-300 rounded-lg px-4 py-3 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
  ></textarea>
</div>

   {/*  포지션 다중 선택 */}
<div className="mb-8">
  <label className="block text-sm font-bold mb-2">포지션 선택</label>
  <div className="flex flex-wrap gap-4">
    {allPositions.map((position) => (
      <label key={position} className="flex items-center space-x-2">
        <input
          type="checkbox"
          value={position}
          checked={selectedPositions.includes(position)}
          onChange={() => handlePositionToggle(position)}
          className="w-4 h-4"
        />
        <span>{position}</span>
      </label>
    ))}
  </div>

 
</div>   
  {/* 선택한 포지션 목록 삭제기능 */}

  {selectedPositions.length > 0 && (
  <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
    {selectedPositions.map((pos) => (
      <div
  key={pos}
  className="flex items-center bg-black border border-[#f29620] rounded-full px-3 py-1 text-[#f29620] font-semibold shadow-md"
>
  {pos}
  <button
    type="button"
    onClick={() =>
      setSelectedPositions((prev) => prev.filter((p) => p !== pos))
    }
    className="ml-2 hover:text-white hover:bg-[#f29620] rounded-full px-1 transition"
  >
    &times;
  </button>
</div>

    ))}
  </div>
)}

<form>
  

  {/* 등록 버튼 */}
  <div className="w-full flex justify-center mt-10">
    <button
      type="submit"
      className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-10 text-lg rounded-xl"
    >
      등록
    </button>
  </div>
</form>
            

      </div>
    </section>
    </>
  );
};

export default CourseRegister;



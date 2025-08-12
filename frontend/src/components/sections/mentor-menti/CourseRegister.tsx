"use client";

import { useState } from "react";
import { useRef }from "react";
import Head from "next/head";
import ImageUploader from "@/components/ui/fileUpload/ImageUpload";

const CourseRegister = () => {
    //선호 포지션 선택
  const allPositions = ["탱커", "딜러", "힐러"];
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  //포지션 토글 핸들러
  const handlePositionToggle = (position: string) => {
    setSelectedPositions((prev) =>
      prev.includes(position)
        ? prev.filter((p) => p !== position)
        : [...prev, position]
    );
  };

  const handleImageChange = (file: File | null) => {
    console.log("선택된 파일:", file);
    // 여기서 DB 저장용 상태 설정 또는 form 연결
  }

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault(); // 폼 submit 방지
      if (!tags.includes(tagInput.trim())) {
        setTags((prev) => [...prev, tagInput.trim()]);
      }
      setTagInput(""); // 입력창 비우기
    }
  };

  const handleDeleteTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
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

  // 가격 설정
  function formatPriceWithComma(value: string): string {
  // 숫자만 추출 (숫자가 아니면 제거)
  const numericValue = value.replace(/[^0-9]/g, "");
  if (!numericValue) return "0";

  // 숫자를 정수로 변환 후 다시 문자열로 만들어 천단위마다 쉼표 넣기
  return parseInt(numericValue, 10).toLocaleString();
  }


  const [price, setPrice] = useState("0");

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value.replace(/[^0-9]/g, "")); // 숫자만 저장
    };
  
  const handlePriceBlur = () => {
  setPrice((prev) => formatPriceWithComma(prev));
  };



  return (
    <div>
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

          <div className="w-1/3">
            <ImageUploader onFileChange={handleImageChange}/>
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
          {/* 가격 입력 */}
          <div className="mb-7">
            <h4 className="block text-sm font-bold mb-2">수강비</h4>
            <input
            type="text"
            value={price}
            onChange={handlePriceChange}
            onBlur={handlePriceBlur}
            placeholder="가격 입력"
            className="w-[200px] border border-gray-300 rounded-lg px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
    <div className="mb-8">
      {/* 입력창 */}
      <label className="block text-sm font-bold mb-2">태그 입력</label>
      <input
        type="text"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleAddTag}
        placeholder="태그 입력 후 Enter"
        className="border border-gray-300 rounded px-3 py-1 w-full text-black"
      />

      {/* 태그 목록 */}
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center bg-black border border-[#f29620] rounded-full px-3 py-1 text-[#f29620] font-semibold shadow-md"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleDeleteTag(tag)}
                className="ml-2 hover:text-white hover:bg-[#f29620] rounded-full px-1 transition"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>

      </div>
    </section>
    </div>
  );
};

export default CourseRegister;



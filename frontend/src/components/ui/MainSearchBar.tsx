"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

const MainSearchBar = () => {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("search") as string;

    if (searchQuery) {
      router.push(`/userrankList?search=${encodeURIComponent(searchQuery)}`);
    }
    // Reset the form fields
    e.currentTarget.reset();
  };

  return (
    <section className="section-pt">
      <div className="container relative">
        <div className="mx-80p">
          <div className="w-full">
            <div className="relative group">
              <h3 className="heading-3 text-w-neutral-1 text-split-left mb-3">
                유저 검색
              </h3>
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="relative w-full">
                  <input
                    autoComplete="off"
                    className="w-full px-16p sm:px-24p py-16p sm:py-20p pl-24p sm:pl-24p pr-100p sm:pr-120p bg-gradient-to-r from-b-neutral-4/90
                      to-b-neutral-3/90 backdrop-blur-md border border-b-neutral-2/30 rounded-full text-white placeholder:text-w-neutral-4 
                        focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-lg text-sm sm:text-base
                        hover:shadow-xl hover:shadow-primary/5 transform hover:scale-[1.01] focus:scale-[1.01]"
                    type="text"
                    name="search"
                    id="search"
                    placeholder="배틀태그#1234로 검색..."
                    required
                    title="배틀태그를 입력해주세요"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 
                    text-b-neutral-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-primary/25
                    w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center
                    transform hover:scale-110 active:scale-95"
                  >
                    <i className="ti ti-search icon-20 sm:icon-24"></i>
                  </button>
                </div>
                
                {/* 검색 힌트 */}
                <div className="mt-4 text-center">
                  <p className="text-xs sm:text-sm text-w-neutral-4 animate-pulse">
                    예시: PlayerName#1234, BattleTag#5678
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSearchBar;

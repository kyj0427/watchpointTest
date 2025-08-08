"use client";

import { FormEvent } from "react";

const MainSearchBar = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("search") as string;

    // Reset the form fields
    e.currentTarget.reset();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <form
          className="relative flex items-center"
          onSubmit={handleSubmit}
        >
          <div className="relative w-full">
            <input
              autoComplete="off"
              className="w-full px-16p sm:px-24p py-16p sm:py-20p pl-80p sm:pl-120p pr-100p sm:pr-120p bg-gradient-to-r from-b-neutral-4/90 to-b-neutral-3/90 backdrop-blur-md border border-b-neutral-2/30 rounded-full text-white placeholder:text-w-neutral-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-lg text-sm sm:text-base"
              type="text"
              name="search"
              id="search"
              placeholder="배틀태그#1234 또는 유저명 검색..."
              required
            />
            <div className="absolute left-20p sm:left-24p top-1/2 -translate-y-1/2">
              <i className="ti ti-search icon-20 sm:icon-24 text-w-neutral-4 group-focus-within:text-primary transition-colors"></i>
            </div>
            <button 
              type="submit"
              className="absolute right-8p top-1/2 -translate-y-1/2 btn-c btn-c-md bg-primary hover:bg-primary/80 text-b-neutral-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-primary/25"
            >
              <i className="ti ti-search icon-20"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default MainSearchBar;

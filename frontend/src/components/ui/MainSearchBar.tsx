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
              <h3 className="text-24 text-secondary font-bold gap-mb-24">
                Search here
              </h3>
              <form
                className="w-full"
                onSubmit={handleSubmit}
              >
                <div className="relative w-full">
                  <input
                    autoComplete="off"
                    className="w-full px-16p sm:px-24p py-16p sm:py-20p pl-24p sm:pl-24p pr-100p sm:pr-120p bg-gradient-to-r from-b-neutral-4/90
                      to-b-neutral-3/90 backdrop-blur-md border border-b-neutral-2/30 rounded-full text-white placeholder:text-w-neutral-4 
                        focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-lg text-sm sm:text-base"
                    type="text"
                    name="search"
                    id="search"
                    placeholder="배틀태그#1234 또는 유저명 검색..."
                    required
                  />                  
                  <button 
                    type="submit"
                    className="absolute right-8p sm:right-12p top-1/2 -translate-y-1/2 btn-c btn-c-sm sm:btn-c-md
                      bg-primary hover:bg-primary/80 text-b-neutral-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-primary/25"
                  >
                    <i className="ti ti-search icon-20 sm:icon-24"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default MainSearchBar;

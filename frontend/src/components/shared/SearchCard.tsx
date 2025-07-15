"use client";

import { useForm, SubmitHandler } from "react-hook-form";

type SearchInput = {
  search: string;
};

const SearchCard = () => {
  const { register, handleSubmit, reset } = useForm<SearchInput>();
  const onSubmit: SubmitHandler<SearchInput> = (data) => {
    reset();
  };

  return (
    <div>
      <h4 className="heading-4 text-w-neutral-1 mb-20p">Search Here</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-b-neutral-4 px-16p py-3 flex items-center justify-between sm:gap-3 gap-2 rounded-12"
      >
        <input
          {...register("search", { required: true })}
          autoComplete="off"
          className="bg-transparent text-w-neutral-1 w-full"
          type="text"
          id="search"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="flex-c icon-24 text-w-neutral-4"
          aria-label="Search"
        >
          <i className="ti ti-search"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchCard;

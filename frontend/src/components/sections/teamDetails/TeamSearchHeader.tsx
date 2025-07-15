"use client";

import { useForm } from "react-hook-form";

type FormValues = {
  search: string;
};

const TeamSearchHeader = ({ searchName }: { searchName: string }) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    reset();
  };

  return (
    <div className="bg-b-neutral-3 p-40p rounded-12 mb-24p">
      <span className="text-xl-medium text-w-neutral-1 mb-24p">
        {searchName}
      </span>
      <form className="flex-y gap-20p" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="w-full bg-transparent border border-shap px-20p py-3.5 text-sm text-w-neutral-1 placeholder:text-w-neutral-4 rounded-full"
          type="text"
          id="search"
          placeholder="Search..."
          {...register("search")}
        />

        <button type="submit" className="shrink-0 btn btn-md btn-primary">
          Search
        </button>
      </form>
    </div>
  );
};

export default TeamSearchHeader;

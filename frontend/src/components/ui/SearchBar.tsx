"use client";

import { FormEvent } from "react";

const SearchBar = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("search") as string;

    // Reset the form fields
    e.currentTarget.reset();
  };

  return (
    <div className="border border-neutral rounded-20 p-24px">
      <h4 className="text-24 text-secondary font-bold gap-mb-24">
        Search here
      </h4>
      <form
        className="flex-y justify-between box-input-1 rounded-xl"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search Blog..."
          required
        />
        <button type="submit">
          <i className="ph ph-magnifying-glass"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

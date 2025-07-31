"use client";

import { useForm } from "react-hook-form";

type FormData = {
  username: string;
  password: string;
  keepSignedIn: boolean;
};

const GroupForum = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-b-neutral-3 p-32p rounded-12"
    >
      <div className="mb-30p">
        <span className="text-m-medium text-w-neutral-2 mb-24p">Username:</span>
        <input
          {...register("username")}
          type="text"
          className="box-input-2"
          placeholder="Enter your username..."
        />
      </div>
      <div className="mb-30p">
        <span className="text-m-medium text-w-neutral-2 mb-24p">Password:</span>
        <input
          {...register("password")}
          type="password"
          className="box-input-2"
          placeholder="Enter your Password..."
        />
      </div>
      <div className="checkbox-container shrink-0 mb-40p">
        <input
          {...register("keepSignedIn")}
          type="checkbox"
          id="keep-signed"
          className="border-corners-checkbox"
          defaultChecked
        />
        <label htmlFor="keep-signed" className="border-corners-checkbox-label">
          <i className="ti icon-32"></i>
          <span className="text-sm text-w-neutral-1 ml-3">
            Keep me signed in
          </span>
        </label>
      </div>
      <button type="submit" className="btn btn-lg btn-primary rounded-12">
        LOG IN
      </button>
    </form>
  );
};

export default GroupForum;

"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { FormEvent } from "react";

type TReplayInput = {
  name: string;
  email: string;
  comment: string;
};

const LeaveReplayForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TReplayInput>({
    defaultValues: {
      name: "",
      email: "",
      comment: "",
    },
  });

  const handleReplay: SubmitHandler<TReplayInput> = (data) => {
    console.log(data);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(handleReplay)();
  };

  return (
    <div data-aos="fade-up" className="mt-60p">
      <h5 className="heading-5 text-w-neutral-1 mb-32p">Leave a Reply</h5>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-8 gap-30p mb-30p">
          <div className="sm:col-span-4 col-span-8">
            <input
              {...register("name", { required: "Name is required" })}
              className="box-input-1"
              type="text"
              id="name"
              placeholder="Enter Your Name"
            />
            {errors.name && (
              <span className="pt-2 px-16p text-error">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="sm:col-span-4 col-span-8">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className="box-input-1"
              type="email"
              id="email"
              placeholder="Enter Your Email"
            />
            {errors.email && (
              <span className="pt-2 px-16p text-error">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="col-span-8">
            <textarea
              {...register("comment", { required: "Comment is required" })}
              className="box-input-1 h-[200px]"
              id="comment"
              placeholder="Write a comment..."
            ></textarea>
            {errors.comment && (
              <span className="pt-2 px-16p text-error">
                {errors.comment.message}
              </span>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-xl btn-primary rounded-12">
          Submit Comments
        </button>
      </form>
    </div>
  );
};

export default LeaveReplayForm;

"use client";

import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  contactEmail: string;
  phone: string;
  subject: string;
  message: string;
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Data Submitted:", data);

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-8 gap-30p mb-48p">
        <div className="sm:col-span-4 col-span-8">
          <label
            htmlFor="name"
            className="label label-md font-normal text-white mb-3"
          >
            Your Name*
          </label>
          <input
            className="box-input-4"
            type="text"
            id="name"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="sm:col-span-4 col-span-8">
          <label
            htmlFor="contactEmail"
            className="label label-md font-normal text-white mb-3"
          >
            Email Address*
          </label>
          <input
            className="box-input-4"
            type="email"
            id="contactEmail"
            placeholder="Email"
            {...register("contactEmail", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
            })}
          />
          {errors.contactEmail && (
            <p className="text-red-500">{errors.contactEmail.message}</p>
          )}
        </div>

        <div className="sm:col-span-4 col-span-8">
          <label
            htmlFor="phone"
            className="label label-md font-normal text-white mb-3"
          >
            Phone Number*
          </label>
          <input
            className="box-input-4"
            type="number"
            id="phone"
            placeholder="--- --- ---"
            {...register("phone", { required: "Phone number is required" })}
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="sm:col-span-4 col-span-8">
          <label
            htmlFor="subject"
            className="label label-md font-normal text-white mb-3"
          >
            Subject*
          </label>
          <input
            className="box-input-4"
            type="text"
            id="subject"
            placeholder="Subject"
            {...register("subject", { required: "Subject is required" })}
          />
          {errors.subject && (
            <p className="text-red-500">{errors.subject.message}</p>
          )}
        </div>

        <div className="col-span-8">
          <label
            htmlFor="message"
            className="label label-md font-normal text-white mb-3"
          >
            Describe your message*
          </label>
          <textarea
            className="box-input-4 h-[156px]"
            id="message"
            placeholder="Message"
            {...register("message", { required: "Message is required" })}
          ></textarea>
          {errors.message && (
            <p className="text-red-500">{errors.message.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-sm btn-primary rounded-12 w-full"
      >
        Submit Now
      </button>
    </form>
  );
};

export default ContactForm;

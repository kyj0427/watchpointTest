"use client";

import { useForm } from "react-hook-form";
import { IconBrandFacebook, IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import AnimateHeight from "react-animate-height";

interface FormData {
  name: string;
  email: string;
  dateOfBrth: string;
  password: string;
  remember?: boolean;
}

const RegisterForm = () => {
  // 소셜 로그인 
  const [showMore, setShowMore] = useState<boolean>(false);
  // 마케팅 이메일 수신 여부
  const [remember, setRemember] = useState<boolean>(true);

  //react-hook-form 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  //제출시 동작
  const onSubmit = (data: FormData) => {
    // form submit event
  };

  return (
    <section className="section-py">
      {/* 전체 컨테이너 */}
      <div className="container">
        <div className="flex-c">
          
          <div className="max-w-[530px] w-full p-40p bg-b-neutral-3 rounded-12">
            <h2 className="heading-2 text-w-neutral-1 mb-16p text-center">
              Sign Up
            </h2>
            <p className="text-m-medium text-w-neutral-3 text-center">
              Already have an account?{" "}
              <Link href="/login" className="inline text-primary">
                Sign Up
              </Link>
            </p>
            <div className="grid grid-cols-1 gap-3 py-32p text-center">
              <button className="btn btn-md bg-[#434DE4] hover:bg-[#434DE4]/80 w-full">
                <i className="ti ti-brand-discord icon-24"></i>
                Log In With Discord
              </button>
              <button className="btn btn-md bg-[#6E31DF] hover:bg-[#6E31DF]/80 w-full">
                <i className="ti ti-brand-twitch icon-24"></i>
                Log In with Twitch
              </button>
              <button className="btn btn-md bg-[#1876F2] hover:bg-[#1876F2]/80 w-full">
                <IconBrandFacebook size={24} />
                Log In With Facebook
              </button>
              <div className="pb-20p">
                <button
                  onClick={() => setShowMore(!showMore)}
                  type="button"
                  className="inline-flex items-center justify-center gap-2 text-s-medium text-w-neutral-1"
                >
                  Show more
                  <IconChevronDown
                    className={showMore ? "rotate-180" : ""}
                    size={20}
                  />
                </button>
                <AnimateHeight duration={300} height={showMore ? "auto" : 0}>
                  <div className="grid grid-cols-1 gap-3 mt-16p">
                    <button className="btn btn-md bg-[#6E31DF] hover:bg-[#6E31DF]/80 w-full">
                      <i className="ti ti-brand-instagram icon-24"></i>
                      Log In with Instagram
                    </button>
                    <button className="btn btn-md bg-[#1876F2] hover:bg-[#1876F2]/80 w-full">
                      <i className="ti ti-brand-google icon-24"></i>
                      Log In With Google
                    </button>
                  </div>
                </AnimateHeight>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-full h-1px bg-shap"></div>
                <span className="text-m-medium text-w-neutral-1">Or</span>
                <div className="w-full h-1px bg-shap"></div>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-30p mb-40p">
                <div>
                  <label
                    htmlFor="username"
                    className="label label-xl text-w-neutral-1 font-borda mb-3"
                  >
                    User Name
                  </label>
                  <input
                    className="border-input-1"
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    id="Name"
                    placeholder="Name"
                  />
                  {errors.email?.message && (
                    <p className="text-red-500 text-sm">
                      {String(errors.email.message)}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="userEmail"
                    className="label label-xl text-w-neutral-1 font-borda mb-3"
                  >
                    Email
                  </label>
                  <input
                    className="border-input-1"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    id="userEmail"
                    placeholder="Email"
                  />
                  {errors.email?.message && (
                    <p className="text-red-500 text-sm">
                      {String(errors.email.message)}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="label label-xl text-w-neutral-1 font-borda mb-3"
                  >
                    Password
                  </label>
                  <input
                    className="border-input-1"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    id="password"
                    placeholder="Password"
                  />
                  {errors.password?.message && (
                    <p className="text-red-500 text-sm">
                      {String(errors.password.message)}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="dateOfBarth"
                    className="label label-xl text-w-neutral-1 font-borda mb-3"
                  >
                    Date of birth
                  </label>
                  <input
                    className="border-input-1 flatpickr"
                    type="date"
                    {...register("dateOfBrth", {
                      required: "Password is required",
                    })}
                    id="dateofbarth"
                    placeholder="Month - Date - Year"
                  />
                  {errors.password?.message && (
                    <p className="text-red-500 text-sm">
                      {String(errors.password.message)}
                    </p>
                  )}
                </div>
                <div>
                  <label className="label label-md text-w-neutral-1 inline-flex items-center cursor-pointer gap-3">
                    <input
                      type="checkbox"
                      {...register("remember")}
                      onChange={(e) => setRemember(e.target.checked)}
                      checked={remember}
                      className="sr-only peer togglePricing"
                    />
                    <span className="relative w-11 h-6 bg-w-neutral-1 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:bg-w-neutral-1 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-b-neutral-3 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shrink-0"></span>
                    Yes, email me offers and information about competitions and
                    events on GameCO
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-md btn-primary rounded-12 w-full mb-16p"
              >
                Sing Up For Free
              </button>
              <Link
                href="/terms-conditions"
                className="text-m-medium text-primary text-center"
              >
                Privacy Policy
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;

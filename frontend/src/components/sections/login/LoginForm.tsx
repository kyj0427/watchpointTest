"use client";

import { useForm } from "react-hook-form";
import { IconBrandKakoTalk, IconChevronDown, IconBrandDiscord, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import AnimateHeight from "react-animate-height";

interface FormData {
  email: string;
  password: string;
  remember?: boolean;
}

// SNS 로그인 버튼에 사용할 아이콘 이미지(src)와 텍스트(alt) 
const snsButtons = [
  { src: "/images/icons copy/Google Icon_circle.png", alt: "Google" },
  { src: "/images/icons copy/Discord Icon_circle.png", alt: "Discord" },
  { src: "/images/icons copy/KakaoTalk Icon_circle.png", alt: "Kakao" },
  { src: "/images/icons copy/Battlenet Icon_circle.png", alt: "Battle.net" },
];

const LoginForm = () => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <section className="section-py">
      <div className="container">
        <div className="flex-c">
          <div className="max-w-[530px] w-full p-40p bg-b-neutral-3 rounded-12">
            <h2 className="heading-2 text-w-neutral-1 mb-16p text-center">
              로그인
            </h2>
            <p className="text-m-medium text-w-neutral-3 text-center">
              아직 Watchpoint 회원이 아니신가요?{" "}
              <Link href="/sign-up" className="inline text-primary">
                회원가입
              </Link>
            </p>
            <div className="grid grid-cols-1 gap-3 py-32p text-center">
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-30p mb-40p">
                <div>
                  <label
                    htmlFor="userEmail"
                    className="label label-xl text-w-neutral-1 font-borda mb-3"
                  >
                    이메일 주소
                  </label>
                  {/* 이메일 양식 관련 코드*/}
                  <input
                    className="border-input-1"
                    type="email"
                    {...register("email", { 
                      required: "유효한 이메일 주소를 입력해주세요." ,
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "이메일 형식이 올바르지 않습니다.",
                      },
                    })}
                    
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
                    비밀번호
                  </label>
                  <input
                    className="border-input-1"
                    type="password"
                    {...register("password", {
                      required: "비밀번호를 입력해주세요.",
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
                  <label className="label label-md text-w-neutral-1 inline-flex items-center cursor-pointer gap-3">
                    <input
                      type="checkbox"
                      {...register("remember")}
                      onChange={(e) => setRemember(e.target.checked)}
                      checked={remember}
                      className="sr-only peer togglePricing"
                    />
                    <span className="relative w-11 h-6 bg-w-neutral-1 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:bg-w-neutral-1 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-b-neutral-3 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shrink-0"></span>
                    로그인 상태 유지
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-md btn-primary rounded-12 w-full mb-16p"
              >
                로그인
              </button>
              <Link href="#" className="text-m-medium text-primary text-center">
                비밀번호 찾기
              </Link>
              <div className="grid grid-cols-1 gap-3 py-20p text-center"/>
              <div className="flex items-center gap-3">
                <div className="w-full h-1px bg-shap"></div>
                <span className="text-m-medium text-w-neutral-1">OR</span>
                <div className="w-full h-1px bg-shap"></div>
              </div>
                  {/*SNS 로그인 버튼 목록 */}
              <div className="flex justify-center gap-4 mt-6">
                {snsButtons.map(({ src, alt }) => (
                  <button
                    key={alt}
                    className=" p-3 rounded-full shadow-md hover:scale-110 transition"
                    title={`Log in with ${alt}`}
                  >
                    <img src={src} alt={alt} className="w-10 h-10" />
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;

"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";

interface FormData {
  name: string;
  email: string;
  password: string;
  remember?: boolean;
}


const RESERVED = ["admin", "root", "gm", "overwatch", "test"]; //임시 테스트용

const RegisterForm = () => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(true);

  // 사용 가능여부
  const [nameAvailable, setNameAvailable] = useState<null | boolean >(null);
  // 중복체크
  const [checking, setChecking] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      remember: true  
    },
  });

  const nameValue = watch("name");

  const onSubmit = (data: FormData) => {
    // form submit event
  };

    useEffect(() => {
    setNameAvailable(null);
  }, [nameValue]);

  // 닉네임 중복 확인 (버튼 클릭 시)
  // const checkDuplicateName = async () => {
  //   const name = nameValue?.trim();
  //   if (!name) return;

  //   setChecking(true);
  //   try {
  //     const res = await fetch(`/api/check-nickname?name=${encodeURIComponent(name)}`);
  //     if (!res.ok) throw new Error(`HTTP ${res.status}`);
  //     const data = await res.json();
  //     setNameAvailable(!data.exists);
  //   } catch (e) {
  //     console.error("중복 확인 오류:", e);
  //     setNameAvailable(null);
  //   } finally {
  //     setChecking(false);
  //   }
  // };

  // 임시테스트용 데이터
  const checkDuplicateName = () => {
  const name = nameValue?.trim().toLowerCase();
  if (!name) {
    setNameAvailable(null);
    return;
  }

  const exists = RESERVED.includes(name) || name.length < 2;
  setNameAvailable(!exists);
};

  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="section-py">
      <div className="container">
        <div className="flex-c">
          <div className="max-w-[530px] w-full p-40p bg-b-neutral-3 rounded-12">
            <h2 className="heading-2 text-w-neutral-1 mb-16p text-center">
              회원가입
            </h2>
            <p className="text-m-medium text-w-neutral-3 text-center">
              이미 계정이 있으신가요?{" "}
              <Link href="/login" className="inline text-primary">
              로그인
              </Link>
            </p>
            <div className="grid grid-cols-1 gap-3 py-32p text-center"/>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-30p mb-40p">
                <div>
                  <label
                    htmlFor="username"
                    className="label label-xl text-w-neutral-1 font-borda mb-3"
                  >
                    닉네임
                  </label>
                <div className="flex gap-2 items-center">
                  <input
                    className="border-input-1"
                    type="text"
                    {...register("name", { required: "닉네임을 입력해주세요" })}
                    id="username"
                    placeholder="nickname"
                  />
                  <button
                    type="button"
                    onClick={checkDuplicateName}
                    disabled={checking || !nameValue?.trim()}
                    className="btn btn-sm btn-outline whitespace-nowrap"
                  >
                    {checking ? "확인 중…" : "중복 확인"}
                  </button>
                </div>
                  {/* 중복 확인 메시지 */}
                  {nameAvailable === true && (
                    <p className="text-green-500 text-sm mt-1"> 사용 가능한 닉네임입니다.</p>
                  )}
                  {nameAvailable === false && (
                    <p className="text-red-500 text-sm mt-1"> 이미 사용 중인 닉네임입니다.</p>
                  )}
                  {/* 유효성 검사 메세지 */}
                  {errors.name?.message && (
                    <p className="text-red-500 text-sm">
                      {String(errors.name.message)}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="userEmail"
                    className="label label-xl text-w-neutral-1 font-borda mb-3"
                  >
                    이메일 주소
                  </label>
                  <input
                    className="border-input-1"
                    type="email"
                    {...register("email", { required: "유효한 이메일 주소를 입력해주세요." })}
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
                  {/* 비밀번호 양식 관련 코드 
                    비밀번호 숨김처리는 전체 양식을 div로 묶어야 함*/}
                <div className="relative">               
                  <input
                  // 아이콘 안 겹치게 padding
                    className="border-input-1 w-full pr-10" 
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "비밀번호를 입력해주세요.",
                      minLength: {
                        value: 8,
                        message: "비밀번호는 최소 8자 이상이어야 합니다.",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/,
                      message: "영문과 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.",
                    },
                    })}
                    id="password"
                    placeholder="Password"
                  />
                    {/* 비밀번호 표시 아이콘 */}
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
                    </button>
                    {/* 눈아이콘 링크 (다시 봐야함) */}
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css"
                        />

                  {errors.password?.message && (
                    <p className="text-red-500 text-sm">
                      {String(errors.password.message)}
                    </p>
                  )}
                </div> 
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
                    개인정보 수집 및 이용에 동의합니다.
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-md btn-primary rounded-12 w-full mb-16p"
              >
                계정 생성
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

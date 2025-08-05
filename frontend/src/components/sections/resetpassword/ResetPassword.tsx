"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IconBrandKakoTalk, IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import AnimateHeight from "react-animate-height";

//입력 받을 Form 필드 타입
interface FormData {
  email: string;
  password: string;
  
}



const ResetPassword = () => {
    //비밀번호 요구사항
  const [showMore, setShowMore] = useState<boolean>(false);
    //비밀번호 입력 필드
  const [showPassword, setShowPassword] = useState(false);
    //비밀번호 확인 입력 필드
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    //비밀번호 조건 여부
  const [pwLengthValid, setPwLengthValid] = useState(false);
  const [pwFormatValid, setPwFormatValid] = useState(false);
  const [pwMatchValid, setPwMatchValid] = useState(false);

   //
 






//react-hook-form 설정
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  //제출 이벤트 핸들러
  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

//비밀번호 유효성 조건 검사
useEffect(() => {
  const password = watch("password") || "";
  const confirmPassword = watch("email") || "";

  setPwLengthValid(password.length >= 8);
  setPwFormatValid(/(?=.*[A-Za-z])(?=.*[\d!@#$%^&*])/.test(password));
  setPwMatchValid(password !== "" && password === confirmPassword);
}, [watch("password"), watch("email")]);




//렌더링 영역
  return (
    <section className="pt-32 pb-36  ">
      <div className="container mt-12">
        <div className="flex-c">
          <div className="max-w-[530px] w-full p-40p bg-b-neutral-3 rounded-12">
            <h2 className="heading-2 text-w-neutral-1 mb-16p text-center">
              비밀번호 재설정
            </h2>
            <p className="text-m-medium text-w-neutral-3 text-center">
              새로운 비밀번호를 입력해주세요 
              
            </p>
            <div className="grid grid-cols-1 gap-3 py-32p text-center">
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-30p mb-10p">
                <div>
                  <label
                    htmlFor="userEmail"
                    className="label label-xl text-w-neutral-1 font-borda mb-3"
                  >
                    새 비밀번호
                  </label>
                    {/* 비밀번호 양식 관련 코드  */}
                    <div className ="relative">
                  <input
                    className="border-input-1 w-full"
                     type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "비밀번호를 입력해주세요.",
                      minLength: {
                        value: 8,
                        message: "비밀번호는 최소 8자 이상이어야 합니다.",
                    },
                    pattern: {
                      value: /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d!@#$%^&]{8,}$/,
                      message: "영문과 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.",
                    },
                    })}
                    id="password"
                    placeholder="새 비밀번호를 입력하세요"
                  />

                        {/*  비밀번호 보기 버튼 */}
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                            <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
                            </button>

                        </div>

                     {/*  안내 문구: 항상 보이게 */}
                    <p className="text-xs text-gray-400 mt-2">
                        8~20자의 영문, 숫자, 특수문자 조합
                    </p>
                        <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css"
                        />
                    {/* 유휴성  에러 메시지 */}
                  {errors.password?.message && (
                    <p className="text-red-500 text-sm">
                      {String(errors.password.message)}
                    </p>
                  )}
                </div>



                  {/* 비밀번호 확인 입력 필드 */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="label label-xl text-w-neutral-1 font-borda mb-3"
                  >
                    비밀번호 확인
                  </label>

                  <div className ="relative">
                  <input
                    className="border-input-1 w-full"
                     type={showConfirmPassword ? "text" : "password"}
                    {...register("email", { required: "유효한 이메일 주소로 입력해 주세요." })}
                    id="userEmail"
                    placeholder="비밀번호를 다시 입력하세요"
                  />
                    
                     {/* 비밀번호 보기 버튼 */}
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(prev => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                            <i className={showConfirmPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
                            </button>


                    </div>

                  {errors.email?.message && (
                    <p className="text-red-500 text-sm">
                      {String(errors.email.message)}
                    </p>
                  )}

                        
                        {/* 조건 체크 UI */}
                        <ul className="flex flex-col space-y-1 mt-5 mb-5 text-sm">
                        <li className={`flex space-x-1.5 ${pwLengthValid ? "text-teal-500" : "text-gray-300"}`}>
                            <span className="flex-none">✔</span>
                            <span>8글자 이상</span>
                        </li>
                        <li className={`flex space-x-1.5 ${pwFormatValid ? "text-teal-500" : "text-gray-300"}`}>
                            <span className="flex-none">✔</span>
                            <span>영문, 숫자, 특수문자 중 2가지 이상 포함</span>
                        </li>
                        <li className={`flex space-x-1.5 ${pwMatchValid ? "text-teal-500" : "text-gray-300"}`}>
                            <span className="flex-none">✔</span>
                            <span>비밀번호 일치</span>
                        </li>
                        </ul>






                </div>

                  

              </div>


              {/* 제출버튼 */}
              <button
                type="submit"
                className="btn btn-md btn-primary rounded-12 w-full mb-16p"
              >
                비밀번호 재설정 
              </button>


              {/* 로그인 페이지로 돌아가기 링크 */}
              <Link href="/login" className="text-m-medium text-primary text-center">
               로그인 페이지로 돌아가기
              </Link>
              <div className="grid grid-cols-1 gap-3 py-20p text-center"/>
              <div className="flex items-center gap-3">
                <div className="w-full h-1px bg-shap"></div>
                
                <div className="w-full h-1px bg-shap"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;

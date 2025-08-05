"use client";

import { useForm } from "react-hook-form";
import { IconBrandKakoTalk, IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import AnimateHeight from "react-animate-height";
//페이지 이동
import { useRouter } from "next/navigation"; 

//코드 입력단게까지 처리 할수있도록 코드 필드 추가
interface FormData {
    email: string;
    code?:string;
    remember?: boolean;
}

const Findpassword = () => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(true);
  //email -> 6자리입력 -> reset
  const [step, setStep] = useState<"email" | "code">("email");

  
  const [codeInput, setCodeInput] = useState<string[]>(["", "", "", "", "", ""]);

  //페이지 이동용 훅
  const router =useRouter(); 

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
   if (step === "email") {
    setStep("code");
      //  이메일 제출 후 → 코드 입력단계로 전환 
      // (여기에 이메일 전송 API 호출 )
      setStep("code");
    } else if (step === "code") {
    const fullCode = codeInput.join("");
    //  인증 성공 → 비밀번호 재설정 페이지로 이동
    // (여기에 인증코드 검증 로직 삽입)
      router.push("/reset-password");
    }
     

};



  return (
    <section className="pt-32 pb-36  ">
      <div className="container mt-12">
        <div className="flex-c">
          <div className="max-w-[530px] w-full p-40p bg-b-neutral-3 rounded-12">

            
            <h2 className="heading-2 text-w-neutral-1 mb-16p text-center">
              비밀번호 찾기
            </h2>
            <p className="text-m-medium text-w-neutral-3 text-center">
              {step === "email"
                    ? "가입하신 이메일 주소를 입력하시면, 인증번호를 보내드립니다"
                    : "이메일로 전송된 인증번호를 입력해 주세요"}
            </p>
            <div className="grid grid-cols-1 gap-3 py-32p text-center">
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-30p mb-10p">

                 {/*  이메일 입력 단계 */}
                {step === "email" && (
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
                    {...register("email", { required: "유효한 이메일 주소로 입력해 주세요." })}
                    id="userEmail"
                    placeholder="Email"
                  />
                  {errors.email?.message && (
                    <p className="text-red-500 text-sm">
                      {String(errors.email.message)}
                    </p>
                  )}
                </div>
                )}
              
                
                    {/* 인증 코드 입력 단계 */}
                  
                     {step === "code" && (
                  <div className="mb-24p">
                    <label
                      htmlFor="code"
                      className="label label-xl text-w-neutral-1 font-borda mb-3"
                    >
                      인증 코드
                    </label>
                        <div className="flex justify-between gap-2">
                        {codeInput.map((val, idx) => (

        
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          onChange={(e) => {
            const newCode = [...codeInput];
            newCode[idx] = e.target.value;
            setCodeInput(newCode);

            if (e.target.value && idx < 5) {
              const next = document.getElementById(`code-${idx + 1}`);
              next?.focus();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !codeInput[idx] && idx > 0) {
              const prev = document.getElementById(`code-${idx - 1}`);
              prev?.focus();
            }
          }}
          id={`code-${idx}`}
          className="w-10 h-12 text-center border border-gray-400 rounded-md 
           text-2xl font-mono text-black bg-white 
           focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      ))}
    </div>
    {/* 에러 메시지 (선택) */}
    {errors.code?.message && (
      <p className="text-red-500 text-sm mt-2">
        {String(errors.code.message)}
      </p>
    )}
                </div>
              )}

              




                <div>
                  <label className="label label-md text-w-neutral-1 inline-flex items-center cursor-pointer gap-3">
                    <input
                      type="checkbox"
                      {...register("remember")}
                      onChange={(e) => setRemember(e.target.checked)}
                      checked={remember}
                      className="sr-only peer togglePricing"
                    />
                   
                  </label>
                </div>
              </div>



              {/* 단계에 따라 버튼 텍스트 변경 */}
              <button
                type="submit"
                className="btn btn-md btn-primary rounded-12 w-full mb-16p"
              >
                {step === "email" ? "인증번호 받기" : "비밀번호 재설정"}
              </button>

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

export default Findpassword;

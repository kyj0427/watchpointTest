"use client";

import { useForm } from "react-hook-form";
import { IconBrandFacebook, IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";

interface FormData {
  name: string;
  email: string;
  password: string;
  remember?: boolean;
}

const RegisterForm = () => {
  //더미데이터 (나중에 삭제 해야합니다)
  const [dummyCode, setDummyCode] = useState("");

  // 소셜 로그인 
  const [showMore, setShowMore] = useState<boolean>(false);
  // 마케팅 동의 여부
  const [remember, setRemember] = useState<boolean>(false);
  // 비밀번호 숨김, 표시 처리 
  const [showPassword, setShowPassword] = useState(false);
  // 모달 처리 
  const [showModal, setShowModal] = useState(false);
  // 약관 내용 스크롤 확인
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  // 동의 버튼 클릭 여부 확인
  const [agreed, setAgreed] = useState(false);
  // 사용자가 요구조건에 충족 안했을시에 에러 메시지 표시
  const [submitAttempted, setSubmitAttempted] = useState(false);
  // 체크 박스 클릭 가능 여부
  const [clickAgree, setClickAgree] = useState(false);
  // 이메일 인증코드
  const [emailCode, setEmailCode] = useState("");
  // 코드 전송 여부 확인
  const [emailSent, setEmailSent] = useState(false);
  // 인증 성공 여부 확인
  const [isVerified, setIsVerified] = useState(false);
  // 코드 재전송 여부 확인 (추가필요)
  const [isResending, setIsResending] = useState(false);
  // 코드 유효 타이머
  const [codeTimer, setCodeTimer] = useState(0);
  // 타이머 인증 만료
  const [isExpired, setIsExpired] = useState(false);

  // 타이머 시간 감소 
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    // 코드가 전송되고, 타이머가 0보다 클 때만 동작
    if (emailSent && codeTimer > 0) {
      timerId = setInterval(() => {
        setCodeTimer((prev) => prev - 1);
      }, 1000); // 1초마다 감소
    }

    // 타이머 종료 (코드 만료 시)
    return () => {
      clearInterval(timerId);
    };
    // emailSent와 codeTimer 의 상태가 바뀔 때마다 useEffect 실행됨
    }, [emailSent, codeTimer]); 

    useEffect(() => {
        console.log("codeTimer:", codeTimer, "emailSent:", emailSent, "isVerified:", isVerified);
      if (codeTimer === 0 && emailSent && !isVerified) {
        alert("인증 시간이 만료되었습니다. 다시 시도해주세요.");
        setEmailCode("");
        setEmailSent(false);
        setIsExpired(true);
      }
    }, [codeTimer]);

  // 코드 재전송 핸들러
  const handleResendCode = async () => {
    if (isResending) return; // 중복 클릭 방지
    setIsResending(true);
    // 임시데이터 작성
      try {
    setEmailSent(true);
    setCodeTimer(2); // 3분 재설정
    setIsExpired(false);
  } catch (err) {
    alert("코드 전송 중 오류 발생");
  } finally {
    setIsResending(false);
  }
    }

  //react-hook-form 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  //제출시 동작
  const onSubmit = (data: FormData) => {
    if (!remember){
      setSubmitAttempted(true);
      alert("약관에 동의하셔야 회원가입이 가능합니다")
    }  
  };

  return (
    <section className="section-py">
      {/* 전체 컨테이너 */}
      <div className="container">
        <div className="flex-c">
          {/*  카드 형태의 SignUp 박스 */}
          <div className="max-w-[530px] w-full p-40p bg-b-neutral-3 rounded-12">
            {/*  제목 */}
            <h2 className="heading-2 text-w-neutral-1 mb-16p text-center">
              회원가입
            </h2>
            {/* 로그인 페이지로 이동 링크 */}
            <p className="text-m-medium text-w-neutral-3 text-center">
              이미 계정이 있으신가요?{" "}
              <Link href="/login" className="inline text-primary">
                로그인
              </Link>
            </p>
            <div className="grid grid-cols-1 gap-30p mb-40p"></div>
            {/* 기본 입력 폼 */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-30p mb-40p">
                {/* 사용자 이름 입력 폼 */}
                <div>
                  <label
                    htmlFor="name"
                    className="label label-xl text-w-neutral-1 font-borda mb-3"
                  >
                    닉네임
                  </label>
                  <input
                    className="border-input-1"
                    type="text"
                    {...register("name", { required: "닉네임을 입력해주세요" })}
                    id="name"
                    placeholder="Name"
                  />
                  {errors.name?.message && (
                    <p className="text-red-500 text-sm">
                      {String(errors.name.message)}
                    </p>
                  )}
                </div>

                {/* 이메일 입력 */}
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
                    {...register("email", { required: "유효한 이메일 주소를 입력해주세요" })}
                    id="userEmail"
                    placeholder="Email"
                  />
                  {errors.email?.message && (
                    <p className="text-red-500 text-sm">
                      {String(errors.email.message)}
                    </p>
                  )}
                </div>
                {/* 이메일 인증 */}
                <div>
                  <label
                    htmlFor="emailCode"
                    className="label label-xl text-w-neutral-1 font-borda mb-3"
                  >
                    인증 코드
                  </label>
                  <div className="relative w-full">
                    <input
                      id="emailCode"
                      type="text"
                      className="border-input-1 w-full pr-[110px] h-12"
                      placeholder="인증 코드 입력"
                      value={emailCode}
                      onChange={(e) => setEmailCode(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={handleResendCode}
                      className="absolute top-1/2 right-2 -translate-y-1/2 text-sm text-blue-500 hover:text-blue-700 hover:font-semibold transition cursor-pointer disabled:text-gray-400"
                      disabled={isResending}
                    >
                      코드 재전송하기
                    </button>

                  </div>
                  {emailSent && !isExpired && codeTimer > 0 && (
                    <p className="text-xs text-white-500 mt-1">
                      남은 시간: {Math.floor(codeTimer / 60)}분 {codeTimer % 60}초
                    </p>
                  )}

                  {isExpired && (
                    <p className="text-xs text-red-500 mt-1">인증 시간이 만료되었습니다.</p>
                  )}
                </div>
                {/* 비밀번호 입력 */}
                <div>
                  <label
                    htmlFor="password"
                    className="label label-xl text-w-neutral-1 font-borda mb-3"
                  >
                    비밀번호
                  </label>
                  {/* 비밀번호 양식 관련 코드 */}
                <div className="relative">
                  <input
                    className="border-input-1"
                    // type값 showPassword로 설정
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
                      {/* 숨기기 : 표시 아이콘 */}
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
                {/* 마케팅 수신 동의 */}
                <div>
                  <label className="label label-md text-w-neutral-1 inline-flex items-center cursor-pointer gap-3">
                    <input
                      type="checkbox"
                      {...register("remember")}
                      onChange={(e) => setRemember(e.target.checked)}
                      disabled={!clickAgree}
                      checked={remember}
                      className="sr-only peer togglePricing"
                    />
                    <span className="relative w-11 h-6 bg-w-neutral-1 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:bg-w-neutral-1 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-b-neutral-3 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shrink-0"></span>
                    개인정보 수집 및 이용에 동의합니다.
                  </label>
                </div>
              </div>

              {/* 회원가입 버튼 */}
              <button
                type="submit"
                className="btn btn-md btn-primary rounded-12 w-full mb-16p"
              >
                계정생성
              </button>

              {/* 개인정보처리 방침*/}
              <button
                type="button"
                onClick={() => setShowModal(true)} // 모달 열기 상태
                className="text-m-medium text-primary text-center underline bg-transparent border-none p-0"
              >
                이용약관
              </button>
            </form>
            {/* 모달창 정보 */}
            {showModal && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-50 flex items-center justify-center">
                <div className="w-full max-w-[480px] max-h-[60vh] p-4 shadow-lg relative flex flex-col
                                rounded-12 bg-b-neutral-3 text-w-neutral-1 border border-b-neutral-5">                  <button
                    className="absolute top-3 right-3 text-w-neutral-4 hover:text-w-neutral-1"
                    onClick={() => {
                    if (scrolledToBottom) setClickAgree(true); // 약관 끝까지 읽었으면 동의 가능 상태로 변경
                    setShowModal(false);
                    }}
                  >
                    ✕
                  </button>
                  <h1 className="text-lg font-bold mb-4">WATCHPOINT 최종 약관</h1>
                  {/* 모달 내부 내용 */}
                  <div
                    className="overflow-y-auto pr-2 space-y-4 text-sm text-gray-800 leading-relaxed max-h-[60vh]"
                    onScroll={(e) => {
                      const el = e.currentTarget;
                      const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
                      if (isBottom) setScrolledToBottom(true);
                    }}>
                    <h3 className="text-lg font-bold txt-gra-7 text-w-neutral-1">1. 개인정보 처리 방침</h3>
                    <ul className="list-none text-base text-w-neutral-3 space-y-2">
                      <li className="pl-6">본 커뮤니티 플랫폼 “WatchPoint” (이하 “웹사이트” 또는 “커뮤니티”)를 이용하거나 접속함으로써, 귀하는 본 이용약관에 동의하는 것으로 간주됩니다. 
                      </li>
                      <li className="pl-6">
                      본 이용약관에 동의하지 않는 경우, 본 웹사이트의 이용을 중단하여 주시기 바랍니다.
                      </li>
                      <li className="pl-6">
                      본 커뮤니티는 만 12세 이상의 사용자만 이용할 수 있으며, 귀하는 본 커뮤니티를 이용함에 있어 해당 연령 요건을 충족함을 진술하고 보증합니다.
                      </li>
                    </ul>
                    <h3 className="text-lg font-bold txt-gra-7 text-w-neutral-1">2. 사용자 책임</h3>
                    <ul className="list-none text-base text-w-neutral-3 space-y-2">
                      <li className="pl-6">
                      귀하는 커뮤니티를 합법적인 목적에 한하여 사용하며, 관련된 모든 법률 및 규정을 준수할 것에 동의합니다. 
                      </li>
                      <li className="pl-6">
                      귀하는 자신의 계정 정보의 기밀성을 유지할 책임이 있으며, 계정을 통해 이루어지는 모든 활동에 대해 책임을 집니다.
                      </li>
                    </ul>
                    <h3 className="text-lg font-bold txt-gra-7 text-w-neutral-1">3. 사용자 행동 수칙</h3>
                    <ul className="list-none text-base text-w-neutral-3 space-y-2">
                      <li className="pl-6">
                      귀하는 해킹, 스팸 전송, 악성코드 배포 등 커뮤니티나 다른 사용자에게 해를 끼칠 수 있는 어떠한 행위도 하지 않을 것에 동의합니다.
                      </li>
                      <li className="pl-6">
                      귀하는 혐오 발언, 괴롭힘, 또는 커뮤니티 내에 적대적인 환경을 조성하는 기타 행위를 하지 않을 것에 동의합니다.
                      </li>
                      <li className="pl-6">
                      웹사이트에 포함된 모든 콘텐츠(텍스트, 이미지, 그래픽, 비디오 및 기타 자료)는 지적 재산권의 보호를 받습니다.
                      </li>
                    </ul>
                    <h3 className="text-lg font-bold txt-gra-7 text-w-neutral-1">4. 개인정보 처리방침</h3>

                    <div className="list-disc pl-5 text-base text-w-neutral-3 space-y-2 ">
                      <p><strong> 수집 항목</strong><br />
                      회원 가입 시 이메일 주소, 닉네임, 비밀번호 등 최소한의 개인정보를 수집합니다.</p>

                      <p><strong> 수집 목적</strong><br />
                      수집된 개인정보는 커뮤니티 운영, 맞춤형 서비스 제공, 부정 이용 방지 등의 목적으로만 활용됩니다.</p>

                      <p><strong> 보유 및 파기</strong><br />
                      회원 탈퇴 또는 수집 목적 달성 시, 개인정보는 관련 법령에 따라 즉시 파기되며, 필요한 경우 일정 기간 동안 별도로 분리 보관됩니다.</p>

                      <p><strong> 제3자 제공 및 위탁</strong><br />
                      회사는 원칙적으로 개인정보를 외부에 제공하지 않으며, 불가피하게 제3자에게 제공 또는 처리 위탁 시에는 사전 동의를 받습니다.</p>

                      <p><strong> 이용자의 권리</strong><br />
                      이용자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제, 처리 정지 등의 권리를 행사할 수 있습니다.</p>
                    </div>       
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
import Bookmark from "@/components/sections/profile/bookmarks/Bookmark";

const Page = () => {
  return <Bookmark />;
};

export default Page;

// "use client";

// import { useAuth } from "@/contexts/AuthContext"; // 나중에 로그인 여부 확인용
// import Bookmark from "@/components/sections/profile/bookmarks/Bookmark";
// import Link from "next/link";

// export default function Page() {
//   const { user } = useAuth(); // 현재 로그인된 사용자 정보

//   // 로그인 여부 강제 설정 (테스트용)
//   const isLoggedIn = false; // <== 여기서 무조건 로그아웃 상태로 보기

//   if (!isLoggedIn) {
//     return (
//       <div className="text-center py-60p">
//         <p className="text-l-regular text-w-neutral-4">
//           로그인 후 이용 가능합니다.
//         </p>
//         <Link href="/login" className="underline text-w-neutral-1">
//           로그인하러 가기
//         </Link>
//       </div>
//     );
//   }

//   return <Bookmark />;
// }

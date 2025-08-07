// src/app/mentoring-lists/[type]/page.tsx
import Mentors from "@/components/sections/mentor-menti/Mentors";
import Mentoring from "@/components/sections/mentor-menti/Mentoring";
import Breadcrumb from "@/components/shared/Breadcumb";
import { NavLinkProps } from "@/config/types";
import { mentorings } from "@public/data/mentorings";
import { mentors } from "@public/data/mentors";

type PageProps = {
  params: { type: string };
};

export async function generateStaticParams() {
  return [
    { type: "mentoring" },
    { type: "mentor" },
  ];
}

export default async function PostPage(props: PageProps) {
  const { type } = props.params;

  // type에 따른 title 설정
  const labelMap: Record<string, string> = {
    mentoring: "멘토링 목록",
    mentor: "멘토 목록",
  };

  const title = labelMap[type] 

  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "멘토/멘티 찾기" },
    { id: 3, url: `/mentoring-lists/${type}`, label: title },
  ];

  let data: any[] = [];

  if (type === "mentoring") {
    data = mentors;
  } else if (type === "mentor") {
    data = mentorings;  
  }

    const headerData = {
    title,
    bgImgClasses: "",
    navLinks,
  };

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
        <div className="mb-20">
        {type === "mentoring" ? (
          <Mentoring data={data} type={type}/>
        ) : type === "mentor" ? (
          <Mentors data={data} type={type}/>
        ) : (
          <p>해당 타입의 데이터를 찾을 수 없습니다.</p>
        )}
        </div>
    </main>
  );
}
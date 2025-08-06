// src/app/mentoring-lists/[type]/page.tsx
import Mentors from "@/components/sections/mentor-menti/Mentors";
import Mentoring from "@/components/sections/mentor-menti/Mentoring";
import Breadcrumb from "@/components/shared/Breadcumb";
import { NavLinkProps } from "@/config/types";

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
    data = [
      {
        id: 1,
        title: "멘토링 1",
        description: "설명 1",
        category: "frontend",
        image: "/images/blogs/blog1.png",
        price: 50000,
        rating: 4.8,
        reviews: 12,
        author: {
          name: "홍길동",
          image: "/images/blogs/blog2.png",
          role: "Frontend Developer",
        },
      },
    {
      id: 2,
      title: "멘토링 2",
      description: "설명 2",
      category: "backend",
      image: "/images/blogs/blog3.png",
      price: 60000,
      rating: 4.6,
      reviews: 8,
      author: {
        name: "김영희",
        image: "/images/blogs/blog4.png",
        role: "Backend Engineer",
      },
    },
  ];
    } else if (type === "mentor") {
data = [
  {
    id: 1,
    title: "프론트엔드 마스터 클래스",
    description: "React와 Next.js를 활용한 실전 프로젝트 중심 멘토링",
    category: "frontend",
    image: "/images/blogs/blog1.png",
    price: 50000,
    rating: 4.8,
    reviews: 12,
    author: {
      name: "홍길동",
      image: "/images/blogs/blog2.png",
      role: "Frontend Developer",
    },
  },
  {
    id: 2,
    title: "백엔드 시스템 설계 입문",
    description: "Spring Boot 기반의 API 설계 및 DB 연동 멘토링",
    category: "backend",
    image: "/images/blogs/blog3.png",
    price: 60000,
    rating: 4.6,
    reviews: 8,
    author: {
      name: "김영희",
      image: "/images/blogs/blog4.png",
      role: "Backend Engineer",
    },
  },
  {
    id: 3,
    title: "풀스택 웹 개발 A to Z",
    description: "프론트부터 배포까지 한 번에 배우는 풀스택 멘토링",
    category: "fullstack",
    image: "/images/blogs/blog5.png",
    price: 70000,
    rating: 4.9,
    reviews: 20,
    author: {
      name: "이철수",
      image: "/images/blogs/blog6.png",
      role: "Fullstack Developer",
    },
  },
  {
    id: 4,
    title: "DevOps 파이프라인 구축하기",
    description: "CI/CD, Docker, Kubernetes 기반 자동화 파이프라인",
    category: "devops",
    image: "/images/blogs/blog7.png",
    price: 55000,
    rating: 4.7,
    reviews: 10,
    author: {
      name: "박지민",
      image: "/images/blogs/blog8.png",
      role: "DevOps Engineer",
    },
  },
  {
    id: 5,
    title: "리액트 고급 패턴",
    description: "Custom Hook, Context API, 코드 스플리팅 등 고급 내용",
    category: "frontend",
    image: "/images/blogs/blog9.png",
    price: 52000,
    rating: 4.5,
    reviews: 7,
    author: {
      name: "최수연",
      image: "/images/blogs/recentBlog1.png",
      role: "Senior Frontend Developer",
    },
  },
  {
    id: 6,
    title: "Node.js 마이크로서비스 구축",
    description: "Express, Redis, RabbitMQ를 이용한 확장 가능한 시스템",
    category: "backend",
    image: "/images/blog/recentBlog2.png",
    price: 58000,
    rating: 4.6,
    reviews: 9,
    author: {
      name: "한준호",
      image: "/images/blog/blogDetails1.1.png",
      role: "Backend Architect",
    },
  },
];    }

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
          <Mentoring data={data} />
        ) : type === "mentor" ? (
          <Mentors data={data} />
        ) : (
          <p>해당 타입의 데이터를 찾을 수 없습니다.</p>
        )}
        </div>
    </main>
  );
}
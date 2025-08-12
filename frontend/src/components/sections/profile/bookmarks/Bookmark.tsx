"use client";

import { bookmarkData } from "@public/data/bookmarksData";
import Link from "next/link";
import { useState } from "react";
import Pagination from "@/components/shared/Pagination";

export type BookmarkItem = {
  id: string | number;
  title: string;
  author?: string;
  date?: string; // 작성일
  href: string; // 상세 페이지
  thumbnail?: string; // 이미지 or 영상 경로
};

type Props = {
  items?: BookmarkItem[];
  //북마크 해제
  onUnbookmark?: (id: BookmarkItem["id"]) => void;
};

const Bookmark = ({items, onUnbookmark}: Props)=> {
    //BookmarksData.ts 정보 사용 (초기 북마크 목록) 
    const [list, setList] = useState<BookmarkItem[]>(items ?? bookmarkData);
    // 페이지네이션 상태
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(list.length / itemsPerPage);

    const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
    //북마크 해제 기능
    //현재 list에서 해당 id를 가진 게시물 제거
    //여기에 DB 연동하시면됩니다.
    const handleRemove = (id: BookmarkItem["id"])=>{
      setList((prev) => prev.filter((x) => x.id !== id));
      onUnbookmark?.(id);
  };
  // 현재 페이지 아이템만 가져오기
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = list.slice(startIndex, startIndex + itemsPerPage);

return (
  <section className="section-pb pt-60p overflow-visible">
    <div className="container">
      <div className="grid grid-cols-12 gap-30p">
        {/* 리스트 전체 길이 조정 */}
        <div className="4xl:col-start-2 4xl:col-end-12 col-span-12 xl:p-[55px] p-48p bg-b-neutral-3 rounded-12">
          {/* 제목 + 북마크 개수 */}
          <div className="flex items-center justify-between mb-16p">
            <h3 className="heading-3 text-w-neutral-1 text-split-left">
              내가 북마크한 게시물
            </h3>
            <span className="text-l-regular text-w-neutral-4">
              {list.length} items
            </span>
          </div>
          {/* 북마크 없을시 나오는 화면 */}
          {list.length === 0 ? (
            <div className="text-center py-60p">
              <p className="text-l-regular text-w-neutral-4">
                아직 북마크한 게시물이 없습니다.
              </p>
              <Link
                href="/community"
                className="inline-block mt-16p underline text-w-neutral-1"
              >
                게시물 보러가기
              </Link>
            </div>
            ) : (
            <ul className="grid xxl+:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-20p">
              {list.map((post) => (
                <li
                  key={post.id}
                  className="rounded-12 overflow-hidden border border-b-neutral-4/20"
                >
                  {/* 썸네일 */}
              <div className="aspect-video bg-b-neutral-2">
                {post.thumbnail?.endsWith(".mp4") || post.thumbnail?.endsWith(".webm") ? (
                  <video
                    src={post.thumbnail}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={post.thumbnail || "/images/default-thumbnail.png"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
                  {/* 내용 */}
                  <div className="p-15p">
                    <Link href={post.href} className="block">
                    <h4 className="text-xl font-borda text-w-neutral-1 line-clamp-2 mt-8p">
                      {post.title}
                    </h4>
                    </Link>

                    <div className="flex items-center gap-12p text-sm text-w-neutral-4 mt-12p">
                      {post.author && <span>{post.author}</span>}
                      {post.date && <span>· {post.date}</span>}
                    </div>
                    {/* 자세히 보기 클릭시 해당 게시물 상세보기로 이동 */}
                    <div className="mt-auto flex items-center justify-between pt-16p">
                      <Link href={post.href} className="underline">
                        자세히 보기
                      </Link>
                      <button
                        onClick={() => handleRemove(post.id)}
                        className="text-red-400 hover:opacity-80"
                        aria-label="Remove bookmark"
                      >
                        북마크 해제
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {/* 페이징 */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-48p"
          />
        </div>
      </div>
    </div>
  </section>
          );

};

export default Bookmark;

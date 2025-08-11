"use client";

import myPostsData from "@public/data/myPostData";
import MyPost from "./MyPosts";           // 왼쪽 카드 컴포넌트
import MyComments from "./MyComments";     // 오른쪽 카드 리스트
import myCommentsData from "@public/data/myCommentData";

export default function MyActivity() {
  return (
    <section className="section-pb pt-60p overflow-visible">
      <div className="container">
        <div className="grid grid-cols-12 gap-30p">
          {/* 내가 쓴 게시물 */}
          <div className="4xl:col-start-2 4xl:col-end-8 xl:col-span-7 col-span-12">
            <h3 className="heading-3 text-w-neutral-1 text-split-left mb-16p">
              내가 쓴 게시물
            </h3>
            <ul className="grid grid-cols-1 gap-20p">
              {myPostsData.map((post) => (
                <li key={post.id}>
                  <MyPost post={post} />
                </li>
              ))}
            </ul>
          </div>

          {/* 내가 쓴 댓글 */}
          <div className="4xl:col-start-8 4xl:col-end-12 xl:col-span-5 col-span-12">
            <h3 className="heading-3 text-w-neutral-1 text-split-left mb-16p">
              내가 쓴 댓글
            </h3>
            <div className="xl:sticky xl:top-30">
              <MyComments comments={myCommentsData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

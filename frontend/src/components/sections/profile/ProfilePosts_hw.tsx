// "use client";

// import VideoPlayer from "@/lib/plyr/VideoPlayer";
// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import AnimateHeight from "react-animate-height";
// import {
//   IconDots,
//   IconHeart,
//   IconMessage,
//   IconMoodSmileBeam,
//   IconChevronDown,
//   IconChevronUp,
//   IconBookmark,
//   IconBookmarkFilled,
// } from "@tabler/icons-react";

// // 경로는 너 프로젝트에 맞게 조정
// import type { NewPost } from "../community/Community_hw";

// // 로컬에서 북마크 상태를 추가로 들고가도록 확장
// type LocalPost = NewPost & { bookmarked?: boolean };

// type Props = {
//   posts: NewPost[];
//   onAddComment?: (postId: number, text: string) => Promise<void> | void; // 선택(부모 저장)
//   onToggleBookmark?: (postId: number, bookmarked: boolean) => Promise<void> | void; // 선택(서버 동기화)
// };

// export default function ProfilePosts({ posts, onAddComment, onToggleBookmark }: Props) {
//   const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
//   const [showMoreCommentsId, setShowMoreCommentsId] = useState<number | null>(null);
//   const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
//   const [localPosts, setLocalPosts] = useState<LocalPost[]>(
//     posts.map((p) => ({ ...p, bookmarked: p.bookmarked ?? false }))
//   );

//   // 부모에서 posts가 바뀌면 동기화
//   useEffect(() => {
//     setLocalPosts(posts.map((p) => ({ ...p, bookmarked: (p as any).bookmarked ?? false })));
//   }, [posts]);

//   const handleSubmitComment = async (postId: number) => {
//     const text = (commentInputs[postId] ?? "").trim();
//     if (!text) return;
//     try {
//       if (onAddComment) {
//         await onAddComment(postId, text);
//       } else {
//         // 로컬 업데이트(데모)
//         setLocalPosts((prev) =>
//           prev.map((p) =>
//             p.id === postId
//               ? {
//                   ...p,
//                   comments: [
//                     ...(p.comments ?? []),
//                     {
//                       author: p.author, // 데모: 현재 사용자 타입 있으면 거기에 맞춰 바꿔도 좋음
//                       comment: text,
//                     },
//                   ],
//                 }
//               : p
//           )
//         );
//       }
//     } finally {
//       setCommentInputs((s) => ({ ...s, [postId]: "" }));
//       setExpandedPostId(postId);
//       setShowMoreCommentsId(postId);
//     }
//   };

//   const handleToggleBookmark = async (postId: number) => {
//     setLocalPosts((prev) =>
//       prev.map((p) => (p.id === postId ? { ...p, bookmarked: !p.bookmarked } : p))
//     );
//     const after = !localPosts.find((p) => p.id === postId)?.bookmarked;
//     try {
//       await onToggleBookmark?.(postId, after);
//     } catch {
//       // 실패 시 롤백 (선택)
//       setLocalPosts((prev) =>
//         prev.map((p) => (p.id === postId ? { ...p, bookmarked: !after } : p))
//       );
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 gap-30p *:bg-b-neutral-3 *:rounded-12 *:px-40p *:py-32p">
//       {localPosts?.map((item) => {
//         const isExpanded = expandedPostId === item.id;
//         const showMore = showMoreCommentsId === item.id;

//         return (
//           <div key={`post-${item.id}`} className="relative">
//             {/* Header */}
//             <div className="flex items-center justify-between flex-wrap gap-3">
//               <div className="flex items-center gap-3">
//                 <Image
//                   className="avatar size-60p"
//                   width={60}
//                   height={60}
//                   src={item?.author?.avatar}
//                   alt="user"
//                 />
//                 <div>
//                   <Link
//                     href="/profile"
//                     className="text-xl-medium text-w-neutral-1 link-1 line-clamp-1 mb-1"
//                   >
//                     {item?.author?.name}
//                   </Link>
//                   <span className="text-s-medium text-w-neutral-4">{item?.publish}</span>
//                 </div>
//               </div>

//               <Menu as="div" className="dropdown shrink-0 z-20">
//                 <MenuButton className="dropdown-toggle w-fit text-white icon-32">
//                   <IconDots size={32} />
//                 </MenuButton>
//                 <MenuItems className="dropdown-content">
//                   <MenuItem as="button" className="dropdown-item">
//                     Save Link
//                   </MenuItem>
//                   <MenuItem as="button" className="dropdown-item">
//                     Report
//                   </MenuItem>
//                   <MenuItem as="button" className="dropdown-item">
//                     Hide Post
//                   </MenuItem>
//                   <MenuItem as="button" className="dropdown-item">
//                     Block User
//                   </MenuItem>
//                 </MenuItems>
//               </Menu>
//             </div>

//             {/* Body */}
//             <div className="grid grid-cols-1 gap-20p py-20p">
//               {item?.content?.postText && (
//                 <p className="text-sm text-w-neutral-4">{item?.content?.postText}</p>
//               )}

//               {isExpanded && (
//                 <>
//                   {/* Image */}
//                   {item?.content?.image && (
//                     <div className="overflow-hidden">
//                       <Image
//                         className="w-full xl:h-[472px] lg:h-[420px] md:h-[380px] h-[320px] hover:scale-110 object-cover transition-1"
//                         src={item?.content?.image}
//                         width={1200}
//                         height={472}
//                         alt="img"
//                       />
//                     </div>
//                   )}

//                   {/* Video */}
//                   {item?.content?.video?.embedUrl ? (
//                     <div className="aspect-video w-full rounded-12 overflow-hidden bg-b-neutral-2">
//                       <iframe
//                         src={item.content.video.embedUrl}
//                         className="w-full h-full"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                         allowFullScreen
//                         referrerPolicy="strict-origin-when-cross-origin"
//                       />
//                     </div>
//                   ) : item?.content?.video?.videoSrc ? (
//                     <VideoPlayer
//                       posterSrc={item?.content?.video?.posterSrc}
//                       videoSrc={item?.content?.video?.videoSrc}
//                     />
//                   ) : null}
//                 </>
//               )}
//             </div>

//             {/* Summary (collapsed) */}
//             {!isExpanded && (
//               <div className="flex items-center gap-4 text-sm text-w-neutral-4 mb-3">
//                 <span>❤️ {item?.likes?.length ?? 0}</span>
//                 <span>💬 {item?.comments?.length ?? 0}</span>
//               </div>
//             )}

//             {/* Footer (expanded actions + comments) */}
//             {isExpanded && (
//               <div>
//                 <div className="flex items-center justify-between flex-wrap gap-24p mb-20p">
//                   <div className="flex items-center gap-32p">
//                     <button
//                       type="button"
//                       className="flex items-center gap-2 text-base text-w-neutral-1"
//                     >
//                       <IconHeart size={24} className="text-w-neutral-4" /> Like
//                     </button>

//                     <button
//                       type="button"
//                       className="flex items-center gap-2 text-base text-w-neutral-1"
//                     >
//                       <IconMessage size={24} className="text-w-neutral-4" /> Comment
//                     </button>
//                   </div>

//                   {/* ✅ 북마크 버튼 (Tabler 아이콘) */}
//                   <button
//                     type="button"
//                     onClick={() => handleToggleBookmark(item.id)}
//                     className="flex items-center gap-2 text-base text-w-neutral-1"
//                   >
//                     {item.bookmarked ? (
//                       <IconBookmarkFilled size={24} className="text-yellow-400" />
//                     ) : (
//                       <IconBookmark size={24} className="text-w-neutral-4" />
//                     )}
//                     {item.bookmarked ? "Bookmarked" : "BookMark"}
//                   </button>
//                 </div>

//                 {/* Comments */}
//                 <div className="pt-20p border-t border-shap">
//                   {/* Top 2 comments */}
//                   <div className="grid grid-cols-1 gap-20p mb-20p">
//                     {item?.comments?.slice(0, 2).map((coment, idx) => (
//                       <div key={`c-top-${item.id}-${idx}`} className="flex items-start gap-3">
//                         <Image
//                           className="avatar size-48p"
//                           src={coment?.author?.avatar}
//                           alt="user"
//                           width={48}
//                           height={48}
//                         />
//                         <div>
//                           <div className="bg-glass-5 px-3 py-2 rounded-12">
//                             <Link
//                               href="/profile"
//                               className="text-m-medium text-w-neutral-1 link-1 line-clamp-1 mb-2"
//                             >
//                               {coment?.author?.name}
//                             </Link>
//                             <div className="flex items-end max-sm:flex-wrap gap-3">
//                               <p className="text-sm text-w-neutral-3">{coment?.comment}</p>
//                               <button
//                                 type="button"
//                                 className="shrink-0 flex-y gap-2 icon-20 text-w-neutral-4"
//                               >
//                                 <IconHeart size={20} />
//                                 <IconMoodSmileBeam size={20} />
//                               </button>
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-16p">
//                             <button type="button" className="flex-y gap-1">
//                               <IconHeart size={20} className="text-danger" />
//                               <span className="text-sm text-w-neutral-1">Like</span>
//                             </button>
//                             <div className="flex-y gap-1">
//                               <button type="button" className="text-sm text-w-neutral-1">
//                                 Reply
//                               </button>
//                               <span className="text-sm text-w-neutral-1">{item?.publish}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* More comments */}
//                   <AnimateHeight duration={500} height={showMore ? "auto" : 0}>
//                     <div className="grid grid-cols-1 gap-20p">
//                       {item?.comments?.slice(2).map((coment, idx) => (
//                         <div key={`c-rest-${item.id}-${idx}`} className="flex items-start gap-3">
//                           <Image
//                             className="avatar size-48p"
//                             src={coment?.author?.avatar}
//                             alt="user"
//                             width={48}
//                             height={48}
//                           />
//                           <div>
//                             <div className="bg-glass-5 px-3 py-2 rounded-12">
//                               <Link
//                                 href="/profile"
//                                 className="text-m-medium text-w-neutral-1 link-1 line-clamp-1 mb-2"
//                               >
//                                 {coment?.author?.name}
//                               </Link>
//                               <div className="flex items-end max-sm:flex-wrap gap-3">
//                                 <p className="text-sm text-w-neutral-3">{coment?.comment}</p>
//                                 <button
//                                   type="button"
//                                   className="shrink-0 flex-y gap-2 icon-20 text-w-neutral-4"
//                                 >
//                                   <IconHeart size={20} />
//                                   <IconMoodSmileBeam size={20} />
//                                 </button>
//                               </div>
//                             </div>
//                             <div className="flex items-center gap-16p">
//                               <button type="button" className="flex-y gap-1">
//                                 <IconHeart size={20} className="text-danger" />
//                                 <span className="text-sm text-w-neutral-1">Like</span>
//                               </button>
//                               <div className="flex-y gap-1">
//                                 <button type="button" className="text-sm text-w-neutral-1">
//                                   Reply
//                                 </button>
//                                 <span className="text-sm text-w-neutral-1">{item?.publish}</span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </AnimateHeight>

//                   {item?.comments && item.comments.length > 2 && (
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setShowMoreCommentsId((prevId) => (prevId === item.id ? null : item.id));
//                       }}
//                       type="button"
//                       className="text-m-medium text-w-neutral-1 mb-16p block mt-20p"
//                     >
//                       {showMore
//                         ? "Hide comments"
//                         : `View ${item?.comments.length - 2} more comment`}
//                     </button>
//                   )}

//                   {/* Comment input */}
//                   <form
//                     className="flex items-center justify-between gap-24p bg-b-neutral-2 rounded-full py-16p px-32p"
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                       handleSubmitComment(item.id);
//                     }}
//                   >
//                     <input
//                       className="w-full bg-transparent text-base text-white placeholder:text-w-neutral-1 outline-none"
//                       type="text"
//                       name={`comment-${item.id}`}
//                       placeholder="Add Your Comment..."
//                       value={commentInputs[item.id] ?? ""}
//                       onChange={(e) =>
//                         setCommentInputs((s) => ({ ...s, [item.id]: e.target.value }))
//                       }
//                     />
//                     <div className="flex-y gap-3 icon-24 text-w-neutral-4">
//                       <button type="button" title="Emoji">
//                         <i className="ti ti-mood-smile-beam"></i>
//                       </button>
//                       <label htmlFor={`comment-media-${item.id}`} title="Attach photo">
//                         <i className="ti ti-photo"></i>
//                       </label>
//                       <input type="file" id={`comment-media-${item.id}`} className="hidden" />
//                       <button type="submit" title="Send">
//                         <i className="ti ti-send"></i>
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             )}

//             {/* Expand/Collapse */}
//             <div className="flex justify-end mt-2">
//               <button
//                 onClick={() => setExpandedPostId(isExpanded ? null : item.id)}
//                 className="text-sm text-w-neutral-4 hover:text-w-neutral-1 transition flex items-center gap-1"
//               >
//                 {isExpanded ? (
//                   <>
//                     Close <IconChevronUp size={16} />
//                   </>
//                 ) : (
//                   <>
//                     Open <IconChevronDown size={16} />
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

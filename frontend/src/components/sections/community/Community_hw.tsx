'use client';

import Link from "next/link";
import { useMemo, useState } from "react";
import ProfilePosts, { NewPost as PostType } from "../profile/ProfilePosts_hw";
import { blogPosts } from "@public/data/blogPosts";
import { timelineItems as seedItems } from "@public/data/timelinePosts";
import { useSearchParams } from "next/navigation";
import {
  IconTrendingUp,
  IconHash,
  IconSwords,
  IconBulb,
  IconListDetails,
  IconUsersPlus,
  IconNotification,
} from "@tabler/icons-react";

type TabKey = "most" | "new" | "top";
type RangeKey = "today" | "week" | "month" | "all";
type BoardKey =
  | "all"
  | "popular"
  | "keywords"
  | "guides"
  | "tips"
  | "duos-list"
  | "duos-match"
  | "notify";

const BOARDS: { key: BoardKey; label: string; icon: JSX.Element }[] = [
  { key: "notify",     label: "공지",        icon: <IconNotification size={16} /> },
  { key: "popular",    label: "인기글",      icon: <IconTrendingUp size={16} /> },
  { key: "keywords",   label: "자유 게시판", icon: <IconHash size={16} /> },
  { key: "guides",     label: "공략",        icon: <IconSwords size={16} /> },
  { key: "tips",       label: "팁과 노하우", icon: <IconBulb size={16} /> },
  { key: "duos-list",  label: "스쿼드 조회", icon: <IconListDetails size={16} /> },
  { key: "duos-match", label: "스쿼드 생성", icon: <IconUsersPlus size={16} /> },
];

const safeParse = (s?: string) => {
  if (!s) return NaN;
  const ts = Date.parse(s.includes("T") ? s : s.replace?.(" ", "T") ?? "");
  return Number.isNaN(ts) ? NaN : ts;
};

function normalizeSeed(items: any[]): PostType[] {
  return (items ?? []).map((it: any, i: number) => {
    const raw = it?.publish ?? "";
    const ts = safeParse(raw);
    const publishISO =
      Number.isNaN(ts)
        ? new Date().toISOString().slice(0, 16).replace("T", " ")
        : new Date(ts).toISOString().slice(0, 16).replace("T", " ");

    return {
      id: it?.id ?? i + 1,
      author: it?.author ?? { name: "John Doe", avatar: "/images/users/avatar1.png" },
      publish: publishISO,
      community: it?.community ?? "r/watchpoint",
      flair: it?.flair,
      score: it?.score ?? Math.floor(Math.random() * 100),
      userVote: 0,
      saved: false,
      title: it?.title ?? "Untitled",
      content: {
        postText: it?.content?.postText,
        image: it?.content?.image,
        video: it?.content?.video,
        linkUrl: it?.content?.linkUrl,
        ...(it?.content?.images ? { images: it.content.images } : {}),
      },
      likes: it?.likes,
      comments: it?.comments,
    };
  });
}

export default function Community() {
  const sp = useSearchParams();
  const currentBoard = (sp.get("board") as BoardKey) ?? "all";

  const [posts] = useState<PostType[]>(normalizeSeed(seedItems as any[]));
  const [activeTab, setActiveTab] = useState<TabKey>("most");
  const [timeRange, setTimeRange] = useState<RangeKey>("all");

  useMemo(() => blogPosts.slice(0, 5), []); // (미사용)

  // 보드 필터
  const boardFiltered = useMemo(() => {
    if (currentBoard === "popular") {
      return posts.slice().sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    }
    return posts;
  }, [posts, currentBoard]);

  // 기간 필터
  const withRangeFiltered = useMemo(() => {
    const now = Date.now();
    const day = 86400000;
    const inRange = (ts: number) => {
      if (timeRange === "today") return now - ts <= day;
      if (timeRange === "week") return now - ts <= 7 * day;
      if (timeRange === "month") return now - ts <= 30 * day;
      return true;
    };
    return boardFiltered.filter((p) => inRange(safeParse(p.publish) || 0));
  }, [boardFiltered, timeRange]);

  // 탭 정렬
  const visiblePosts = useMemo(() => {
    const now = Date.now();
    const decay = (ts: number) => Math.pow((now - ts) / 36e5 + 2, 1.3);
    let base = [...withRangeFiltered];

    if (activeTab === "new") {
      base.sort((a, b) => (safeParse(b.publish) || 0) - (safeParse(a.publish) || 0));
      return base;
    }
    if (activeTab === "top") {
      base.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
      return base;
    }
    base.sort((a, b) => {
      const amost = (a.score ?? 0) / decay(safeParse(a.publish) || 0);
      const bmost = (b.score ?? 0) / decay(safeParse(b.publish) || 0);
      return bmost - amost;
    });
    return base;
  }, [withRangeFiltered, activeTab]);


  const HEADER_OFFSET = "top-[96px]";
  const PAGE_PADDING_TOP = "pt-[135px]";

  return (
    <main className={`min-h-screen bg-black ${PAGE_PADDING_TOP}`}>
      <div className="mx-auto max-w-[1320px] px-6 pb-14">
        {/* 좌(사이드바 300px) / 우(피드) */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)]">
          {/* LEFT */}
          <aside className={`md:sticky md:self-start ${HEADER_OFFSET}`}>
            <div className="bg-b-neutral-3 rounded-16 p-4 shadow-sm border border-b-neutral-2/40">
              <Link
                href="/community/post"
                className="btn btn-sm btn-primary w-full rounded-10 mb-4"
              >
                Create Post
              </Link>

              <nav className="flex flex-col gap-2">
                {BOARDS.map((b) => {
                  const active = currentBoard === b.key;
                  return (
                    <Link
                      key={b.key}
                      href={`/community?board=${b.key}`}
                      className={[
                        "w-full h-[44px] px-3 rounded-12 text-[14px] flex items-center gap-2 transition justify-start",
                        active
                          ? "bg-b-neutral-2 text-w-neutral-1"
                          : "text-w-neutral-3 hover:text-w-neutral-1 hover:bg-b-neutral-2/70",
                      ].join(" ")}
                      aria-current={active ? "page" : undefined}
                    >
                      <span className="shrink-0">{b.icon}</span>
                      <span>{b.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>
{/* RIGHT */}
<section className="min-w-0">
  <div className="mx-auto w-full max-w-[1000px]">
    {/* ▶ 필터바: sticky 제거, 두께 충분, 카드와 확실히 분리 */}
    <div className="mb-5">
      <div className="bg-b-neutral-3 rounded-12 px-6 py-5 border border-w-neutral-4/20 shadow-md">
        <div className="flex flex-wrap items-center gap-3">
          <button
            className={`btn btn-sm ${activeTab === "most" ? "btn-primary" : ""}`}
            onClick={() => setActiveTab("most")}
          >
            Most
          </button>
          <button
            className={`btn btn-sm ${activeTab === "new" ? "btn-primary" : ""}`}
            onClick={() => setActiveTab("new")}
          >
            New
          </button>
          <button
            className={`btn btn-sm ${activeTab === "top" ? "btn-primary" : ""}`}
            onClick={() => setActiveTab("top")}
          >
            Top ▾
          </button>

          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs text-w-neutral-4">Time range</span>
            <select
              className="select select-sm bg-b-neutral-2 rounded-8 min-w-[132px]"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as RangeKey)}
            >
              <option value="today">Today</option>
              <option value="week">This week</option>
              <option value="month">This month</option>
              <option value="all">All time</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    {/* ▶ 게시물 리스트 */}
    <ProfilePosts posts={visiblePosts} />
  </div>
</section>

        </div>
      </div>
    </main>
  );
}

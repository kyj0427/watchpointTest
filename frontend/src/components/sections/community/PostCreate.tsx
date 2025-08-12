// components/RedditCreateBox.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  IconHash, IconX, IconPhoto, IconVideo, IconBrandYoutubeFilled,
  IconLink, IconUpload,
  IconTrendingUp, IconSwords, IconBulb
} from "@tabler/icons-react";

type Tab = "text" | "media" | "link";

// 게시판 키/라벨/아이콘
type BoardKey = "popular" | "keywords" | "guides" | "tips";
const BOARDS: { key: BoardKey; label: string; icon: JSX.Element }[] = [
  { key: "popular",  label: "인기글",      icon: <IconTrendingUp size={16} /> },
  { key: "keywords", label: "자유 게시판", icon: <IconHash size={16} /> },
  { key: "guides",   label: "공략",        icon: <IconSwords size={16} /> },
  { key: "tips",     label: "팁과 노하우", icon: <IconBulb size={16} /> },
];

type Form = {
  tab: Tab;
  title: string;
  body?: string;
  media?: FileList;
  videoFile?: FileList;
  videoUrl?: string;
  linkUrl?: string;
  tagInput?: string;
  board?: BoardKey; // 선택 커뮤니티
};

function parseVideoLink(u?: string) {
  if (!u) return {};
  const s = u.trim();
  const yt = s.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/))([A-Za-z0-9_-]{6,})/) || s.match(/[?&]v=([A-Za-z0-9_-]{6,})/);
  if (yt?.[1]) return { embedUrl: `https://www.youtube.com/embed/${yt[1]}` };
  const vi = s.match(/vimeo\.com\/(\d{6,})/);
  if (vi?.[1]) return { embedUrl: `https://player.vimeo.com/video/${vi[1]}` };
  if (/^https?:\/\/.*\.(mp4|webm|ogg)(\?.*)?$/i.test(s)) return { videoSrc: s };
  return /^https?:\/\//.test(s) ? { embedUrl: s } : {};
}

export default function RedditCreateBox() {
  const [tags, setTags] = useState<string[]>([]);
  const [boardOpen, setBoardOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { register, setValue, watch, handleSubmit, reset, setError, clearErrors } =
    useForm<Form>({
      defaultValues: {
        tab: "text",
        title: "",
        body: "",
        board: undefined,
      },
    });

  const tab = watch("tab");
  const title = (watch("title") || "").trim();
  const body = watch("body") || "";
  const linkUrl = (watch("linkUrl") || "").trim();
  const media = watch("media");
  const vfile = watch("videoFile");
  const vurl = watch("videoUrl");
  const selectedBoard = watch("board");

  const containerCls = "mx-auto max-w-3xl";
  const cardCls = "bg-b-neutral-3 text-w-neutral-1 rounded-12 border border-b-neutral-2 p-5 shadow-xl";
  const labelCls = "text-sm text-w-neutral-3";
  const inputBase =
    "w-full rounded-xl px-3 py-2 text-sm outline-none border bg-b-neutral-2 " +
    "text-w-neutral-1 placeholder:text-w-neutral-4 border-b-neutral-2 focus:border-primary";
  const textAreaBase =
    "w-full rounded-xl px-3 py-3 text-sm outline-none border bg-b-neutral-2 " +
    "text-w-neutral-1 placeholder:text-w-neutral-4 border-b-neutral-2 focus:border-primary";
  const subtleText = "text-xxs text-w-neutral-4";
  const chipBtn =
    "px-3 py-1.5 rounded-full text-sm transition";

  const previews = useMemo(() => {
    if (!media?.length) return [];
    return Array.from(media).map((f) => URL.createObjectURL(f));
  }, [media]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) setBoardOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setBoardOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const canPost = useMemo(() => {
    if (!title) return false;
    if (!selectedBoard) return false;
    if (tab === "text") return true;
    if (tab === "media") {
      const hasImg = (media?.length ?? 0) > 0;
      const hasFileV = (vfile?.length ?? 0) > 0;
      const hasUrlV = !!Object.keys(parseVideoLink(vurl)).length;
      return hasImg || hasFileV || hasUrlV;
    }
    if (tab === "link") return /^https?:\/\//i.test(linkUrl);
    return false;
  }, [title, tab, media, vfile, vurl, linkUrl, selectedBoard]);

  const onPost = handleSubmit(() => {
    if (!canPost) return;
    reset(); setTags([]);
  });

  const addTag = () => {
    const t = (watch("tagInput") || "").trim();
    if (!t) return;
    if (!tags.includes(t)) setTags([...tags, t]);
    setValue("tagInput", "");
  };

  const validateVideoFile = (f: File) => {
    const ok = ["video/mp4", "video/webm", "video/ogg"];
    if (!ok.includes(f.type)) return "mp4/webm/ogg만 허용";
    if (f.size > 200 * 1024 * 1024) return "200MB 이하만 허용";
    return null;
  };

  return (
    <section className={containerCls}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-w-neutral-1">게시글 작성</h2>
        <span className="text-sm text-w-neutral-4">임시글</span>
      </div>

      {/* ▼ 커뮤니티 선택 */}
      <div className="mb-3 relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setBoardOpen((v) => !v)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-b-neutral-2 text-w-neutral-2 hover:text-w-neutral-1 hover:bg-b-neutral-3 text-sm border border-b-neutral-2"
        >
          <span className="inline-block w-5 h-5 rounded-full bg-black text-white text-[10px] grid place-items-center">r/</span>
          <span className={selectedBoard ? "text-w-neutral-1" : ""}>
            {selectedBoard
              ? BOARDS.find(b => b.key === selectedBoard)?.label
              : "게시판 선택"}
          </span>
        </button>

        {boardOpen && (
          <ul className="absolute z-50 mt-2 w-64 rounded-12 border border-b-neutral-2 bg-b-neutral-3 shadow-xl overflow-hidden">
            {BOARDS.map((b) => {
              const active = selectedBoard === b.key;
              return (
                <li key={b.key}>
                  <button
                    type="button"
                    onClick={() => { setValue("board", b.key); setBoardOpen(false); }}
                    className={[
                      "w-full px-3 py-2 text-left flex items-center gap-2",
                      active
                        ? "bg-b-neutral-2 text-w-neutral-1"
                        : "text-w-neutral-2 hover:bg-b-neutral-2/70 hover:text-w-neutral-1"
                    ].join(" ")}
                  >
                    <span className="shrink-0">{b.icon}</span>
                    <span className="text-sm">{b.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* 탭 */}
      <div className="flex items-center gap-4 border-b border-b-neutral-2 mb-4">
        {(["text","media","link"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setValue("tab", t)}
            className={[
              chipBtn,
              tab === t
                ? "bg-primary text-black font-semibold"
                : "text-w-neutral-3 hover:text-w-neutral-1 hover:bg-b-neutral-3",
            ].join(" ")}
          >
            {t === "text" ? "텍스트" : t === "media" ? "이미지·동영상" : "링크"}
          </button>
        ))}
      </div>

      <div className={cardCls}>
        <input
          {...register("title")}
          placeholder="제목"
          className={inputBase}
          maxLength={300}
        />
        <div className={`${subtleText} mt-1 mb-3`}>{title.length}/300</div>

        {/* 태그 */}
        <div className="flex items-center gap-2 mb-3">
          <IconHash size={16} className="text-w-neutral-4" />
          <input
            {...register("tagInput")}
            placeholder="태그 추가"
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
            className={`${inputBase} !px-3 !py-2 text-xs`}
          />
          <button onClick={addTag} type="button" className="text-xs text-w-neutral-3 hover:text-w-neutral-1">추가</button>
        </div>
        {!!tags.length && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((t) => (
              <span key={t} className="px-2 py-1 rounded-full bg-b-neutral-2 text-w-neutral-2 text-[11px] inline-flex items-center gap-1 border border-b-neutral-2">
                #{t}
                <button onClick={() => setTags(tags.filter((x) => x !== t))} className="hover:text-w-neutral-1">
                  <IconX size={14} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* 탭별 UI */}
        {tab === "text" && (
          <textarea
            {...register("body")}
            placeholder="본문"
            rows={8}
            className={textAreaBase}
          />
        )}

        {tab === "media" && (
          <div className="space-y-3">
            <label className="inline-flex items-center gap-2 text-sm text-w-neutral-1 cursor-pointer">
              <IconPhoto size={18} className="text-w-neutral-2" />
              <span>사진 첨부</span>
              <input type="file" accept="image/*" multiple {...register("media")} className="hidden" />
            </label>

            <div className="flex flex-col md:flex-row gap-3">
              <label className="inline-flex items-center gap-2 text-sm text-w-neutral-1 cursor-pointer">
                <IconVideo size={18} className="text-w-neutral-2" />
                <span>동영상 파일 첨부</span>
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/ogg"
                  {...register("videoFile")}
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    const msg = validateVideoFile(f);
                    if (msg) setError("videoFile", { type: "manual", message: msg });
                    else clearErrors("videoFile");
                  }}
                />
              </label>

              <div className="flex items-center gap-2 flex-1">
                <IconBrandYoutubeFilled size={18} className="text-red-500" />
                <input
                  type="text"
                  placeholder="YouTube/Vimeo/MP4 주소(선택)"
                  {...register("videoUrl")}
                  className={`${inputBase} flex-1`}
                />
                <button type="button" onClick={() => setValue("videoUrl", "")} className="text-w-neutral-3 hover:text-w-neutral-1">
                  <IconX size={18} />
                </button>
              </div>
            </div>

            {previews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {previews.map((src, i) => (
                  <div key={i} className="aspect-video rounded-lg overflow-hidden border border-b-neutral-2">
                    <img src={src} alt={`preview-${i}`} className="object-cover w-full h-full" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "link" && (
          <div className="flex items-center gap-3">
            <IconLink size={18} className="text-w-neutral-2" />
            <input
              type="url"
              placeholder="https://"
              {...register("linkUrl")}
              className={`${inputBase} flex-1`}
            />
          </div>
        )}

        <div className="flex justify-end items-center gap-3 mt-4">
          <button
            type="button"
            className="px-4 py-2 rounded-full text-sm bg-b-neutral-2 text-w-neutral-2 hover:text-w-neutral-1 hover:bg-b-neutral-3 border border-b-neutral-2"
          >
            임시저장
          </button>
          <button
            type="button"
            onClick={onPost}
            disabled={!canPost}
            className="px-5 py-2 rounded-full text-sm font-semibold bg-primary text-black disabled:opacity-40 inline-flex items-center gap-2"
          >
            <IconUpload size={16} />
            게시
          </button>
        </div>
      </div>
    </section>
  );
}

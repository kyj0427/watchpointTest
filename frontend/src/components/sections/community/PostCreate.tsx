// components/RedditCreateBox.tsx
"use client";

import { useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  IconHash, IconX, IconPhoto, IconVideo, IconBrandYoutubeFilled,
  IconLink, IconUpload
} from "@tabler/icons-react";

type Tab = "text" | "media" | "link" | "poll";

type Form = {
  tab: Tab;
  title: string;
  body?: string;
  media?: FileList;
  videoFile?: FileList;
  videoUrl?: string;
  linkUrl?: string;
  pollOptions: { value: string }[];
  allowMultiple: boolean;
  durationDays: number;
  tagInput?: string;
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

  const { register, setValue, watch, handleSubmit, control, reset, setError, clearErrors } =
    useForm<Form>({
      defaultValues: {
        tab: "text",
        title: "",
        body: "",
        pollOptions: [{ value: "" }, { value: "" }],
        allowMultiple: false,
        durationDays: 3,
      },
    });

  const { fields, append, remove } = useFieldArray({ control, name: "pollOptions" });

  const tab = watch("tab");
  const title = (watch("title") || "").trim();
  const body = watch("body") || "";
  const linkUrl = (watch("linkUrl") || "").trim();
  const media = watch("media");
  const vfile = watch("videoFile");
  const vurl = watch("videoUrl");

  // === THEME: Watchpoint (dark) ===================================================
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
  // ===============================================================================

  // 미리보기
  const previews = useMemo(() => {
    if (!media?.length) return [];
    return Array.from(media).map((f) => URL.createObjectURL(f));
  }, [media]);

  // Post 가능 조건 (레딧 규칙)
  const canPost = useMemo(() => {
    if (!title) return false;
    if (tab === "text") return true;
    if (tab === "media") {
      const hasImg = (media?.length ?? 0) > 0;
      const hasFileV = (vfile?.length ?? 0) > 0;
      const hasUrlV = !!Object.keys(parseVideoLink(vurl)).length;
      return hasImg || hasFileV || hasUrlV;
    }
    if (tab === "link") return /^https?:\/\//i.test(linkUrl);
    if (tab === "poll") {
      const opts = fields.map((_, i) => (watch(`pollOptions.${i}.value`) || "").trim()).filter(Boolean);
      const d = Number(watch("durationDays"));
      return opts.length >= 2 && d >= 1 && d <= 7;
    }
    return false;
  }, [title, tab, media, vfile, vurl, linkUrl, fields, watch]);

  const onPost = handleSubmit(() => {
    if (!canPost) return;
    // TODO: 서버 전송
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
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-w-neutral-1">Create post</h2>
        <span className="text-sm text-w-neutral-4">Drafts</span>
      </div>

      {/* 커뮤니티 선택 (더미) */}
      <div className="mb-3">
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-b-neutral-2 text-w-neutral-2 hover:text-w-neutral-1 hover:bg-b-neutral-3 text-sm border border-b-neutral-2">
          <span className="inline-block w-5 h-5 rounded-full bg-black text-white text-[10px] grid place-items-center">r/</span>
          Select a community
        </button>
      </div>

      {/* 탭 */}
      <div className="flex items-center gap-4 border-b border-b-neutral-2 mb-4">
        {(["text","media","link","poll"] as Tab[]).map((t) => (
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
            {t === "text" ? "Text" : t === "media" ? "Images & Video" : t === "link" ? "Link" : "Poll"}
          </button>
        ))}
      </div>

      {/* 카드 */}
      <div className={cardCls}>
        {/* 제목 */}
        <input
          {...register("title")}
          placeholder="Title*"
          className={inputBase}
          maxLength={300}
        />
        <div className={`${subtleText} mt-1 mb-3`}>{title.length}/300</div>

        {/* 태그 */}
        <div className="flex items-center gap-2 mb-3">
          <IconHash size={16} className="text-w-neutral-4" />
          <input
            {...register("tagInput")}
            placeholder="Add tags"
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
            className={`${inputBase} !px-3 !py-2 text-xs`}
          />
          <button onClick={addTag} type="button" className="text-xs text-w-neutral-3 hover:text-w-neutral-1">Add</button>
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

        {/* 탭별 영역 */}
        {tab === "text" && (
          <textarea
            {...register("body")}
            placeholder="Body text (optional)"
            rows={8}
            className={textAreaBase}
          />
        )}

        {tab === "media" && (
          <div className="space-y-3">
            {/* 이미지 */}
            <label className="inline-flex items-center gap-2 text-sm text-w-neutral-1 cursor-pointer">
              <IconPhoto size={18} className="text-w-neutral-2" />
              <span>Attach Photo(s)</span>
              <input type="file" accept="image/*" multiple {...register("media")} className="hidden" />
            </label>

            {/* 비디오 파일 + 링크 */}
            <div className="flex flex-col md:flex-row gap-3">
              <label className="inline-flex items-center gap-2 text-sm text-w-neutral-1 cursor-pointer">
                <IconVideo size={18} className="text-w-neutral-2" />
                <span>Attach Video File</span>
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
                  placeholder="YouTube/Vimeo/MP4 URL (optional)"
                  {...register("videoUrl")}
                  className={`${inputBase} flex-1`}
                />
                <button type="button" onClick={() => setValue("videoUrl", "")} className="text-w-neutral-3 hover:text-w-neutral-1">
                  <IconX size={18} />
                </button>
              </div>
            </div>

            {/* 미리보기 */}
            {previews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {previews.map((src, i) => (
                  <div key={i} className="aspect-video rounded-lg overflow-hidden border border-b-neutral-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
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

        {tab === "poll" && (
          <div className="space-y-3">
            {fields.map((f, i) => (
              <div key={f.id} className="flex items-center gap-2">
                <input
                  {...register(`pollOptions.${i}.value` as const)}
                  placeholder={`Option ${i + 1}`}
                  className={`${inputBase} text-sm`}
                />
                {fields.length > 2 && (
                  <button type="button" onClick={() => remove(i)} className="text-w-neutral-3 hover:text-w-neutral-1">
                    <IconX size={18} />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => append({ value: "" })} className={`${labelCls} underline`}>
              Add option
            </button>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs text-w-neutral-3">
                <input type="checkbox" {...register("allowMultiple")} className="accent-primary" />
                Allow multiple selection
              </label>
              <label className="flex items-center gap-2 text-xs text-w-neutral-3">
                Duration
                <select {...register("durationDays")} className="bg-b-neutral-2 text-w-neutral-1 border border-b-neutral-2 rounded px-2 py-1 text-xs">
                  {[1,2,3,4,5,6,7].map((d)=> <option key={d} value={d}>{d} day{d>1?"s":""}</option>)}
                </select>
              </label>
            </div>
          </div>
        )}

        {/* 액션 */}
        <div className="flex justify-end items-center gap-3 mt-4">
          <button
            type="button"
            className="px-4 py-2 rounded-full text-sm bg-b-neutral-2 text-w-neutral-2 hover:text-w-neutral-1 hover:bg-b-neutral-3 border border-b-neutral-2"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={onPost}
            disabled={!canPost}
            className="px-5 py-2 rounded-full text-sm font-semibold bg-primary text-black disabled:opacity-40 inline-flex items-center gap-2"
          >
            <IconUpload size={16} />
            Post
          </button>
        </div>
      </div>
    </section>
  );
}

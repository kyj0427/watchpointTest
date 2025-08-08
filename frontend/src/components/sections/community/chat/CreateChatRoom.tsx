'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateChatRoom = () => {
  const router = useRouter();

  const [roomType, setRoomType] = useState("normal");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tier, setTier] = useState("free");
  const [maxMembers, setMaxMembers] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [restrictAccess, setRestrictAccess] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return alert("You must accept the guidelines.");
    console.log({ roomType, title, description, tier, maxMembers, tags, restrictAccess });
  };

  return (
    <section className="py-60p flex justify-center">
      <div className="w-full max-w-6xl bg-glass-2 rounded-3xl p-60p shadow-2xl flex flex-col gap-40p">
        <h1 className="text-5xl font-extrabold text-center mb-16">Create a New Chat Room</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-40p">
          {/* Chat Room Form */}
          <form onSubmit={handleSubmit} className="space-y-16">
            <p className="text-base text-w-neutral-4 mb-8">
              Design your perfect community space with customizable settings.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-w-neutral-2 mb-2">Room Type</label>
                <select
                  value={roomType}
                  onChange={e => setRoomType(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-glass-3 border border-glass-5 text-w-neutral-1"
                >
                  <option value="normal">일반 채팅방</option>
                  <option value="duo">듀오 스쿼드</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-w-neutral-2 mb-2">Room Title</label>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-glass-3 border border-glass-5 text-w-neutral-1"
                  placeholder="e.g. Cozy Corner for Gamers"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-w-neutral-2 mb-2">Purpose & Description</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-glass-3 border border-glass-5 text-w-neutral-1"
                  placeholder="Briefly describe your chat room..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-w-neutral-2 mb-2">Membership Tier</label>
                  <select
                    value={tier}
                    onChange={e => setTier(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-glass-3 border border-glass-5 text-w-neutral-1"
                  >
                    <option value="free">Free (Open to all)</option>
                    <option value="premium">Premium (Restricted)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-w-neutral-2 mb-2">Maximum Members</label>
                  <input
                    value={maxMembers}
                    onChange={e => setMaxMembers(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-glass-3 border border-glass-5 text-w-neutral-1"
                    placeholder="e.g. 50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-w-neutral-2 mb-2">Topic Tags</label>
                <div className="flex gap-3">
                  <input
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-md bg-glass-3 border border-glass-5 text-w-neutral-1"
                    placeholder="Add a tag (e.g. strategy)"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="bg-primary text-b-neutral-1 px-4 py-2 rounded-md text-sm font-semibold"
                  >
                    + Add Tag
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-w-neutral-3 rounded-full text-xs text-w-neutral-1"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={restrictAccess}
                  onChange={e => setRestrictAccess(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                Restrict Access (Only invited users can join)
              </label>

              <div className="bg-glass-5 p-6 rounded-md">
                <label className="flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  I agree to abide by the Community Guidelines
                </label>
                {!agreed && (
                  <p className="text-xs text-red-500 mt-2">
                    You must accept the guidelines to create a chat room.
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={!agreed}
                  className="bg-primary text-b-neutral-1 font-bold px-6 py-3 rounded-md disabled:opacity-40"
                >
                  Create Chat Room
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="bg-w-neutral-3 text-b-neutral-1 px-6 py-3 rounded-md font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>

          {/* Notice Section */}
          <div className="bg-glass-5 rounded-2xl p-30p text-w-neutral-1">
            <h2 className="text-3xl font-bold mb-6">Notice</h2>
            <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed">
              <li>항상 예의 바르고 친절하게 대화합니다.</li>
              <li>욕설, 혐오, 차별적인 발언은 금지됩니다.</li>
              <li>스팸 또는 무분별한 광고는 제한됩니다.</li>
              <li>개인정보 공유는 자제해주세요.</li>
              <li>운영진의 판단에 따라 경고 조치될 수 있습니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateChatRoom;

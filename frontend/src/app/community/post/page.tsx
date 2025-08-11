import PostListPage from "@components/sections/community/PostCreate";

export default function Page() {
  return (
    <main className="min-h-screen pt-[100px] bg-black">
      <div className="mx-auto max-w-5xl px-4 py-8 mb-10">
        <PostListPage />
      </div>
    </main>
  );
}

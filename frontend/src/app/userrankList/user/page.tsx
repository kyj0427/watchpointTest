// src/app/userrankList/user/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import UserComp from "@/components/sections/userrankList/user/userComp";

export default function Page() {
  const sp = useSearchParams();
  const q = sp.get("q") || undefined;
  const uid = sp.get("uid") || undefined;

  return (
    <main className="container mx-auto px-4 py-6">
      <UserComp q={q} uid={uid} />
    </main>
  );
}

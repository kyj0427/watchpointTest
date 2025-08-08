import UserRankListComp from "@/components/sections/userrankList/userrankListComp";
import UserComp from "@/components/sections/userrankList/user/userComp";

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-6">
      <UserRankListComp />
      <UserComp />
    </main>
  );
}

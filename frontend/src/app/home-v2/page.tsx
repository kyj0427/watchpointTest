import HomeBannerTwo from "@/components/sections/homeTwo/HomeBannerTwo";
import MostPlayedGames from "@/components/sections/homeTwo/MostPlayedGames";
import RecentGames from "@/components/sections/homeTwo/RecentGames";
import PopularGamesOne from "@/components/sections/PopularGamesOne";
import TopTrendingGames from "@/components/sections/TopTrendingGames";

const Page = () => {
  return (
    <main>
      <HomeBannerTwo />
      <MostPlayedGames />
      <TopTrendingGames />
      <RecentGames />
      <PopularGamesOne />
    </main>
  );
};

export default Page;

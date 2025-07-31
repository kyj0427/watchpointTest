import FeaturedVideos from "@/components/sections/homeFour/FeaturedVideos";
import HomeBannerFour from "@/components/sections/homeFour/HomeBannerFour";
import TopRatedGames from "@/components/sections/homeFour/TopRatedGames";
import UpcomingTournaments from "@/components/sections/homeFour/UpcomingTournaments";
import RecentGames from "@/components/sections/homeTwo/RecentGames";

const Page = () => {
  return (
    <main>
      <HomeBannerFour />
      <RecentGames />
      <TopRatedGames />
      <FeaturedVideos />
      <UpcomingTournaments />
    </main>
  );
};

export default Page;

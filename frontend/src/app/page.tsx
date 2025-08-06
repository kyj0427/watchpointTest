import { HomeBannerOne } from "@/components/sections";
import GameCategories from "@/components/sections/GameCategories";
import FavoritesGroups from "@/components/sections/homeOne/FavoritesGroups";
import LiveChannels from "@/components/sections/homeOne/LiveChannels";
import RecommendedHeroes from "@/components/sections/homeOne/RecommendedHeroes_hl";
import RecommendedVideos from "@/components/sections/homeOne/RecommendedVideos_hl";
import OurStore from "@/components/sections/OurStore";
import OverwatchShop from "@/components/sections/OverwatchShop_hl";


const HomePage = () => {
  return (
    <main>
      <HomeBannerOne />
      <RecommendedVideos/>
      {/* <LiveChannels /> */}
      {/* <FavoritesGroups /> */}
      <RecommendedHeroes/>
      {/* <OurStore /> */}
      <OverwatchShop/>
      {/* <GameCategories /> */}
    </main>
  );
};

export default HomePage;

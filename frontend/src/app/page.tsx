import { HomeBannerOne } from "@/components/sections";
import GameCategories from "@/components/sections/GameCategories";
import FavoritesGroups from "@/components/sections/homeOne/FavoritesGroups";
import LiveChannels from "@/components/sections/homeOne/LiveChannels";
import RecommendedHeroes from "@/components/sections/homeOne/RecommendedHeroes_hl";
import RecommendedVideos from "@/components/sections/homeOne/RecommendedVideos_hl";
import OurStore from "@/components/sections/OurStore";
import OverwatchStore from "@/components/sections/OverwatchShop_hl";
import MainSearchBar from "@/components/ui/MainSearchBar";



const HomePage = () => {
  return (
    <main>
      <HomeBannerOne />
      <MainSearchBar/>
      <RecommendedVideos/>
      {/* <LiveChannels /> */}
      {/* <FavoritesGroups /> */}
      <RecommendedHeroes/>
      {/* <OurStore /> */}
      <OverwatchStore/>
      {/* <GameCategories /> */}
    </main>
  );
};

export default HomePage;

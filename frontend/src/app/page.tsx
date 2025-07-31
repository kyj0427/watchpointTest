import { HomeBannerOne } from "@/components/sections";
import GameCategories from "@/components/sections/GameCategories";
import FavoritesGroups from "@/components/sections/homeOne/FavoritesGroups";
import LiveChannels from "@/components/sections/homeOne/LiveChannels";
import OurStore from "@/components/sections/OurStore";

const HomePage = () => {
  return (
    <main>
      <HomeBannerOne />
      <LiveChannels />
      <FavoritesGroups />
      <OurStore />
      <GameCategories />
    </main>
  );
};

export default HomePage;

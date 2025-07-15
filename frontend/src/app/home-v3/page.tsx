import HomeBannerThree from "@/components/sections/homeThree/HomeBannerThree";
import PopularLiveGames from "@/components/sections/homeThree/PopularLiveGames";
import TopRated from "@/components/sections/homeThree/TopRated";
import TwitchStreaming from "@/components/sections/homeThree/TwitchStreaming";
import PopularGamesTwo from "@/components/sections/PopularGamesTwo";

const Page = () => {
  return (
    <main>
      <HomeBannerThree />
      <PopularLiveGames />
      <PopularGamesTwo />
      <TwitchStreaming />
      <TopRated />
    </main>
  );
};

export default Page;

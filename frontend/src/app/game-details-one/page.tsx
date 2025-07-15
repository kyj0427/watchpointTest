import GameDetailsOne from "@/components/sections/GameDetailsOne/GameDetailsOne";
import GameDetailsOneHero from "@/components/sections/GameDetailsOne/GameDetailsOneHero";
import RelatedGames from "@/components/sections/RelatedGames";

const Page = () => {
  return (
    <main>
      <GameDetailsOneHero />
      <GameDetailsOne />
      <RelatedGames />
    </main>
  );
};

export default Page;

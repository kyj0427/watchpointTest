// 메인페이지 gameinfo 테스트 페이지
// 이 안에서 원하는 UI 테스트를 자유롭게 구성

import GameinfoHomeBanner from "@/components/sections/homeOne/GameinfoHomeBanner";
import { headerBannerType, NavLinkProps } from "@/config/types";

const TestTrendingPage = () => {
  return (
    <main>
      <GameinfoHomeBanner />
    </main>
  );
};

export default TestTrendingPage;
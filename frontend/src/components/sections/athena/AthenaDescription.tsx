import dva from "@public/images/game_hero/hero_portrait_bg/D_Va_heroImage_2.jpg";
import genji from "@public/images/game_hero/hero_portrait_bg/Genji_heroImage_2.jpg"
import Link from "next/link";

const AthenaDescription = () => {
    return(
        <div id="athena-description" className="max-w-screen-xl mx-auto px-4 py-20 scroll-mt-20 bg-black min-h-screen relative z-10">
            <div className="text-center mb-16 relative z-20" data-aos="zoom-in" data-aos-duration="1200" data-aos-delay="200">
                <h1 className="text-6xl font-bold text-white mb-4 relative z-30 transform transition-all duration-1000 hover:scale-110">
                    <span className="text-orange-400">Athena</span>
                </h1>
                <p className="text-xl text-gray-300 relative z-30 transform transition-all duration-1000 hover:scale-105">AI 코칭 서비스</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-40 relative z-20" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-out-cubic" data-aos-delay="300">
                {/* 이미지 영역 */}
                <div className="place-content-center flex justify-center transform transition-all duration-700 hover:scale-105">
                    <img src={dva.src} alt="Dva 이미지" className="max-w-full h-auto rounded-lg shadow-2xl" />
                </div>

                {/* 설명 영역 */}
                <div className="text-left relative z-30 transform transition-all duration-700 hover:scale-105">
                    <h2 className="text-3xl font-semibold mb-6 text-white" >Athena의 특징</h2>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        Athena는 오버워치 유저를 위한 맞춤형 AI 코칭 서비스입니다. <br/>
                        플레이 스타일을 분석하고 랭크 상승에 도움을 드립니다.
                    </p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-40 relative z-20" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-out-cubic" data-aos-delay="500">
                {/* 설명 영역 */}
                <div className="text-left relative z-30 transform transition-all duration-700 hover:scale-105">
                    <h2 className="text-3xl font-semibold mb-6 text-white">실시간 분석</h2>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        게임 플레이 영상을 업로드하면 Athena가 실시간으로 분석하여 개선점을 찾아드립니다. <br/>
                        팀워크, 포지셔닝, 스킬 활용 등 모든 측면을 종합적으로 평가합니다.
                    </p>
                </div>
                {/* 이미지 영역 */}
                <div className="place-content-center flex justify-center transform transition-all duration-700 hover:scale-105">
                    <img src={genji.src} alt="Genji 이미지" className="max-w-full h-auto rounded-lg shadow-2xl" />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-40 relative z-20" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-out-cubic" data-aos-delay="700">
                {/* 이미지 영역 */}
                <div className="place-content-center flex justify-center transform transition-all duration-700 hover:scale-105">
                    <img src={dva.src} alt="Dva 이미지" className="max-w-full h-auto rounded-lg shadow-2xl" />
                </div>

                {/* 설명 영역 */}
                <div className="text-left relative z-30 transform transition-all duration-700 hover:scale-105">
                    <h2 className="text-3xl font-semibold mb-6 text-white" >맞춤형 피드백</h2>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        개인별 플레이 스타일에 맞춘 구체적인 피드백을 제공합니다. <br/>
                        단순한 분석을 넘어서 실전에서 바로 적용할 수 있는 
                        실용적인 조언을 드립니다.
                    </p>
                </div>
            </div>

            {/* 강의 페이지로 이동하는 버튼 */}
            <div className="text-center mt-20 relative z-30 transform transition-all duration-700 hover:scale-105" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-out-cubic" data-aos-delay="900">
                <Link
                    href="/coaching"
                    className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-md shadow-lg hover:from-orange-400 hover:to-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 transition-all duration-300 transform hover:scale-105"
                >
                    강의 페이지로 이동
                    <span className="text-xl">→</span>
                </Link>
            </div>
        </div>
    )
}

export default AthenaDescription
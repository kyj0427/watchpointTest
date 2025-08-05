import dva from "@public/images/overwatch_hero_images/D_Va_heroImage_1.jpg";
import genji from "@public/images/overwatch_hero_images/Genji_heroImage_1.jpg"

const AthenaDescription = () => {
    return(
        <div id="athena-details" className="max-w-screen-xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-40">
                {/* 이미지 영역 */}
                <div className="place-content-center flex justify-center">
                    <img src={dva.src} alt="Dva 이미지" className="max-w-full h-auto" />
                </div>

                {/* 설명 영역 */}
                <div className="text-left">
                    {/* 여기에 설명 텍스트, 버튼, 기타 컴포넌트 넣으시면 됩니다 */}
                    <h2 className="text-3xl font-semibold mb-4">Athena의 특징</h2>
                    <p className="text-gray-700">
                    Athena는 오버워치 유저를 위한 맞춤형 AI 코칭 서비스입니다. 플레이 스타일을 분석하고 랭크 상승에 도움을 드립니다.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-40">
                {/* 설명 영역 */}
                <div className="text-left">
                    {/* 여기에 설명 텍스트, 버튼, 기타 컴포넌트 넣으시면 됩니다 */}
                    <h2 className="text-3xl font-semibold mb-4">Athena의 특징</h2>
                    <p className="text-gray-700">
                    Athena는 오버워치 유저를 위한 맞춤형 AI 코칭 서비스입니다. 플레이 스타일을 분석하고 랭크 상승에 도움을 드립니다.
                    </p>
                </div>
                {/* 이미지 영역 */}
                <div className="place-content-center flex justify-center">
                    <img src={genji.src} alt="Dva 이미지" className="max-w-full h-auto" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-40">
                {/* 이미지 영역 */}
                <div className="place-content-center flex justify-center">
                    <img src={dva.src} alt="Dva 이미지" className="max-w-full h-auto" />
                </div>

                {/* 설명 영역 */}
                <div className="text-left">
                    {/* 여기에 설명 텍스트, 버튼, 기타 컴포넌트 넣으시면 됩니다 */}
                    <h2 className="text-3xl font-semibold mb-4">Athena의 특징</h2>
                    <p className="text-gray-700">
                    Athena는 오버워치 유저를 위한 맞춤형 AI 코칭 서비스입니다. 플레이 스타일을 분석하고 랭크 상승에 도움을 드립니다.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AthenaDescription
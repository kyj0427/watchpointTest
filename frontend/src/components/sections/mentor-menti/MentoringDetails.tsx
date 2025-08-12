"use client";

import AccordionOne from "@/components/ui/AccordionOne";
import RatingStars from "@/components/ui/RatingStars";
import RatingStarsInput from "@/components/ui/RatingStarsInput";
import { paymentPolicy } from "@public/data/paymentPolicy";
import { mentorings } from "@public/data/mentorings";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface MentoringData {
    id: number;
    title: string;
    description: string;
    category: string[];
    image: string;
    price: number;
    rating: number;
    reviews: number;
    mentorinfo: {
        name: string;
        image: string;
        position: string;
        career: string[];
    };
}


// {
//     id: number;
//     title: string;
//     mentor: {
//         nickname: string;
//         battletag: number;
//         image: string;
//         career: string;
//     }
//     description: string;
//     curriculum: string;
//     tag: string;
//     position: string;
//     heroes: string;
// }

interface MentoringDetailsProps {
    data: MentoringData;
}

const MentoringDetails = ({ data }: MentoringDetailsProps) => {
    const mentoringDetails = mentorings[0]; // 임시 하드코딩 (향후 data prop 사용 권장)
    const [isChecked, setIsChecked] = useState(true);

    const [hasPurchased, setHasPurchased] = useState(false); //결제여부(DB연동) => setHasPurchased로

    const [reviews, setReviews] = useState<
    { author: { name: string; avatar?: string }; content: string; rating: number }[]
    >([
    { author: { name: "테스트 유저", avatar: "" }, content: "좋은 강의였습니다!", rating: 4.5 },
    ]);

    const [newReview, setNewReview] = useState("");
    const [newRating, setNewRating] = useState(5);

    const handleAddReview = () => {
    if (!newReview.trim() || newRating === 0) return; // 별점 필수

    const newReviewData = {
        author: { name: "현재 로그인 유저", avatar: "" },
        content: newReview,
        rating: newRating,
    };

    setReviews((prev) => [...prev, newReviewData]);
    setNewReview("");
    setNewRating(0);
    };

    return (
        <section className="section-pb pt-60p overflow-visible">
            <div className="container">
                <div className="grid grid-cols-12 gap-30p">
                    
                    {/* 왼쪽: 멘토링 상세 정보 */}
                    <div className="3xl:col-span-8 xxl:col-span-7 col-span-12">
                        <div>
                            {/* 이미지 영역 (글리치 효과) */}
                            <div className="glitch-effect mb-24p overflow-hidden rounded-12">
                                <div className="glitch-thumb">
                                    <Image
                                        className="w-full xl:h-[450px] md:h-[400px] sm:h-[300px] h-[280px] object-cover"
                                        src={mentoringDetails?.image}
                                        width={1080}
                                        height={480}
                                        alt="image"
                                    />
                                </div>
                                <div className="glitch-thumb">
                                    <Image
                                        className="w-full xl:h-[450px] md:h-[400px] sm:h-[300px] h-[280px] object-cover"
                                        src={mentoringDetails?.image}
                                        width={1080}
                                        height={480}
                                        alt="image"
                                    />
                                </div>
                            </div>

                            {/* 설명 영역 */}
                            <div>
                                <h3 className="heading-3 text-w-neutral-1 mb-2.5">강의 상세정보</h3>
                                <p className="text-m-regular text-w-neutral-4 mb-2.5">
                                    {/* {mentoringDetails.description} */}
                                    {/* 강의 상세정보 */}
                                </p>

                                {/* 추가 정보: 게임, 언어, 포지션 */}
                                <div className="flex items-center flex-wrap gap-y-24p gap-x-60p mt-24p">
                                    <div>
                                        <span className="text-m-medium text-primary mb-1">Game</span>
                                        <p className="text-sm text-w-neutral-4">League of Legends</p>
                                    </div>
                                    <div>
                                        <span className="text-m-medium text-primary mb-1">Languages</span>
                                        <p className="text-sm text-w-neutral-4">English, Romanian and French</p>
                                    </div>
                                    <div>
                                        <span className="text-m-medium text-primary mb-1">포지션</span>
                                        <p className="text-sm text-w-neutral-4">{mentoringDetails?.mentorinfo?.position}</p>
                                    </div>
                                </div>

                                {/* 강사 정보 */}
                                <div className="py-40p">
                                    <h4 className="heading-4 text-w-neutral-1">강사</h4>
                                    <div className="flex items-center gap-3 py-3">
                                        <Image
                                            className="avatar size-60p"
                                            src={mentoringDetails?.mentorinfo?.image}
                                            width={300}
                                            height={220}
                                            alt="user"
                                        />
                                        <div>
                                            <Link
                                                href="/profile"
                                                className="text-l-medium text-w-neutral-1 mb-1"
                                            >
                                                {mentoringDetails?.mentorinfo?.name}
                                            </Link>
                                            <span className="text-sm text-w-neutral-4">
                                                {mentoringDetails?.mentorinfo?.position}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-m-regular text-w-neutral-4">
                                        강사소개
                                    </p>
                                </div>

                                {/* FAQ 아코디언 영역 */}
                                <div className="grid grid-cols-1 border-y border-shap divide-y divide-shap">
                                    <AccordionOne faqItems={paymentPolicy} />
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* 오른쪽: 구매 박스 */}
                    <div className="3xl:col-span-4 xxl:col-span-5 col-span-12 relative">
                        <div className="xxl:sticky xxl:top-30">
                            <div className="bg-b-neutral-3 rounded-20 p-30p">
                                {/* 카테고리 뱃지 */}
                                {data.category?.map((item, index) => (
                                    <div
                                    key={index}
                                    className="badge badge-bage badge-outline-shap text-s-regular bg-b-neutral-3 mb-20p"
                                    >
                                    {item}
                                </div>
                                ))}

                                {/* 제목 및 설명 */}
                                <h4 className="heading-4 text-w-neutral-1">
                                    {mentoringDetails?.title}
                                </h4>
                                <p className="text-m-regular text-w-neutral-4 my-16p">
                                    {mentoringDetails?.description}
                                </p>

                                {/* 별점 & 리뷰 */}
                                <div className="flex-y gap-2 mb-20p">
                                    <div className="flex-y gap-1 text-primary icon-24">
                                        <i className="ti ti-star-filled"></i>
                                        <i className="ti ti-star-filled"></i>
                                        <i className="ti ti-star-filled"></i>
                                        <i className="ti ti-star-half-filled"></i>
                                    </div>
                                    <span className="text-base text-w-neutral-1">4.7 (99)</span>
                                </div>

                                {/* 가격 */}
                                <h4 className="heading-4 text-w-neutral-1 mb-24p">Price: €45.00</h4>

                                {!hasPurchased && (
                                <div className="grid xxl:grid-cols-1 xl:grid-cols-2 grid-cols-1 gap-16p *:flex-y *:max-sm:flex-wrap *:gap-24p *:border *:border-shap *:py-32p *:px-20p *:rounded-12 mb-30p">
                                    {/* 옵션 1 */}
                                    <div>
                                        <div className="checkbox-container shrink-0">
                                            <input
                                                type="checkbox"
                                                id="one-game-review"
                                                className="border-corners-checkbox"
                                            />
                                            <label
                                                htmlFor="one-game-review"
                                                className="border-corners-checkbox-label"
                                            >
                                                <i className="ti icon-32 text-primary"></i>
                                            </label>
                                        </div>
                                        <div>
                                            <h5 className="heading-5 text-w-neutral-1 mb-2.5">
                                                실시간 코칭
                                            </h5>
                                            <p className="text-base text-w-neutral-4">
                                                멘토가 세세한 부분부터 전체적인 흐름까지 실시간으로 피드백을 제공하여, 어떤 강점이 있고 어떤 실수가 있었는지, 그리고 이를 어떻게 보완할 수 있는지 알려드립니다.
                                            </p>
                                        </div>
                                        <h4 className="heading-4 text-w-neutral-1">€6.00</h4>
                                    </div>

                                {/* 결제 버튼 */}
                                <Link
                                    href="/checkout"
                                    className="btn btn-md btn-primary w-full mb-32p h-14"
                                >
                                    구매하기
                                </Link>

                                {/* 결제 안내 문구 */}
                                <div className="pt-24p border-t border-shap flex-y justify-between gap-24p">
                                    <p className="text-sm text-w-neutral-4">
                                        고객님의 안전과 Watchpoint가 잠재적인 분쟁에 도움을 드리기 위해, 반드시 플랫폼 외부에서는 결제를 하지 않으셔야 합니다.
                                    </p>
                                    <i className="ti ti-shield-check text-primary icon-32"></i>
                                </div>
                            </div>
                            )}
                            {hasPurchased && ( 
                            <div>
                                <Link
                                    href="/coachingroom"
                                    className="btn btn-md btn-primary w-full mb-32p h-14"
                                > 강의방 입장
                                </Link>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* 후기 목록 */}
                <div className="space-y-4 mt-6">
                <h3 className="text-lg font-semibold text-white">후기</h3>
                {reviews.map((review, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                    <Image
                        src={review.author.avatar || "/images/default-avatar.png"}
                        width={40}
                        height={40}
                        className="rounded-full"
                        alt="avatar"
                    />
                    <div>
                        <p className="text-sm text-w-neutral-1 font-semibold mb-2">{review.author.name}</p>
                        <RatingStars rating={review.rating} />
                        <p className="text-sm text-w-neutral-3 mt-3">{review.content}</p>
                    </div>
                    </div>
                ))}
                </div>

                {/* 후기 입력창 */}
                {hasPurchased && ( //hasPurchased로 인해 구매 시에만 보임
                <div className="relative w-1/2 mt-4 flex flex-col gap-3">
                    <RatingStarsInput rating={newRating} setRating={setNewRating} />
                    <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    className="flex h-32 bg-b-neutral-2 text-white px-6 py-2 rounded-3xl placeholder:text-w-neutral-4 outline-none mb-15"
                    placeholder="후기를 입력하세요..."
                    />
                    <button
                    onClick={handleAddReview}
                    className="btn btn-primary w-1/6 py-2 px-4 rounded-full absolute right-2 bottom-2"
                    >
                    등록
                    </button>
                </div>
                )}
            </div>
            </div>
        </section>
    );
};

export default MentoringDetails;

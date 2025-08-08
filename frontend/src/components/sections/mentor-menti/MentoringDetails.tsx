"use client";

import AccordionOne from "@/components/ui/AccordionOne";
import { faqItemsTwo } from "@public/data/faqItems";
import { mentorings } from "@public/data/mentorings";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface MentoringData {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    price: number;
    rating: number;
    reviews: number;
    author: {
        name: string;
        image: string;
        role: string;
    };
}

interface MentoringDetailsProps {
    data: MentoringData;
}

const MentoringDetails = ({ data }: MentoringDetailsProps) => {
    const mentoringDetails = mentorings[0]; // 임시 하드코딩 (향후 data prop 사용 권장)
    const [isChecked, setIsChecked] = useState(true);

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
                                        <p className="text-sm text-w-neutral-4">Vlad D2003</p>
                                    </div>
                                </div>

                                {/* 강사 정보 */}
                                <div className="py-40p">
                                    <h4 className="heading-4 text-w-neutral-1">강사</h4>
                                    <div className="flex items-center gap-3 py-3">
                                        <Image
                                            className="avatar size-60p"
                                            src={mentoringDetails?.author?.image}
                                            width={300}
                                            height={220}
                                            alt="user"
                                        />
                                        <div>
                                            <Link
                                                href="/profile"
                                                className="text-l-medium text-w-neutral-1 mb-1"
                                            >
                                                {mentoringDetails?.author?.name}
                                            </Link>
                                            <span className="text-sm text-w-neutral-4">
                                                {mentoringDetails?.author?.role}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-m-regular text-w-neutral-4">
                                        강사소개
                                    </p>
                                </div>

                                {/* FAQ 아코디언 영역 */}
                                <div className="grid grid-cols-1 border-y border-shap divide-y divide-shap">
                                    <AccordionOne faqItems={faqItemsTwo} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 오른쪽: 구매 박스 */}
                    <div className="3xl:col-span-4 xxl:col-span-5 col-span-12 relative">
                        <div className="xxl:sticky xxl:top-30">
                            <div className="bg-b-neutral-3 rounded-20 p-30p">
                                {/* 카테고리 뱃지 */}
                                <span className="badge badge-bage badge-outline-shap text-s-regular bg-b-neutral-3 mb-16p">
                                    Graphics & Design
                                </span>

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

                                {/* 옵션 선택 체크박스 */}
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
                                                One game review
                                            </h5>
                                            <p className="text-base text-w-neutral-4">
                                                I will analyze in details one game of your choice, tell
                                                you what you should work on and what you could do
                                                better.
                                            </p>
                                        </div>
                                        <h4 className="heading-4 text-w-neutral-1">€6.00</h4>
                                    </div>

                                    {/* 옵션 2 */}
                                    <div>
                                        <div className="checkbox-container shrink-0">
                                            <input
                                                type="checkbox"
                                                id="live-coaching"
                                                className="border-corners-checkbox"
                                                checked={isChecked}
                                                onChange={(e) => setIsChecked(e.target.checked)}
                                            />
                                            <label
                                                htmlFor="live-coaching"
                                                className="border-corners-checkbox-label"
                                            >
                                                <i className="ti icon-32 text-secondary"></i>
                                            </label>
                                        </div>
                                        <div>
                                            <h5 className="heading-5 text-w-neutral-1 mb-2.5">
                                                Live coaching
                                            </h5>
                                            <p className="text-base text-w-neutral-4">
                                                We will do live coaching, I will explain in details what
                                                could you do better, what are your mistakes and how to
                                                work on it. We will work on your micro gameplay, macro
                                                gameplay
                                            </p>
                                        </div>
                                        <h4 className="heading-4 text-w-neutral-1">€6.00</h4>
                                    </div>
                                </div>

                                {/* 결제 버튼 */}
                                <Link
                                    href="/checkout"
                                    className="btn btn-md btn-primary w-full mb-32p"
                                >
                                    Buy
                                </Link>

                                {/* 결제 안내 문구 */}
                                <div className="pt-24p border-t border-shap flex-y justify-between gap-24p">
                                    <p className="text-sm text-w-neutral-4">
                                        For your own protection and for Challengermode to assist in
                                        any potential disputes, it&lsquo;s important that you never
                                        make any payments outside of the platform.
                                    </p>
                                    <i className="ti ti-shield-check text-primary icon-32"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MentoringDetails;

"use client"

import AccordionOne from "@/components/ui/AccordionOne";
import { faqItemsTwo } from "@public/data/faqItems";
import { mentors } from "@public/data/mentors";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface MentorData {
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

interface MentorDetailsProps {
    data: MentorData;
}


const MentorDetails = ({ data }: MentorDetailsProps) => {
    const mentorDetails = mentors[0];
    const [isChecked, setIsChecked] = useState(true);

    return (
        <section className="section-pb pt-60p overflow-visible">
        <div className="container">
            <div className="grid grid-cols-12 gap-30p">
            <div className="3xl:col-span-8 xxl:col-span-7 col-span-12">
                <div>
                <div className="glitch-effect mb-24p overflow-hidden rounded-12">
                    <div className="glitch-thumb">
                    <Image
                        className="w-full xl:h-[450px] md:h-[400px] sm:h-[300px] h-[280px] object-cover"
                        src={mentorDetails?.image}
                        width={1080}
                        height={480}
                        alt="image"
                    />
                    </div>
                    <div className="glitch-thumb">
                    <Image
                        className="w-full xl:h-[450px] md:h-[400px] sm:h-[300px] h-[280px] object-cover"
                        src={mentorDetails?.image}
                        width={1080}
                        height={480}
                        alt="image"
                    />
                    </div>
                </div>
                <div>
                    <h3 className="heading-3 text-w-neutral-1 mb-2.5">
                    Description
                    </h3>
                    <p className="text-m-regular text-w-neutral-4 mb-2.5">
                        {mentorDetails.description}
                    </p>
                    <div className="flex items-center flex-wrap gap-y-24p gap-x-60p mt-24p">
                    <div>
                        <span className="text-m-medium text-primary mb-1">
                        티어
                        </span>
                        <p className="text-sm text-w-neutral-4">
                        티어
                        </p>
                    </div>
                    <div>
                        <span className="text-m-medium text-primary mb-1">
                        포지션
                        </span>
                        <p className="text-sm text-w-neutral-4">
                        포지션
                        </p>
                    </div>
                    <div>
                        <span className="text-m-medium text-primary mb-1">ADC</span>
                        <p className="text-sm text-w-neutral-4">Vlad D2003</p>
                    </div>
                    </div>
                    <div className="py-40p">
                    <h4 className="heading-4 text-w-neutral-1">강사정보</h4>
                    <div className="flex items-center gap-3 py-3">
                        <Image
                        className="avatar size-60p"
                        src={mentorDetails?.author?.image}
                        width={300}
                        height={220}
                        alt="user"
                        />
                        <div>
                        <Link
                            href="/profile"
                            className="text-l-medium text-w-neutral-1 mb-1"
                        >
                            {mentorDetails?.author?.name}
                        </Link>
                        <span className="text-sm text-w-neutral-4">
                            {mentorDetails?.author?.role}
                        </span>
                        </div>
                    </div>
                    <p className="text-m-regular text-w-neutral-4">
                        Been playing TFT since set 1, usually hitting Grandmaster
                        every set
                    </p>
                    </div>
                    <div className="grid grid-cols-1 border-y border-shap divide-y divide-shap">
                    <AccordionOne faqItems={faqItemsTwo} />
                    </div>
                </div>
                </div>
            </div>
            <div className="3xl:col-span-4 xxl:col-span-5 col-span-12 relative">
                <div className="xxl:sticky xxl:top-30">
                <div className="bg-b-neutral-3 rounded-20 p-30p">
                    <span className="badge badge-bage badge-outline-shap text-s-regular bg-b-neutral-3 mb-16p">
                    Graphics & Design
                    </span>
                    <h4 className="heading-4 text-w-neutral-1">
                    ADC coaching - improve your ADC gameplay & climb in soloQ!
                    </h4>
                    <p className="text-m-regular text-w-neutral-4 my-16p">
                    ADC coaching - improve your ADC gameplay & climb in soloQ! Fix
                    your mistakes and become ADC monster and climb the ladder!
                    </p>
                    <div className="flex-y gap-2 mb-20p">
                    <div className="flex-y gap-1 text-primary icon-24">
                        <i className="ti ti-star-filled"></i>
                        <i className="ti ti-star-filled"></i>
                        <i className="ti ti-star-filled"></i>
                        <i className="ti ti-star-half-filled"></i>
                    </div>
                    <span className="text-base text-w-neutral-1">4.7 (99)</span>
                    </div>
                    <div className="grid xxl:grid-cols-1 xl:grid-cols-2 grid-cols-1 gap-16p *:flex-y *:max-sm:flex-wrap *:gap-24p *:border *:border-shap *:py-32p *:px-20p *:rounded-12 mb-30p">
                    {/* 멘토 커리어 */}
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
};

export default MentorDetails;

import CoachingBreadcrumb from "@/components/sections/mentor-menti/CoachingBreadcumb";
import MentorDetails from "@/components/sections/mentor-menti/MentorDetails";
import MentoringDetails from "@/components/sections/mentor-menti/MentoringDetails";
import { headerBannerType, NavLinkProps } from "@/config/types";
import { mentorings } from "@public/data/mentorings";
import { mentors } from "@public/data/mentors";

interface PageProps {
    params: { type: string; id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

// Generate static paths
const allowedTypes = ["mentor", "mentoring"];

export async function generateStaticParams() {
    return allowedTypes.flatMap((type) => {
        const dataList =
        type === "mentor"
            ? mentors
            : type === "mentoring"
            ? mentorings
            : [];

        return dataList.map((item) => ({
        type,
        id: item.id.toString(),
        }));
    });
}

const Details = async ({ params }: PageProps) => {
    const { type, id } = params;

    const labelMap: Record<string, string> = {
        mentoring: "멘토링 목록",
        mentor: "멘토 목록",
    };

    const title = labelMap[type] || "";

    const navLinks: NavLinkProps[] = [
        { id: 1, url: "/coaching", label: "강의" },
        { id: 2, url: "", label: "멘토/멘티 찾기" },
        { id: 3, url: `/coaching/mentoring-lists/${type}`, label: title },
        { id: 4, url: `/coaching/mentoring-lists/${type}/${id}`, label: title },
    ];

    const headerData: headerBannerType = {
        title: "상세보기",
        bgImgClasses: "",
        navLinks,
    };

    return (
        <main>
            <CoachingBreadcrumb breadcrumb={headerData} />

            {type === "mentoring" ? (
                (() => {
                    const singleItem = mentorings.find((item) => item.id.toString() === id);
                    return singleItem ? (
                        <MentoringDetails data={singleItem} />
                    ) : (
                        <p className="text-base text-w-neutral-1 mt-32p">해당 항목을 찾을 수 없습니다.</p>
                    );
                })()
            ) : (
                (() => {
                    const singleItem = mentors.find((item) => item.id.toString() === id);
                    return singleItem ? (
                        <MentorDetails data={singleItem} type={type} />
                    ) : (
                        <p className="text-base text-w-neutral-1 mt-32p">해당 항목을 찾을 수 없습니다.</p>
                    );
                })()
            )}
        </main>
    );
};

export default Details
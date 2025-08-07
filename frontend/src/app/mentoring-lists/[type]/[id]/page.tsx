import MentoringDetails from "@/components/sections/mentor-menti/MentoringDetails";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";
import { mentorings } from "@public/data/mentorings";
import { mentors } from "@public/data/mentors";

interface PageProps {
    params: { type: string; id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

const Details = async ({ params }: PageProps) => {
    const { type, id } = params;

    const labelMap: Record<string, string> = {
        mentoring: "멘토링 목록",
        mentor: "멘토 목록",
    };

    const title = labelMap[type] || "";

    const navLinks: NavLinkProps[] = [
        { id: 1, url: "/", label: "Home" },
        { id: 2, url: "", label: "멘토/멘티 찾기" },
        { id: 3, url: `/mentoring-lists/${type}`, label: title },
        { id: 4, url: `/mentoring-lists/${type}/${id}`, label: title },
    ];

    const headerData: headerBannerType = {
        title: "Marketplace Details",
        bgImgClasses: "",
        navLinks,
    };

    const dataList = type === "mentoring" ? mentorings : mentors;
    const singleItem = dataList.find((item) => item.id.toString() === id);

    return (
        <main>
        <Breadcrumb breadcrumb={headerData} />
        {singleItem ? (
            type === "mentoring" ? (
            <MentoringDetails data={singleItem} />
            ) : (
            <MentorDetails data={singleItem} />
            )
        ) : (
            <p className="text-base text-w-neutral-1 mt-32p">
            해당 항목을 찾을 수 없습니다.
            </p>
        )}
        </main>
    );
};

export default Details;
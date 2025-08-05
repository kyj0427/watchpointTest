import { GetServerSideProps } from "next";
import Mentors from "@/components/sections/mentor-menti/Mentors";
import Mentoring from "@/components/sections/mentor-menti/Mentoring";

type Props = {
    type: string;
    data: any; // 실제 타입으로 바꾸기
};

const PostPage = ({ type, data }: Props) => {
    return (
        <div>
        {type === "mentors" && <Mentors data={data} />}
        {type === "mentoring" && <Mentoring data={data} />}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const type = context.params?.type as string;

    let data = null;

    if (type === "mentors") {
        data = await fetchMentorsFromDB();
    } else if (type === "mentoring") {
        data = await fetchMentoringFromDB();
    }

    return {
        props: {
        type,
        data,
        },
    };
};

export default PostPage;

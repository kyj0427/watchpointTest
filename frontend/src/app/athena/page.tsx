import AthenaDescription from "@/components/sections/athena/AthenaDescription";
import AthenaMain from "@/components/sections/athena/AthenaMain";
import { NavLinkProps } from "@/config/types";

const Page = () => {


    return (
        <main className="min-h-screen bg-black">
            <AthenaMain/>
            <AthenaDescription/>
        </main>
    );
};

export default Page;

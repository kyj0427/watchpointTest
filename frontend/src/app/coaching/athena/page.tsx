import AthenaDescription from "@/components/sections/athena/AthenaDescription";
import AthenaMain from "@/components/sections/athena/AthenaMain";
import { NavLinkProps } from "@/config/types";

const Page = () => {
    const navLinks: NavLinkProps[] = [
        { id: 1, url: "/", label: "Home" },
        { id: 2, url: "", label: "coaching" },
        { id: 3, url: "", label: "Athena"}
    ];

    return (
        <main className="min-h-screen bg-black">
            <AthenaMain/>
            <AthenaDescription/>
        </main>
    );
};

export default Page;

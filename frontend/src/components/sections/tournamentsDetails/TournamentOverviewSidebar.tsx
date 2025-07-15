"use client";

import Link from "next/link";
import user1 from "@public/images/users/user8.png";
import user2 from "@public/images/users/user9.png";
import { Menu } from "@headlessui/react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitch,
  IconBrandYoutube,
} from "@tabler/icons-react";

interface FormValues {
  search: string;
}

const admins = [
  {
    id: "1",
    name: "David Smith",
    role: "Leader",
    image: user1,
    profileLink: "/profile",
  },
  {
    id: "2",
    name: "Jon Smith",
    role: "Leader",
    image: user2,
    profileLink: "/profile",
  },
];

const TournamentOverviewSidebar = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  // Handle form submission
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Data:", data); // Data logged to the console
    // You can perform additional logic here like API calls or state updates
  };

  return (
    <div className="xl:sticky xl:top-30">
      <div className="grid grid-cols-1 gap-y-30p *:bg-b-neutral-3 *:p-32p *:rounded-12">
        <div className="flex-y flex-wrap justify-between gap-20p">
          <div>
            <span className="text-sm text-w-neutral-4 mb-2">Organized by</span>
            <h4 className="heading-4 text-white">GameCO</h4>
          </div>
          <div className="flex items-center gap-3">
            <Link href="#" className="btn-socal-primary">
              <IconBrandFacebook />
            </Link>
            <Link href="#" className="btn-socal-primary">
              <IconBrandTwitch />
            </Link>
            <Link href="#" className="btn-socal-primary">
              <IconBrandInstagram />
            </Link>
            <Link href="#" className="btn-socal-primary">
              <IconBrandDiscord />
            </Link>
            <Link href="#" className="btn-socal-primary">
              <IconBrandYoutube />
            </Link>
          </div>
        </div>
        <div>
          <div className="flex-y gap-3">
            <span className="icon-24 text-primary">
              <i className="ti ti-bolt-filled"></i>
            </span>
            <h5 className="heading-5 text-w-neutral-1">Boost The Prize Pool</h5>
          </div>
          <p className="text-s-regular text-w-neutral-3 py-16p">
            Boost and increase the prize pool by any amount. The boosted prize
            pool can only be the highest ranking booster.
          </p>
          <Link
            href="#"
            className="text-s-medium hover:underline text-primary mb-24p"
          >
            Leam More
          </Link>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-b-neutral-2 p-3 rounded-12 flex items-center justify-between sm:gap-3 gap-2"
          >
            <input
              autoComplete="off"
              className="bg-transparent text-w-neutral-1 placeholder:text-w-neutral-1 placeholder:text-xs w-full"
              type="text"
              id="search"
              placeholder="Enter Amount"
              {...register("search", { required: "This field is required" })}
            />
            <button
              type="submit"
              className="btn btn-md btn-primary rounded-12 text-xs font-medium shrink-0"
            >
              BOOST NOW
            </button>
          </form>
        </div>
        <div>
          <h5 className="heading-5 text-w-neutral-1 mb-24p">Admins (02)</h5>
          <div className="grid grid-cols-1 gap-y-20p">
            {admins?.map((user, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center gap-3"
              >
                <div className="flex items-center gap-3">
                  <Image
                    className="avatar size-60p"
                    src={user.image}
                    alt={`${user.name}`}
                    width={60}
                    height={60}
                  />
                  <div>
                    <Link
                      href={`/profile/${user.id}`}
                      className="text-l-medium text-w-neutral-1 link-1 mb-1 line-clamp-1"
                    >
                      {user.name}
                    </Link>
                    <span className="text-s-medium text-w-neutral-3">
                      {user.role}
                    </span>
                  </div>
                </div>
                <Menu as="div" className="dropdown">
                  <Menu.Button className="dropdown-toggle w-fit">
                    <i className="ti ti-dots icon-24"></i>
                  </Menu.Button>
                  <Menu.Items className="dropdown-content">
                    <Menu.Item as="button" className="dropdown-item">
                      <Link href={`/profile/${user.id}`}>Profile</Link>
                    </Menu.Item>
                    <Menu.Item as="button" className="dropdown-item">
                      Report
                    </Menu.Item>
                    <Menu.Item as="button" className="dropdown-item">
                      Block
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentOverviewSidebar;

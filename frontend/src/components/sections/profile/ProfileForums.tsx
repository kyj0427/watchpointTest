import Image from "next/image";
import Link from "next/link";

import user20 from "@public/images/users/user20.png";
import user21 from "@public/images/users/user21.png";
import user2 from "@public/images/users/user2.png";
import user22 from "@public/images/users/user22.png";
import user23 from "@public/images/users/user23.png";
import user24 from "@public/images/users/user24.png";
import user25 from "@public/images/users/user25.png";
import user26 from "@public/images/users/user26.png";
import { IconCircleCheckFilled } from "@tabler/icons-react";

const ProfileForums = () => {
  const forums = [
    {
      id: 1,
      title: "The Best Cardio Workouts in Crossfit",
      author: {
        id: 1,
        name: "Guy Hawkins",
        avatar: user20,
      },
      created_at: "7 months ago",
      leader: {
        id: 2,
        name: "David Malan",
        avatar: user21,
      },
    },
    {
      id: 2,
      title: "The Best Cardio Workouts in Crossfit",
      author: {
        id: 3,
        name: "Jacob Jones",
        avatar: user2,
      },
      created_at: "7 months ago",
      leader: {
        id: 4,
        name: "David Malan",
        avatar: user22,
      },
    },
    {
      id: 3,
      title: "The Best Cardio Workouts in Crossfit",
      author: {
        id: 5,
        name: "Guy Hawkins",
        avatar: user23,
      },
      created_at: "7 months ago",
      leader: {
        id: 6,
        name: "David Smith",
        avatar: user24,
      },
    },
    {
      id: 4,
      title: "The Best Cardio Workouts in Crossfit",
      author: {
        id: 7,
        name: "Robert Fox",
        avatar: user25,
      },
      created_at: "7 months ago",
      leader: {
        id: 8,
        name: "Rokon Khan",
        avatar: user26,
      },
    },
  ];

  return (
    <section className="section-pb pt-60p overflow-visible">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="3xl:col-start-2 3xl:col-end-12 col-span-12">
            <div className="py-40p 3xl:px-80p px-40p bg-b-neutral-3 rounded-12 overflow-auto scrollbar-sm">
              <div className="grid grid-cols-1 divide-y divide-shap">
                {forums.map((forum) => (
                  <div
                    key={forum.id}
                    className="flex items-center justify-between gap-x-60p py-32p pt-24p"
                  >
                    <div>
                      <p className="text-xl-medium mb-16p whitespace-nowrap">
                        {forum.title}
                      </p>
                      <div className="flex-y gap-3 min-w-[240px]">
                        <Image
                          className="shrink-0 avatar size-60p"
                          src={forum.author.avatar}
                          alt={forum.author.name}
                        />
                        <div className="flex-y gap-3.5">
                          <Link
                            href="/profile"
                            className="text-l-medium whitespace-nowrap line-clamp-1 link-1"
                          >
                            {forum.author.name}
                          </Link>
                          <IconCircleCheckFilled
                            size={24}
                            className="text-secondary"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between 3xl:gap-x-[128px] gap-x-60p">
                      <span className="text-l-medium">01</span>
                      <span className="text-l-medium">02</span>
                      <div>
                        <p className="text-l-medium whitespace-nowrap mb-16p">
                          {forum.created_at}
                        </p>
                        <div className="flex-y gap-3 min-w-[240px]">
                          <Image
                            className="shrink-0 avatar size-60p"
                            src={forum.leader.avatar}
                            alt={forum.leader.name}
                          />
                          <div>
                            <div className="flex-y gap-3.5">
                              <Link
                                href="/profile"
                                className="text-l-medium whitespace-nowrap line-clamp-1 link-1"
                              >
                                {forum.leader.name}
                              </Link>
                              <IconCircleCheckFilled
                                size={24}
                                className="text-secondary"
                              />
                            </div>
                            <span className="text-s-medium text-w-neutral-3">
                              Leader
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileForums;

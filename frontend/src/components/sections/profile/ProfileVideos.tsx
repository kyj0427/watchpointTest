"use client";

import VideoPlayer from "@/lib/plyr/VideoPlayer";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IconDots } from "@tabler/icons-react";
import Link from "next/link";
import thumbnail1 from "@public/images/videothumbnails/thumbnail1.png";
import thumbnail2 from "@public/images/videothumbnails/thumbnail2.png";
import thumbnail3 from "@public/images/videothumbnails/thumbnail3.png";

const ProfileVideos = () => {
  const profileVideos = [
    {
      id: "1",
      videoUrl: "https://www.youtube.com/embed/mUxzKVrSAjs",
      thumbnail: thumbnail1,
    },
    {
      id: "2",
      videoUrl: "https://www.youtube.com/embed/mUxzKVrSAjs",
      thumbnail: thumbnail2,
    },
    {
      id: "3",
      videoUrl: "https://www.youtube.com/embed/mUxzKVrSAjs",
      thumbnail: thumbnail3,
    },
  ];

  return (
    <section className="section-pb pt-60p">
      <div className="container">
        <div className="grid grid-cols-12 gap-30p">
          <div className="4xl:col-start-2 4xl:col-end-12 col-span-12 xl:p-[55px] p-48p bg-b-neutral-3 rounded-12">
            <div className="flex items-center gap-24p justify-between mb-20p">
              <h3 className="heading-3 text-w-neutral-1">Video 03</h3>

              <Menu as="div" className="dropdown shrink-0 z-20">
                <MenuButton className="dropdown-toggle text-w-neutral-4">
                  <IconDots size={32} />
                </MenuButton>
                <MenuItems className="dropdown-content">
                  <Link href="/user-settings" className="dropdown-item">
                    Recent Post
                  </Link>
                  <MenuItem as="button" className="dropdown-item">
                    Old Post
                  </MenuItem>
                  <MenuItem as="button" className="dropdown-item">
                    A - Z
                  </MenuItem>
                  <MenuItem as="button" className="dropdown-item">
                    Z - A
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
            <div className="grid xxl+:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-20p mt-20p">
              {profileVideos?.map((video, idx) => (
                <div
                  key={idx}
                  className="*:w-full *:h-[250px] rounded-12 overflow-hidden"
                  data-aos="fade-up"
                >
                  <VideoPlayer
                    posterSrc={video.thumbnail}
                    videoSrc={video.videoUrl}
                  />
                </div>
              ))}
            </div>

            <div className="flex-c mt-40p">
              <Link href="#" className="btn btn-xl py-3 btn-primary rounded-12">
                Load More...
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileVideos;

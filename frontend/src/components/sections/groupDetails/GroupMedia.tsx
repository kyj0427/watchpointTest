"use client";

import VideoPlayer from "@/lib/plyr/VideoPlayer";
import { groupMediaData, mediasCategories } from "@public/data/groupMediaData";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";

export type MediaItem = {
  id: string;
  title: string;
  thumbnail: StaticImageData;
  videoUrl?: string;
  category: "albums" | "photos" | "videos";
};

const GroupMedia = () => {
  const [selectedCategory, setSelectedCategory] = useState(mediasCategories[0]);

  const filteredMedia =
    selectedCategory.name === "all"
      ? groupMediaData
      : groupMediaData.filter(
          (item) => item.category === selectedCategory.name
        );

  return (
    <div>
      <div className="flex items-center max-sm:justify-center flex-wrap gap-x-20p text-base bg-b-neutral-3 rounded-12 p-40p *:px-3 *:py-2 *:rounded-4">
        {mediasCategories.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(item)}
            className={`${
              selectedCategory.name === item.name
                ? "bg-b-neutral-2 text-w-neutral-1"
                : "text-w-neutral-4"
            } flex items-start gap-2`}
          >
            {item.name}
            <span className="counter-badge">{item.quantity}</span>
          </button>
        ))}
      </div>

      <div className="bg-b-neutral-3 rounded-12 p-40p mt-30p">
        <div className="flex-y justify-between flex-wrap gap-24p mb-40p">
          <h4 className="heading-4 text-w-neutral-1">Media Gallery</h4>
          <form className="flex items-center px-16p py-1 pr-1 bg-[rgba(242,150,32,0.10)] rounded-full">
            <input
              className="placeholder:text-w-neutral-1 bg-transparent"
              type="text"
              name="search-all-media"
              placeholder="Search Media"
              id="search-all-media"
            />
            <button
              type="submit"
              className="btn-c btn-c-lg bg-primary text-b-neutral-4"
            >
              <i className="ti ti-search"></i>
            </button>
          </form>
        </div>

        <div className="grid md:grid-cols-2 gap-30p">
          {filteredMedia.length > 0 ? (
            filteredMedia.map((item, idx) => (
              <div key={idx}>
                {item.videoUrl ? (
                  <VideoPlayer
                    key={idx}
                    posterSrc={item.thumbnail}
                    videoSrc={item.videoUrl}
                    videoTitle=""
                  />
                ) : (
                  <div className="overflow-hidden rounded-12">
                    <Image
                      className="w-full h-[286px] hover:scale-110 object-cover transition-1"
                      src={item.thumbnail}
                      alt="img"
                      width={600}
                      height={286}
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-l-medium text-w-neutral-1">
              Sorry! There’s no media found for the request.
            </p>
          )}
        </div>

        <div className="flex-c mt-40p">
          <Link href="#" className="btn btn-md py-3 btn-primary rounded-12">
            Load More...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GroupMedia;

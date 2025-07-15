import Image from "next/image";
import Link from "next/link";
import blog9 from "@public/images/blogs/blog9.png";
import { IconHeart, IconMessage } from "@tabler/icons-react";

const LatestNews = () => {
  const latestNews = {
    id: "8",
    category: "Indie",
    date: "October 4, 2024",
    title: "Indie Games You Shouldn’t Miss in 2024",
    image: blog9,
    likes: 30,
    comments: 22,
    share: 18,
    description:
      "A curated list of the best indie games releasing in 2024 that you must try.",
  };

  return (
    <div className="bg-b-neutral-3 rounded-12 px-32p py-24p">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-24p">
        <h4 className="heading-4 text-w-neutral-1 ">Latest News</h4>
        <Link
          href="/blogs"
          className="inline-flex items-center gap-3 text-w-neutral-1 link-1"
        >
          View All
          <i className="ti ti-arrow-right"></i>
        </Link>
      </div>
      <div className="group">
        <div className="overflow-hidden rounded-12">
          <Image
            className="w-full h-[202px] object-cover group-hover:scale-110 transition-1"
            src={latestNews?.image}
            width={1920}
            height={202}
            alt="img"
          />
        </div>
        <div className="flex-y justify-between flex-wrap gap-20px py-3">
          <div className="flex-y gap-3">
            <div className="flex-y gap-1">
              <IconHeart size={24} className="text-danger" />
              <span className="text-sm text-w-neutral-1">
                {latestNews?.likes?.toLocaleString()}
              </span>
            </div>
            <div className="flex-y gap-1">
              <IconMessage size={20} className="text-primary" />
              <span className="text-sm text-w-neutral-1">
                {" "}
                {latestNews?.likes?.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex-y gap-1">
            <i className="ti ti-share-3 icon-20 text-w-neutral-4"></i>
            <span> {latestNews?.share?.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex-y flex-wrap gap-3 mb-1">
          <span className="text-m-medium text-w-neutral-1">Collections</span>
          <p className="text-sm text-w-neutral-2">
            {" "}
            {latestNews?.date?.toLocaleString()}
          </p>
        </div>
        <Link
          href="/blog-details"
          className="heading-5 text-w-neutral-1 line-clamp-2 link-1"
        >
          {latestNews?.title}
        </Link>
      </div>
    </div>
  );
};

export default LatestNews;

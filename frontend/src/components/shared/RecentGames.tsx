import { games } from "@public/data/games";
import Image from "next/image";
import Link from "next/link";

const RecentGames = () => {
  return (
    <div>
      <h4 className="heading-4 text-w-neutral-1 mb-20p">Recent Games</h4>
      <div className="grid grid-cols-1 gap-20p">
        {games?.slice(8, 12)?.map((item, idx) => (
          <div key={idx} className="flex-y gap-3">
            <Image
              width={112}
              height={90}
              className="w-28 h-[90px]"
              src={item?.photo}
              alt="image"
            />
            <div>
              <div className="flex items-center gap-3">
                <Image
                  className="avatar size-8 mb-1"
                  src={item?.author?.avatar}
                  alt="user"
                />
                <Link
                  href="/games/1"
                  className="text-m-medium text-w-neutral-4 mb-1"
                >
                  {item?.author?.name}
                </Link>
              </div>
              <Link
                href="/blog-details"
                className="heading-5 text-w-neutral-1 block"
              >
                {item?.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentGames;

import Image from "next/image";
import Link from "next/link";



const HeroAside = () => {
  return (
    <aside className="xxl:sticky xxl:top-30">
      <div className="grid grid-cols-1 gap-30p *:bg-b-neutral-3 *:rounded-12 *:py-32p *:px-40p xxl:max-h-screen xxl:overflow-y-auto scrollbar-sm">
        {/* Friends Section */}
        <div>
          <div className="flex items-center justify-between gap-24p">
            <div>
              <h3 className="heading-3 text-w-neutral-1 mb-1">Heroes</h3>
              <span>{friends.length}</span>
            </div>
            <Link
              href="#"
              className="text-medium text-w-neutral-1 hover:text-primary"
            >
              See All
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-x-20p gap-y-30p my-20p">
            {friends.map((friend) => (
              <div key={friend.id}>
                <Image
                  className="w-full sm:h-[136px] h-24 object-cover aspect-square rounded-12 mb-3"
                  src={friend.image}
                  alt={friend.name}
                  width={128}
                  height={128}
                />
                <Link
                  href="/profile"
                  className="text-m-semi-bold text-w-neutral-1 link-1 line-clamp-1"
                >
                  {friend.name}
                </Link>
              </div>
            ))}
          </div>
          <Link href="#" className="btn btn-md btn-neutral-2 rounded-12 w-full">
            See All
          </Link>
        </div>
        
      </div>
    </aside>
  );
};

export default HeroAside;

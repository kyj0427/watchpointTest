import Image from "next/image";
import Link from "next/link";
import savedBanner from "@public/images/saved/savedBanner.png";
import savedOne1 from "@public/images/photos/saved1.1.png";
import savedOne2 from "@public/images/photos/saved1.2.png";
import avatar3 from "@public/images/users/avatar3.png";
import ActiveMembers from "@/components/shared/ActiveMembers";
import RecentGames from "@/components/shared/RecentGames";
import CategoriesCard from "@/components/shared/CategoriesCard";
import TagsCard from "@/components/shared/TagsCard";
import { categoriesType, tagType } from "@/config/types";
import LeaveReplayForm from "@/components/shared/LeaveReplayForm";
import SearchCard from "@/components/shared/SearchCard";
import VideoPlayer from "@/lib/plyr/VideoPlayer";
import {
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitch,
  IconBrandYoutube,
  IconHeart,
  IconMessage,
} from "@tabler/icons-react";

const GameDetailsTwo = () => {
  const tags: tagType[] = [
    {
      id: 1,
      name: "E- Sports",
      url: "#",
    },
    {
      id: 2,
      name: "Fantasy",
      url: "#",
    },
    {
      id: 3,
      name: "Matches",
      url: "#",
    },
    {
      id: 4,
      name: "Streamers",
      url: "#",
    },
    {
      id: 5,
      name: "Landing",
      url: "#",
    },
  ];

  const categories: categoriesType[] = [
    {
      id: "1",
      categoryName: "Gaming",
    },
    {
      id: "2",
      categoryName: "Live",
    },
    {
      id: "3",
      categoryName: "Electronic",
    },
    {
      id: "4",
      categoryName: "Online",
    },
    {
      id: "5",
      categoryName: "Contraoller",
    },
  ];

  const saveVideoURl = "https://www.youtube.com/embed/mUxzKVrSAjs";

  return (
    <section className="section-pb pt-60p relative overflow-visible">
      <div className="container">
        <div className="grid grid-cols-12 gap-x-30p gap-y-10">
          <div className="4xl:col-span-9 xxl:col-span-8 xl:col-span-7 col-span-12">
            <div>
              <div className="glitch-effect rounded-24 overflow-hidden">
                <div className="glitch-thumb">
                  <Image
                    className="w-full xxl:h-[510px] lg:h-[440px] md:h-[400px] sm:h-[320px] h-[300px] object-cover"
                    src={savedBanner}
                    width={1230}
                    height={510}
                    alt="image"
                  />
                </div>
                <div className="glitch-thumb">
                  <Image
                    className="w-full xxl:h-[510px] lg:h-[440px] md:h-[400px] sm:h-[320px] h-[300px] object-cover"
                    src={savedBanner}
                    width={1230}
                    height={510}
                    alt="image"
                  />
                </div>
              </div>
              <div className="flex-y flex-wrap gap-24p justify-between py-20p text-base text-w-neutral-1">
                <div className="flex-y gap-32p shrink-0 *:flex-y *:gap-2">
                  <span>
                    <IconHeart size={24} className="text-w-neutral-4" />
                    like
                  </span>
                  <span>
                    <IconMessage size={24} className="text-w-neutral-4" />
                    Comment
                  </span>
                </div>
                <Link href="#" className="flex-y gap-2">
                  <i className="ti ti-share-3 icon-24 text-w-neutral-4"></i>
                  Share
                </Link>
              </div>
              <h2 className="heading-2 text-w-neutral-1 mb-3">
                Pros and Cons of Minimal Navigation In Web Design
              </h2>
              <p className="text-m-regular text-w-neutral-4 mb-3">
                Contrary to common misconceptions, gaming offers numerous to
                benefits beyond mere entertainment. Studies have shown that
                gaming can enhance cognitive skills, improve problem-solving
                abilities, how and foster strategic thinking. Additionally,
                online multiplayer games provide opGportunities for social
                interaction, teamwork, and cooperation, promoting valuable
                skills in communication and collaboration.
              </p>
              <p className="text-m-regular text-w-neutral-4 mb-40p">
                From action-packed shooters to immersive role-playing games
                (RPGs) and strategy-based simulations, the gaming industry
                boasts an array of genres that cater to every player&lsquo;s
                preferences. Our vision is to create a welcoming, inclusive, and
                supportive environment where gamers of all backgrounds and skill
                levels can come together. We believe in the power of gaming to
                foster camaraderie, creativity, and personal growth. Whether
                you&lsquo;re a solo player, a competitive gamer, a streamer, or
                a game developer, you have a place here.
              </p>
              <div className="bg-b-neutral-3 rounded-12 py-32p px-40p mb-24p overflow-hidden">
                <p className="text-xl-medium text-w-neutral-1">
                  We invite you to become a part of our gaming community. Share
                  your stories, insights, and experiences. Engage with others
                  who are as passionate about gaming as you are. Together,
                  we&lsquo;ll continue to explore the boundless worlds of
                  virtual adventures and make lasting memories.
                </p>
              </div>
              <div className="flex-y flex-wrap justify-between gap-20p py-16p border-y border-shap/70 mb-30p">
                <h3 className="heading-3">Share</h3>
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
              <h4 className="heading-4 text-w-neutral-1 mb-30p">
                About Author
              </h4>
              <div className="flex max-sm:flex-wrap gap-28p mb-60p">
                <Image
                  className="avatar size-120p shrink-0"
                  src={avatar3}
                  width={120}
                  height={120}
                  alt="user"
                />
                <div>
                  <span className="text-xl-medium text-w-neutral-1 mb-3">
                    killer Master
                  </span>
                  <p className="text-m-medium text-w-neutral-4">
                    From action-packed shooters to immersive role-playing games
                    (RPGs) and strategy-based simulations, the gaming industry
                    boasts an array of genres that cater to every player&lsquo;s
                    preferences. Our vision is to create a welcoming, inclusive,
                    and supportive environment where gamers of all backgrounds
                    and skill levels can come together.
                  </p>
                </div>
              </div>
              <h3 className="heading-3 mb-20p">You May Also Like</h3>
              <div className="grid grid-cols-9 gap-30p my-20p">
                <div className="xxl:col-span-5 col-span-9 overflow-hidden rounded-12">
                  <VideoPlayer
                    videoSrc={saveVideoURl}
                    posterSrc={savedOne1}
                    videoTitle=""
                  />
                </div>
                <div className="xxl:col-span-4 col-span-9">
                  <div className="overflow-hidden rounded-12 h-full">
                    <Image
                      width={400}
                      height={400}
                      className="w-full h-full hover:scale-110 object-cover transition-1"
                      src={savedOne2}
                      alt="saved"
                    />
                  </div>
                </div>
              </div>
              <p className="text-m-regular text-w-neutral-4">
                As we wrap up our journey through the world of online gaming, we
                hope you&lsquo;ve gained a deeper appreciation for this
                captivating form of entertainment. From its diverse genres and
                cognitive benefits to the evolving landscape and put and immerse
                yourself in the boundless realms of online industry and the
                opportunities gaming.
              </p>
              <LeaveReplayForm />
            </div>
          </div>
          <div className="4xl:col-span-3 xxl:col-span-4 xl:col-span-5 col-span-12">
            <div className="xl:sticky xl:top-30">
              <div className="grid grid-cols-1 gap-30p *:bg-b-neutral-3 *:rounded-12 *:px-32p *:py-24p">
                <SearchCard />
                <ActiveMembers />
                <RecentGames />
                <CategoriesCard categories={categories} />
                <TagsCard tags={tags} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameDetailsTwo;

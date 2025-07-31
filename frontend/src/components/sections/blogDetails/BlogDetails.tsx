import Image from "next/image";
import Link from "next/link";
import blogDetails1 from "@public/images/blogs/blogDetails1.1.png";
import blogDetails2 from "@public/images/blogs/blogDetails1.2.png";
import blogDetails3 from "@public/images/blogs/blogDetails1.3.png";
import shape1 from "@public/images/icons/shape1.svg";
import { blogPosts } from "@public/data/blogPosts";
import BlogComments from "./BlogComments";
import SearchCard from "@/components/shared/SearchCard";
import {
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitch,
  IconBrandYoutube,
  IconHeart,
  IconMessage,
} from "@tabler/icons-react";

const BlogDetails = () => {
  return (
    <section className="section-pb relative overflow-visible pt-60p">
      <div className="container">
        <div className="grid grid-cols-12 gap-x-30p gap-y-10">
          <div className="4xl:col-span-9 xxl:col-span-8 col-span-12">
            <div>
              <div
                className="glitch-effect rounded-24 overflow-hidden"
                data-aos="fade-up"
              >
                <div className="glitch-thumb">
                  <Image
                    className="w-full xxl:h-[510px] lg:h-[400px] md:h-[360px] sm:h-[300px] h-[280px] object-cover"
                    src={blogDetails1}
                    alt="image"
                  />
                </div>
                <div className="glitch-thumb">
                  <Image
                    className="w-full xxl:h-[510px] lg:h-[400px] md:h-[360px] sm:h-[300px] h-[280px] object-cover"
                    src={blogDetails1}
                    alt="image"
                  />
                </div>
              </div>
              <div
                className="flex-y flex-wrap gap-24p justify-between py-20p text-base text-w-neutral-1"
                data-aos="fade-up"
              >
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
                  <IconMessage size={24} className="text-w-neutral-4" />
                  Share
                </Link>
              </div>
              <div data-aos="fade-up">
                <h2 className="heading-2 mb-3">
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
                  preferences. Our vision is to create a welcoming, inclusive,
                  and supportive environment where gamers of all backgrounds and
                  skill levels can come together. We believe in the power of
                  gaming to foster camaraderie, creativity, and personal growth.
                  Whether you&lsquo;re a solo player, a competitive gamer, a
                  streamer, or a game developer, you have a place here.
                </p>
                <div className="relative bg-b-neutral-3 rounded-12 py-32p px-40p mb-32p overflow-hidden">
                  <p className="text-xl-medium text-w-neutral-1">
                    We invite you to become a part of our gaming community.
                    Share your stories, insights, and experiences. Engage with
                    others who are as passionate about gaming as you are.
                    Together, we&lsquo;ll continue to explore the boundless
                    worlds of virtual adventures and make lasting memories.
                  </p>
                  <Image
                    className="absolute right-0 bottom-0"
                    src={shape1}
                    alt="shape"
                  />
                </div>
                <h3 className="heading-3 text-w-neutral-1">
                  Open-World Exploration Horizon Wanderer
                </h3>
              </div>
              <div
                className="flex-y max-md:flex-wrap gap-30p my-20p"
                data-aos="fade-up"
              >
                <div className="overflow-hidden rounded-12">
                  <Image
                    className="w-full h-auto hover:scale-110 transition-1"
                    src={blogDetails2}
                    alt="img"
                  />
                </div>
                <div className="overflow-hidden rounded-12">
                  <Image
                    className="w-full h-auto hover:scale-110 transition-1"
                    src={blogDetails3}
                    alt="img"
                  />
                </div>
              </div>
              <p
                className="text-m-regular text-w-neutral-4 mb-32p"
                data-aos="fade-up"
              >
                As we wrap up our journey through the world of online gaming, we
                hope you&lsquo;ve gained a deeper appreciation for this
                captivating form of entertainment. From its diverse genres and
                cognitive benefits to the evolving landscape and put and immerse
                yourself in the boundless realms of online industry and the
                opportunities gaming.
              </p>
              <div
                className="flex-y flex-wrap justify-between gap-20p py-16p border-y border-shap/70 mb-30p"
                data-aos="fade-up"
              >
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
              <BlogComments />
            </div>
          </div>
          <div className="4xl:col-span-3 xxl:col-span-4 col-span-12">
            <div className="xxl:sticky xxl:top-24">
              <div className="grid grid-cols-1 gap-30p *:bg-b-neutral-3 *:rounded-12 *:px-32p *:py-24p">
                <div data-aos="fade-up">
                  <SearchCard />
                </div>
                <div data-aos="fade-up">
                  <h4 className="heading-4 text-w-neutral-1 mb-20p">
                    Recent Post
                  </h4>
                  <div className="grid grid-cols-1 gap-20p">
                    {blogPosts?.slice(0, 3)?.map((item, idx) => (
                      <div key={idx} className="flex-y gap-2.5">
                        <Image
                          className="w-28 h-[90px] rounded-10"
                          src={item?.image}
                          width={112}
                          height={90}
                          alt="image"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-2.5">
                            <i className="ti ti-calendar-time text-primary icon-24"></i>
                            <span className="span text-sm text-w-neutral-4">
                              {item?.date}
                            </span>
                          </div>
                          <Link
                            href="#"
                            className="text-base text-w-neutral-1 line-clamp-2 link-1"
                          >
                            {item?.title}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div data-aos="fade-up">
                  <h4 className="heading-4 text-w-neutral-1 mb-20p">
                    Category
                  </h4>
                  <ul className="grid grid-cols-1 gap-16p *:flex-y *:justify-between text-m-regular text-w-neutral-1">
                    <li>
                      <Link
                        href="#"
                        className="hover:text-secondary transition-1"
                      >
                        Gaming
                      </Link>
                      <span className="text-w-neutral-4">(12)</span>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="hover:text-secondary transition-1"
                      >
                        Live
                      </Link>
                      <span className="text-w-neutral-4">(12)</span>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="hover:text-secondary transition-1"
                      >
                        Electronic
                      </Link>
                      <span className="text-w-neutral-4">(13)</span>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="hover:text-secondary transition-1"
                      >
                        Online
                      </Link>
                      <span className="text-w-neutral-4">(07)</span>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="hover:text-secondary transition-1"
                      >
                        Contraoller
                      </Link>
                      <span className="text-w-neutral-4">(02)</span>
                    </li>
                  </ul>
                </div>
                <div data-aos="fade-up">
                  <h4 className="heading-4 text-w-neutral-1 mb-20p">Tags</h4>
                  <div className="tag">
                    <Link href="#" className="tag-item tag-neutral-4">
                      E- Sports
                    </Link>
                    <Link href="#" className="tag-item tag-neutral-4">
                      Fantasy
                    </Link>
                    <Link href="#" className="tag-item tag-neutral-4">
                      Matches
                    </Link>
                    <Link href="#" className="tag-item tag-neutral-4">
                      Streamers
                    </Link>
                    <Link href="#" className="tag-item tag-neutral-4">
                      Landing
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;

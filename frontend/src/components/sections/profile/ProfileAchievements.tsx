import { profileAchievements } from "@public/data/profileAchievements";
import Image from "next/image";
import Link from "next/link";

const ProfileAchievements = () => {
  return (
    <section className="section-pb pt-60p overflow-visible">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="4xl:col-start-2 4xl:col-end-11 col-span-12">
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-30p py-40p 4xl:px-[70px] px-40p bg-b-neutral-3 rounded-12">
              {profileAchievements?.map((achievement) => (
                <div
                  key={achievement.id}
                  className="bg-b-neutral-4 py-32p px-40p flex-col-c text-center rounded-12"
                >
                  <Image
                    className="size-140p rounded-full mb-16p"
                    src={achievement.imageSrc}
                    width={140}
                    height={140}
                    alt="game"
                  />
                  <Link
                    href="/game-details-one"
                    className="heading-4 text-w-neutral-1 link-1 line-clamp-1 mb-3"
                  >
                    {achievement.title}
                  </Link>
                  <span className="text-m-medium text-primary mb-16p">
                    {`${achievement.progress} of ${achievement.total}`}
                  </span>
                  <div className="overflow-x-hidden w-full">
                    <div className="flex items-center w-full">
                      <div className="w-3.5 h-5 bg-primary"></div>
                      <div className="relative w-full h-2.5 bg-w-neutral-3">
                        <span
                          style={{
                            width: `${
                              (achievement.progress / achievement.total) * 100
                            }%`,
                          }}
                          className="progressbar-1 h-full"
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileAchievements;

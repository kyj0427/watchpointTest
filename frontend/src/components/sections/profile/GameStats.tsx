import { gamesPlaying, gamesStats } from "@public/data/gamesStats";
import Image from "next/image";
import Link from "next/link";

const GameStats = () => {
  return (
    <section className="section-pb pt-60p overflow-visible">
      <div className="container">
        <div className="grid grid-cols-12 gap-30p">
          <div className="4xl:col-start-2 4xl:col-end-8  xl:col-span-7 col-span-12">
            <div className="bg-b-neutral-3 p-40p rounded-12">
              <h3 className="heading-3 text-w-neutral-1 mb-30p text-split-left">
                Game Stats
              </h3>
              <div className="grid xxl+:grid-cols-3 xl:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-30p">
                {gamesStats.map((game, idx) => (
                  <div
                    key={idx}
                    className="bg-b-neutral-4 p-16p flex-col-c"
                    data-aos="fade-up"
                  >
                    <Image
                      className="avatar size-80p"
                      src={game.image}
                      alt={game.name}
                      width={80}
                      height={80}
                    />
                    <Link
                      href="/game-details-one"
                      className="heading-5 text-w-neutral-1 link-1 line-clamp-1 my-2"
                    >
                      {game.name}
                    </Link>
                    <div className="flex items-center border-t border-shap text-center pt-2">
                      <div>
                        <span className="text-sm text-w-neutral-1 mb-1">
                          Matches
                        </span>
                        <span className="text-sm text-primary">
                          {game.matches}
                        </span>
                      </div>
                      <div className="3xl:mx-7 mx-20p w-1px h-full bg-shap"></div>
                      <div>
                        <span className="text-sm text-w-neutral-1 mb-1">
                          Winnings
                        </span>
                        <span className="text-sm text-primary">
                          {game.winnings}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="4xl:col-start-8 4xl:col-end-12  xl:col-span-5 col-span-12 relative ">
            <div className="xl:sticky xl:top-30">
              <div className="grid grid-cols-1 gap-30p *:bg-b-neutral-3 *:rounded-12 *:py-32p *:px-40p">
                <div>
                  <h3 className="heading-3 text-w-neutral-1 mb-20p text-split-left">
                    Level 24
                  </h3>

                  <div className="flex items-center gap-24p overflow-x-hidden mb-3">
                    <div className="flex items-center w-full">
                      <div className="w-3.5 h-5 bg-primary"></div>
                      <div className="relative w-full h-2.5  bg-w-neutral-3">
                        <span
                          style={{ width: `75%` }}
                          className="progressbar-1"
                        ></span>
                      </div>
                    </div>
                    <div className="flex items-center text-w-neutral-1">
                      <h4 x-text="progress" className="heading-4"></h4>
                      <h4 className="heading-4">%</h4>
                    </div>
                  </div>
                  <Link
                    href="#"
                    className="text-m-medium text-w-neutral-1 link-1"
                  >
                    View All Level
                  </Link>
                </div>

                <div>
                  <h3 className="heading-3 text-w-neutral-1 mb-30p text-split-left">
                    Games Playing
                  </h3>

                  <div className="grid grid-cols-1 gap-y-40p">
                    {gamesPlaying?.map((game, idx) => (
                      <div
                        key={idx}
                        className="flex max-sm:flex-col items-center max-sm:text-center gap-3"
                      >
                        <Image
                          className="shrink-0 size-[102px] rounded-12"
                          src={game.image}
                          alt={game.name}
                        />
                        <div className="w-full">
                          <Link
                            href="/game-details-one"
                            className="heading-4 text-w-neutral-1 link-1 line-clamp-1 inline-block"
                          >
                            {game.name}
                          </Link>
                          <div className="flex items-center gap-24p overflow-x-hidden">
                            <div className="flex items-center w-full">
                              <div className="w-3.5 h-5 bg-primary"></div>
                              <div className="relative w-full h-2.5  bg-w-neutral-3">
                                <span
                                  style={{ width: `${game?.performance}%` }}
                                  className="progressbar-1"
                                ></span>
                              </div>
                            </div>
                            <div className="flex items-center text-w-neutral-1">
                              <h4 className="heading-4">{game?.performance}</h4>
                              <h4 className="heading-4">%</h4>
                            </div>
                          </div>
                          <span className="text-base text-w-neutral-1 my-2">
                            Win Ration{" "}
                            <span className="span text-primary">
                              {game.winRation}%
                            </span>
                          </span>
                        </div>
                      </div>
                    ))}
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

export default GameStats;

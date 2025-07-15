import { IconHeart } from "@tabler/icons-react";
import Link from "next/link";

const GameDetailsOneHero = () => {
  return (
    <section className="pt-30p">
      <div className="section-pt">
        <div className="relative bg-[url('/images/photos/gameDetailsHeroBG.png')] bg-cover bg-no-repeat rounded-24 overflow-hidden">
          <div className="container relative 3xl:px-[140px] max-3xl:px-80p xl:py-[130px] md:py-30 sm:py-25 py-20 z-[2]">
            <div className="max-w-[670px]">
              <h1 className="heading-1 text-w-neutral-1 mb-3 text-left">
                Gourmet Empire
              </h1>
              <p className="text-m-medium text-w-neutral-1 mb-24p">
                Meta Apes is a play-and-earn MMO strategy game. It is set in a
                post apocalyptic world, in which a new era ruled by Apes has
                begun. Here, play an alter ego in a parallel world and create
                your own monkey life.
              </p>
              <div className="flex items-center flex-wrap gap-3">
                <Link href="#" className="btn btn-md btn-primary rounded-12">
                  Play Now
                </Link>
                <Link
                  href="/profile"
                  className="btn btn-md btn-neutral-1 rounded-12"
                >
                  Go to profile
                </Link>
                <button className="btn-c btn-c-lg btn-neutral-1">
                  <IconHeart />
                </button>
              </div>
            </div>
          </div>
          <div className="overlay-1"></div>
        </div>
      </div>
    </section>
  );
};

export default GameDetailsOneHero;

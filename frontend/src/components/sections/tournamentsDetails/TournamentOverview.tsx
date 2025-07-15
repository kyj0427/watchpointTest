import Image from "next/image";
import user1 from "@public/images/users/user8.png";
import TournamentOverviewSidebar from "./TournamentOverviewSidebar";

const TournamentOverview = () => {
  return (
    <section className="section-pb relative overflow-visible">
      <div className="container">
        <div className="grid 4xl:grid-cols-12 grid-cols-1 gap-30p ">
          <div className="4xl:col-start-2 4xl:col-end-12">
            <div className="grid grid-cols-10 gap-30p items-start">
              <div className="3xl:col-span-7 xl:col-span-6 col-span-10">
                <div>
                  <div className="flex-y flex-wrap gap-x-32p bg-b-neutral-3 px-32p py-24p rounded-12 mb-32p">
                    <Image
                      className="avatar size-72p shrink-0"
                      src={user1}
                      alt="avater"
                    />
                    <div className="flex-y gap-32p">
                      <div>
                        <span className="text-base text-w-neutral-4 mb-1">
                          Game
                        </span>
                        <span className="text-xl-medium text-w-neutral-1">
                          UNO
                        </span>
                      </div>
                      <div>
                        <span className="text-base text-w-neutral-4 mb-1">
                          Game Mode
                        </span>
                        <span className="text-xl-medium text-w-neutral-1">
                          Solos
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-b-neutral-3 py-40p px-32p rounded-12">
                    <h3 className="heading-3 text-w-neutral-1 mb-3">
                      Tournament Info
                    </h3>
                    <p className="text-base text-w-neutral-4 mb-24p">
                      Our tournaments require four teams to start, to you get
                      the best competitive experience. A tournament containing
                      less than the mentioned amount will automatically be
                      cancelled, and any entry fee will be refunded through our
                      customer support.
                    </p>
                    <h3 className="heading-4 text-w-neutral-1 mb-3">
                      Tournament Rules
                    </h3>
                    <ul className="list-disc text-base text-w-neutral-4 ml-5 mb-24p">
                      <li>
                        After entering the application, you must go to your
                        social, and add the opponent via ID.
                      </li>
                      <li>
                        All Rounds: Team has to win 2 rounds to Win; Finals:
                        Team has to win 3 Rounds to Win.
                      </li>
                      <li>
                        Players must provide their ID in the Discord Uno IDs tab
                        so players can communicate together and with the
                        organizer when needed
                      </li>
                      <li>Players communicate in Discord Only</li>
                    </ul>
                    <h3 className="heading-5 text-w-neutral-1 mb-3">
                      Join the Game
                    </h3>
                    <ul className="list-disc text-base text-w-neutral-4 ml-5 mb-24p">
                      <li>
                        Check-in opens 60 minutes before the tournament starts..
                      </li>
                      <li>
                        After that, players have 45 minutes to confirm their
                        rticipation.
                      </li>
                      <li>
                        The team responsible for creating the in-game lobby
                        choose sides..
                      </li>
                      <li>
                        Players will be instructed as to which player has been
                        selected to create the in-game lobby, along with who
                        must be invited from the posite team.
                      </li>
                      <li>
                        Players have 5 minutes to join the pre-game lobby on the
                        Epulze atform. Once matched with opponents.
                      </li>
                    </ul>
                    <h3 className="heading-5 text-w-neutral-1 mb-3">
                      Feedback
                    </h3>
                    <p className="text-base text-w-neutral-4">
                      Please tell us about your experience, and make sure you
                      report any bugs to Support.
                    </p>
                  </div>
                </div>
              </div>
              <div className="3xl:col-span-3 xl:col-span-4 col-span-10 relative">
                <TournamentOverviewSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TournamentOverview;

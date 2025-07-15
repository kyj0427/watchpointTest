import Link from "next/link";

const user = {
  about:
    "Hi! My name is Josephine Williams. Gaming isn't just about the games; it's about the friendships we make along the way. I'm always excited to meet new gaming buddies and be part of this incredible gaming community. While I enjoy a wide variety of games, I'm particularly fond of RPGs, open-world adventures, and competitive shooters.",
  joined: "March 22, 2021",
  city: "New York",
  country: "United States",
  age: 25,
  email: "example@gmail.com",
  gameId: 123456,
};

const GameAbout = () => {
  return (
    <section className="section-pb pt-60p overflow-visible">
      <div className="container">
        <div className="grid grid-cols-12 gap-30p">
          <div className="4xl:col-start-2 4xl:col-end-8  xl:col-span-7 col-span-12">
            <div className="bg-b-neutral-3 p-40p rounded-12">
              <h3 className="heading-3 text-w-neutral-1 text-split-left mb-16p">
                About Me
              </h3>
              <p className="text-l-regular text-w-neutral-4 mb-2.5">
                {user.about}
              </p>
              <div className="grid grid-cols-1 gap-16p mt-40p text-l-regular text-w-neutral-1">
                <div className="flex-y flex-wrap gap-y-3">
                  <span className="w-[132px]">Joined</span>
                  <span className="text-w-neutral-4">{user.joined}</span>
                </div>
                <div className="flex-y flex-wrap gap-y-3">
                  <span className="w-[132px]">City</span>
                  <span className="text-w-neutral-4">{user.city}</span>
                </div>
                <div className="flex-y flex-wrap gap-y-3">
                  <span className="w-[132px]">Country</span>
                  <span className="text-w-neutral-4">{user.country}</span>
                </div>
                <div className="flex-y flex-wrap gap-y-3">
                  <span className="w-[132px]">Age</span>
                  <span className="text-w-neutral-4">{user.age} Years</span>
                </div>
              </div>
            </div>
          </div>
          <div className="4xl:col-start-8 4xl:col-end-12  xl:col-span-5 col-span-12 relative ">
            <div className="xl:sticky xl:top-30">
              <div className="bg-b-neutral-3 rounded-12 py-32p px-40p">
                <h3 className="heading-3 text-w-neutral-1 text-split-left mb-16p">
                  Personal Info
                </h3>
                <div className="grid grid-cols-1 gap-16p text-l-regular text-w-neutral-1">
                  <div className="flex-y flex-wrap gap-y-3">
                    <span className="w-[132px]">Email</span>
                    <Link
                      href={`mailto:${user.email}`}
                      className="text-w-neutral-4"
                    >
                      {user.email}
                    </Link>
                  </div>
                  <div className="flex-y flex-wrap gap-y-3">
                    <span className="w-[132px]">City</span>
                    <span className="text-w-neutral-4">{user.city}</span>
                  </div>
                  <div className="flex-y flex-wrap gap-y-3">
                    <span className="w-[132px]">Country</span>
                    <span className="text-w-neutral-4">{user.country}</span>
                  </div>
                  <div className="flex-y flex-wrap gap-y-3">
                    <span className="w-[132px]">Game ID</span>
                    <span className="text-w-neutral-4">{`#${user.gameId}`}</span>
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

export default GameAbout;

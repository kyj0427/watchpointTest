import ProfileHomeRightAside from "./ProfileHomeRightAside";
import PostCreateCard from "./PostCreateCard";
import ProfilePosts from "./ProfilePosts_hw";

const ProfileHome = () => {
  return (
    <section className="section-pb pt-60p overflow-visible">
      <div className="container">
        <div className="grid grid-cols-12 gap-30p">
          <div className="4xl:col-start-2 4xl:col-end-8 xxl:col-span-7 col-span-12">
            <div className="grid grid-cols-1 gap-30p">
              <PostCreateCard />
              <div>
                <ProfilePosts />
                <div className="flex-c mt-48p">
                  <button
                    type="button"
                    className="btn btn-lg btn-neutral-3 rounded-12"
                  >
                    Load more...
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="4xl:col-start-8 4xl:col-end-12 xxl:col-span-5 col-span-12 relative xxl:block hidden">
            <ProfileHomeRightAside />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHome;

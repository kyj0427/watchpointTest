import ActiveMembers from "./ActiveMembers";
import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";
import LatestNews from "./LatestNews";

const RightAsideOne = () => {
  return (
    <div className="grid grid-cols-12 gap-24p">
      <div className="xxl:col-span-12 md:col-span-6 col-span-12 xxl:order-1 order-3">
        <ActiveMembers />
      </div>
      <div className="xxl:col-span-12 md:col-span-6 col-span-12 xxl:order-2 order-2">
        <LatestNews />
      </div>
      <div className="xxl:col-span-12 md:col-span-6 col-span-12 xxl:order-3 order-2">
        <Testimonials />
      </div>
      <div className="xxl:col-span-12 md:col-span-6 col-span-12 order-4">
        <Newsletter />
      </div>
    </div>
  );
};

export default RightAsideOne;

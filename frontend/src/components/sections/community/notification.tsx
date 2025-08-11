import { Accordion } from "@/components/ui";
import { faqItemsOne } from "@public/data/faqItems";

const Notification = () => {
  return (
    <section className="section-py">
      <div className="container">
        <div className="grid grid-cols-12 gap-24p">
          <div className="xl:col-start-3 lg:col-start-2 xl:col-end-11 lg:col-end-12 col-span-12">
            <div className="grid grid-cols-1 gap-20p">
              <Accordion faqItems={faqItemsOne} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notification;

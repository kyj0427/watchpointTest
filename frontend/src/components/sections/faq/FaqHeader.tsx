import { TextSplitTop } from "@/lib/gsap";

const FaqHeader = () => {
  return (
    <section className="gradient-1 bg-no-repeat bg-cover sm:pt-24 pt-18">
      <div className="container section-py">
        <div className="grid grid-cols-12 items-end my-gap-24">
          <div className="lg:col-span-8 md:col-span-9 col-span-12">
            <span className="box-2 text-primary gap-mb-16 inline-block ">
              Faq
            </span>
            <TextSplitTop as="h4" className="text-57 text-white gap-mb-24 ">
              Find your question here
            </TextSplitTop>
            <p className="text-18 text-neutral-25 gap-mb-32 ">
              Answers to frequently asked questions about Proinvest financial
              asset management services, investment strategies, and risk
              management practices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqHeader;

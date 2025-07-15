const Newsletter = () => {
  return (
    <div className="bg-b-neutral-3 rounded-12 px-32p py-24p">
      <span className="icon-40 text-primary">
        <i className="ti ti-mail-opened"></i>
      </span>
      <div className="my-20p">
        <h1 className="heading-1 text-w-neutral-1 mb-2">Newsletter</h1>
        <p className="text-base text-w-neutral-3">Check Latest Updates</p>
      </div>
      <form className="flex-y justify-between gap-2.5 bg-b-neutral-2 px-24p pr-3 py-3 rounded-full mb-3">
        <input
          className="w-full bg-transparent placeholder:text-sm placeholder:text-w-neutral-4"
          type="email"
          name="email"
          id="newsletterEmail"
          placeholder="Your Email"
        />
        <button className="shrink-0 flex-c size-8 rounded-full bg-accent-4 icon-24 text-b-neutral-4">
          <i className="ti ti-arrow-right"></i>
        </button>
      </form>
      <div className="shrink-0 flex-y gap-16p">
        <i className="ti ti-alert-circle text-white icon-24"></i>
        <p className="text-sm text-w-neutral-2">Important Notification</p>
      </div>
    </div>
  );
};

export default Newsletter;

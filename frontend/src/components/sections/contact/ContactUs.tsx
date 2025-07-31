import Link from "next/link";
import ContactForm from "./ContactForm";

const ContactUs = () => {
  return (
    <section className="section-py">
      <div className="container">
        <div className="grid grid-cols-12 gap-30p">
          <div className="3xl:col-start-3 xxl:col-start-2 3xl:col-end-11 xxl:col-end-12 col-span-12">
            <h2 className="heading-2 text-center text-w-neutral-1 mb-48p">
              Let’s Get In Touch
            </h2>

            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-30p mb-60p">
              <div className="bg-b-neutral-3 rounded-4 flex-col-c text-center p-32p">
                <span className="flex-c size-80p rounded-full border border-primary text-primary icon-40 mb-32p">
                  <i className="ti ti-map-pin-filled"></i>
                </span>
                <h5 className="heading-5 text-w-neutral-1 mb-3">Location</h5>
                <Link href="#" className="text-m-regular text-body">
                  View on Google Maps
                </Link>
              </div>
              <div className="bg-b-neutral-3 rounded-4 flex-col-c text-center p-32p">
                <span className="flex-c size-80p rounded-full border border-primary text-primary icon-40 mb-32p">
                  <i className="ti ti-mail-opened-filled"></i>
                </span>
                <h5 className="heading-5 text-w-neutral-1 mb-3">
                  Email Address
                </h5>
                <Link
                  href="mailto:support@example.com"
                  className="text-m-regular text-body"
                >
                  support@example.com
                </Link>
              </div>
              <div className="bg-b-neutral-3 rounded-4 flex-col-c text-center p-32p">
                <span className="flex-c size-80p rounded-full border border-primary text-primary icon-40 mb-32p">
                  <i className="ti ti-phone-call"></i>
                </span>
                <h5 className="heading-5 text-w-neutral-1 mb-3">Contact Us</h5>
                <Link
                  href="tel:2395550108"
                  className="text-m-regular text-body"
                >
                  (239) 555-0108
                </Link>
              </div>
            </div>
            <ContactForm />
            <div className="bg-b-neutral-3 rounded-4 p-40p"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

import BillingSidebar from "@/components/shared/BillingSidebar";
import Link from "next/link";

const Checkout = () => {
  return (
    <section className="section-pb pt-15 overflow-visible">
      <div className="container">
        <div className="grid grid-cols-12 gap-30p">
          <div className="3xl:col-start-2 3xl:col-end-12 col-span-12">
            <form className="grid grid-cols-10 gap-x-30p gap-y-10">
              <div className="xxl:col-span-7 xl:col-span-6 col-span-10 xl:order-1 order-2 bg-b-neutral-3 p-40p rounded-12 ">
                <div className="flex-y justify-between flex-wrap gap-3 mb-20p">
                  <h4 className="heading-4 text-w-neutral-1">
                    Contact Information
                  </h4>
                  <p className="text-sm text-w-neutral-4">
                    Already have an account?
                    <Link
                      href="/login"
                      className="inline text-primary hover:underline"
                    >
                      Log In
                    </Link>
                  </p>
                </div>

                <div className="bg-b-neutral-4 px-40p py-32p rounded-12 mb-40p">
                  <input
                    className="border-input-1 mb-3"
                    type="text"
                    name="shipping_address"
                    placeholder="Enter your shipping address"
                    id="shipping_address"
                  />
                  <div className="checkbox-container shrink-0">
                    <input
                      type="checkbox"
                      value="true"
                      id="emailMe"
                      className="border-corners-checkbox"
                      checked
                    />
                    <label
                      htmlFor="emailMe"
                      className="border-corners-checkbox-label gap-2"
                    >
                      <i className="ti icon-24 text-w-neutral-3"></i>
                      Email me with news offer
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="heading-4 text-w-neutral-1 mb-20p">Payment</h4>

                  <div className="bg-b-neutral-4 px-40p py-32p rounded-12 mb-40p">
                    <div className="grid grid-cols-12 gap-20p mb-24p">
                      <input
                        className="sm:col-span-6 col-span-12 border-input-1"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                      />
                      <input
                        className="sm:col-span-6 col-span-12 border-input-1"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                      />
                      <input
                        className="col-span-12 border-input-1"
                        type="text"
                        name="address"
                        placeholder="Address"
                      />
                      <input
                        className="sm:col-span-6 col-span-12 border-input-1"
                        type="text"
                        name="city"
                        placeholder="City"
                      />
                      <input
                        className="sm:col-span-6 col-span-12 border-input-1"
                        type="number"
                        name="postalCode"
                        placeholder="Postal Code"
                      />
                      <input
                        className="col-span-12 border-input-1"
                        type="number"
                        name="phone"
                        placeholder="Phone"
                      />
                    </div>

                    <div className="checkbox-container shrink-0">
                      <input
                        type="checkbox"
                        value="true"
                        name="saveInfo"
                        id="saveInfo"
                        className="border-corners-checkbox"
                        checked
                      />
                      <label
                        htmlFor="saveInfo"
                        className="border-corners-checkbox-label gap-2"
                      >
                        <i className="ti icon-24 text-w-neutral-3"></i>
                        Save this information for next time
                      </label>
                    </div>
                  </div>
                  <div className="flex-y flex-wrap gap-3">
                    <Link
                      href="/checkout"
                      className="btn btn-md btn-primary rounded-12"
                    >
                      Complete Order
                    </Link>
                    <Link
                      href="/shop"
                      className="btn btn-md btn-neutral-4 rounded-12"
                    >
                      Return to Shipping
                    </Link>
                  </div>
                </div>
              </div>
              <div className="xxl:col-span-3 xl:col-span-4 col-span-10 order-1 xl:order-2">
                <BillingSidebar />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;

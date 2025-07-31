"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import BillingSidebar from "../../shared/BillingSidebar";

interface FormData {
  contact: string;
  shipping_address: string;
  payment: string;
  billing_address: string;
}

const Shipping = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // form submit event

    reset();
  };

  return (
    <section className="section-pb pt-15 overflow-visible">
      <div className="container">
        <div className="grid grid-cols-12 gap-30p">
          <div className="3xl:col-start-2 3xl:col-end-12 col-span-12">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-10 gap-30p"
            >
              <div className="xxl:col-span-7 xl:col-span-6 col-span-10 bg-b-neutral-3 p-40p rounded-12">
                {/* Contact Input */}
                <div className="bg-b-neutral-4 px-40p py-32p rounded-12 mb-20p">
                  <label htmlFor="contact" className="label label-lg mb-24p">
                    Contact
                  </label>
                  <input
                    {...register("contact")}
                    className="border-input-1"
                    type="number"
                    placeholder="Enter your number"
                    id="contact"
                  />
                </div>

                {/* Shipping Address */}
                <div className="bg-b-neutral-4 px-40p py-32p rounded-12 mb-40p">
                  <label
                    htmlFor="shipping_address"
                    className="label label-lg mb-24p"
                  >
                    Shipping Address
                  </label>
                  <input
                    {...register("shipping_address")}
                    className="border-input-1"
                    type="text"
                    placeholder="Enter your shipping address"
                    id="shipping_address"
                  />
                </div>

                <div>
                  <h4 className="heading-4 text-w-neutral-1 mb-1">Payment</h4>
                  <p className="text-base text-w-neutral-4 mb-20p">
                    All transactions are secure and encrypted.
                  </p>
                  <div className="grid grid-cols-1 gap-20p bg-b-neutral-4 px-40p py-32p rounded-12 mb-20p">
                    <div className="border-input-1">
                      <label className="radio-button-container">
                        <span className="text-l-medium text-w-neutral-4 cursor-pointer ">
                          Bank Transfer - BEFTN/NPSB
                        </span>
                        <input
                          type="radio"
                          {...register("payment")}
                          value="bank"
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>

                    <div className="border-input-1">
                      <label className="radio-button-container">
                        <span className="text-l-medium text-w-neutral-4 cursor-pointer ">
                          Cash On Delivery
                        </span>
                        <input
                          type="radio"
                          {...register("payment")}
                          value="cash_on_delivery"
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>

                    <div className="border-input-1">
                      <label className="radio-button-container">
                        <span className="text-l-medium text-w-neutral-4 cursor-pointer ">
                          Online Payment(Visa, MasterCard, MFS,
                          Netbanking)-PortWallet
                        </span>
                        <input
                          type="radio"
                          {...register("payment")}
                          value="card"
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="heading-4 text-w-neutral-1 mb-1">
                    Billing Address
                  </h4>
                  <p className="text-base text-w-neutral-4 mb-20p">
                    Select the address that matches your card or payment method.
                  </p>
                  <div className="grid grid-cols-1 gap-20p bg-b-neutral-4 px-40p py-32p rounded-12 mb-20p">
                    <div className="border-input-1">
                      <label className="radio-button-container">
                        <span className="text-l-medium text-w-neutral-4 cursor-pointer ">
                          Same As Shipping Address
                        </span>
                        <input
                          type="radio"
                          {...register("payment")}
                          value="shipping_address"
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>

                    <div className="border-input-1">
                      <label className="radio-button-container">
                        <span className="text-l-medium text-w-neutral-4 cursor-pointer ">
                          Use A Different Billing Address
                        </span>
                        <input
                          type="radio"
                          {...register("payment")}
                          value="billing_address"
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex-y flex-wrap gap-3">
                  <button
                    type="submit"
                    className="btn btn-md btn-primary rounded-12"
                  >
                    Complete Order
                  </button>
                  <Link
                    href="/shop"
                    className="btn btn-md btn-neutral-4 rounded-12"
                  >
                    Return to Shipping
                  </Link>
                </div>
              </div>

              {/* Billing Sidebar */}
              <div className="xxl:col-span-3 xl:col-span-4 col-span-10">
                <BillingSidebar />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shipping;

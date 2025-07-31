"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { cartProducts } from "@public/data/cartProducts";
import { IconTrash } from "@tabler/icons-react";

type CouponForm = {
  coupon: string;
};

const BillingSidebar = () => {
  const { register, handleSubmit, reset } = useForm<CouponForm>();

  const onSubmit = (data: CouponForm) => {
    // form submit event

    reset();
  };

  return (
    <div className="xl:sticky xl:top-30">
      <div className="grid grid-cols-1 gap-y-20p mb-20p">
        {cartProducts?.map((item, idx) => (
          <div
            key={idx}
            className="bg-b-neutral-3 flex-y gap-16p py-32p px-40p rounded-12"
          >
            <div className="relative bg-b-neutral-2 p-24p rounded-4">
              <Image className="size-[74px]" src={item?.image} alt="product" />
              <span className="absolute -top-3 -right-3 badge-box-neutral-1">
                {(idx + 1).toLocaleString()}
              </span>
            </div>
            <div>
              <Link
                href={`/shop/${item?.id}`}
                className="heading-5 text-w-neutral-1 link-1 line-clamp-1 mb-1"
              >
                {item?.name}
              </Link>
              <h5 className="heading-5 text-w-neutral-1 mb-3">$29.90</h5>
              <button className="icon-24 text-primary hover:text-danger transition-1">
                <IconTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon Form */}
      <div className="bg-b-neutral-3 flex-y gap-16p py-32p px-40p rounded-12 mb-20p">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex-y justify-between gap-3 p-3 bg-b-neutral-2 rounded-12"
        >
          <input
            {...register("coupon")}
            className="w-full bg-transparent text-m-medium text-w-neutral-1 placeholder:text-w-neutral-4"
            type="text"
            placeholder="Discount Code"
          />
          <button
            type="submit"
            className="shrink-0 btn btn-md btn-primary rounded-12"
          >
            Apply
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-b-neutral-3 py-32p px-40p rounded-12">
        <div className="flex-y justify-between gap-3 mb-3">
          <span className="text-l-medium text-w-neutral-1">Subtotal</span>
          <span className="text-l-medium text-w-neutral-1">€75.00</span>
        </div>
        <div className="flex-y justify-between gap-3 mb-20p">
          <span className="text-l-medium text-w-neutral-1">Tax</span>
          <span className="text-l-medium text-w-neutral-1">€2.00</span>
        </div>
        <div className="flex-y justify-between gap-3 pt-20p border-t border-shap">
          <span className="text-l-medium text-w-neutral-1">Total</span>
          <span className="text-l-medium text-w-neutral-1">€75.00</span>
        </div>
      </div>
    </div>
  );
};

export default BillingSidebar;

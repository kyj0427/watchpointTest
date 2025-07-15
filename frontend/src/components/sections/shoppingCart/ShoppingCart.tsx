"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cartProducts } from "@public/data/cartProducts";

const ShoppingCart = () => {
  const [cart, setCart] = useState(cartProducts);

  const updateQuantity = (id: number, change: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const getSubtotal = (price: number, quantity: number) =>
    (price * quantity).toFixed(2);
  const getTotal = () =>
    cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

  return (
    <section className="section-pb pt-15">
      <div className="container">
        <div className="grid grid-cols-12 gap-30p">
          <div className="xxl:col-start-2 xxl:col-end-12 col-span-12">
            <div className="overflow-x-auto scrollbar-sm w-full mb-5">
              <table className="w-full text-left">
                <thead>
                  <tr className="md:text-2xl sm:text-xl text-lg font-borda">
                    <th className="min-w-[320px] w-full">Product</th>
                    <th className="min-w-[144px] p-16p">Price</th>
                    <th className="min-w-[144px] p-16p text-center">
                      Quantity
                    </th>
                    <th className="min-w-[144px] p-16p text-center">
                      Subtotal
                    </th>
                    <th className="min-w-10 p-16p">Edit</th>
                  </tr>
                </thead>
                <tbody className="*:bg-b-neutral-3 divide-y divide-b-neutral-4">
                  {cart.map((item) => (
                    <tr key={item.id} className="*:p-20p">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="shrink-0 bg-b-neutral-2 p-24p rounded-12">
                            <Image
                              className="size-[74px] rounded-12"
                              src={item.image}
                              alt={item.name}
                              width={74}
                              height={74}
                            />
                          </div>
                          <Link
                            href="/shop-details"
                            className="text-m-medium text-w-neutral-1 link-1"
                          >
                            {item.name}
                          </Link>
                        </div>
                      </td>
                      <td>
                        <span className="text-m-medium text-w-neutral-1">
                          €{item.price.toFixed(2)}
                        </span>
                      </td>
                      <td>
                        <div className="flex-c">
                          <div className="qtySelector inline-flex items-center justify-center border border-shap px-16p sm:py-3 py-2 rounded-12 w-[144px] *:h-full">
                            <button
                              className="decreaseQty flex-c size-12 icon-24"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <i className="ti ti-minus"></i>
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              className="qtyValue btn-xsm bg-transparent min-w-12 max-w-18 text-base text-w-neutral-1 text-center"
                              readOnly
                            />
                            <button
                              className="increaseQty flex-c size-12 icon-24"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <i className="ti ti-plus"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-m-medium text-w-neutral-1 text-center">
                          €{getSubtotal(item.price, item.quantity)}
                        </span>
                      </td>
                      <td>
                        <button
                          className="icon-24 text-w-neutral-1 hover:text-danger text-center transition-1"
                          onClick={() => removeItem(item.id)}
                        >
                          <i className="ti ti-archive"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-b-neutral-3 flex max-md:flex-wrap items-center justify-between gap-20p p-30p">
              <div>
                <span className="heading-4 font-normal text-w-neutral-1 mb-3">
                  Subtotal
                </span>
                <p className="text-l-regular text-w-neutral-4">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
              <div className="flex-y gap-30p">
                <div>
                  <span className="heading-4 text-w-neutral-1 font-normal inline">
                    €
                  </span>
                  <span className="heading-4 text-w-neutral-1 font-normal inline">
                    {getTotal()}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  className="btn btn-md btn-primary rounded-12"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;

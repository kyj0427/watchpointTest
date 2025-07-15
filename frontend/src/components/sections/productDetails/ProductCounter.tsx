"use client";

import {
  IconHeart,
  IconMinus,
  IconPlus,
  IconShoppingCartPlus,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

const ProductCounter = () => {
  const [count, setCount] = useState(1);

  const increaseCounter = () => setCount(count + 1);
  const decreaseCounter = () => setCount(Math.max(1, count - 1));

  return (
    <div className="flex items-center flex-wrap gap-3 my-32p">
      <div className="qtySelector inline-flex items-center justify-center border border-shap px-16p sm:py-3.5 py-2.5 rounded-12 w-[144px] *:h-full">
        <button
          className="decreaseQty flex-c size-12 icon-24"
          onClick={decreaseCounter}
        >
          <IconMinus size={24} />
        </button>
        <input
          min="1"
          value={count}
          type="number"
          placeholder="1"
          className="qtyValue btn-xsm bg-transparent min-w-12 max-w-18 text-base text-w-neutral-1 text-center"
          readOnly
        />
        <button
          className="increaseQty flex-c size-12 icon-24"
          onClick={increaseCounter}
        >
          <IconPlus size={24} />
        </button>
      </div>
      <Link href="/shipping" className="btn btn-lg-2 btn-primary rounded-12">
        <IconShoppingCartPlus size={24} />
        Buy Now
      </Link>
      <Link
        href="/shopping-cart"
        className="btn py-3 px-16p btn-primary rounded-12 icon-28"
      >
        <IconHeart size={24} />
      </Link>
    </div>
  );
};

export default ProductCounter;

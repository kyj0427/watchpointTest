import RatingStars from "@/components/ui/RatingStars";
import { TProduct } from "@/config/types";
import {
  IconHeart,
  IconMinus,
  IconPlus,
  IconShoppingCartPlus,
} from "@tabler/icons-react";
import Link from "next/link";
import ProductSlider from "./ProductSlider";
import ProductCounter from "./ProductCounter";
import ProductFooter from "./ProductFooter";

const ProductDetails = ({ product }: { product: TProduct }) => {
  return (
    <section className="py-15 overflow-visible">
      <div className="container">
        <div className="grid grid-cols-12 gap-x-30p gap-y-10 mb-60p">
          <div className="xxl:col-span-6 xl:col-span-7 col-span-12 relative">
            <div className="xl:sticky xl:top-30">
              {product?.photos && <ProductSlider photos={product?.photos} />}
            </div>
          </div>
          <div className="xxl:col-span-6 xl:col-span-5 col-span-12">
            <div>
              <h2 className="heading-2 text-w-neutral-1 mb-16p">
                {product?.name}
              </h2>
              <div className="flex-y gap-2 mb-20p">
                <RatingStars rating={product?.rating} />
                <span className="text-base text-w-neutral-4">
                  ( {product?.reviews} Reviews)
                </span>
              </div>
              <div className="flex-y gap-1 mb-20p">
                <span className="text-xl text-w-neutral-4 line-through">
                  $100
                </span>
                <span className="text-lead-medium text-w-neutral-1">
                  ${product?.price}
                </span>
              </div>
              <p className="text-base text-w-neutral-4 mb-3">
                {product?.description}
              </p>
              <ProductCounter />
              <div className="flex-y gap-3.5 mb-16p">
                <span className="text-l-medium text-w-neutral-1">
                  Categories:
                </span>
                <span className="text-base text-w-neutral-4">
                  {product?.category}
                </span>
              </div>
              <div className="flex-y gap-3.5 mb-16p">
                <span className="text-l-medium text-w-neutral-1">Tag:</span>
                <span className="text-base text-w-neutral-4">
                  {product?.tags?.map((item) => item).join(", ")}
                </span>
              </div>
              <div className="flex-y gap-3.5 mb-16p">
                <span className="text-l-medium text-w-neutral-1">
                  Product ID:
                </span>
                <span className="text-base text-w-neutral-4">
                  {product?.productID}
                </span>
              </div>
            </div>
          </div>
        </div>
        <ProductFooter />
      </div>
    </section>
  );
};

export default ProductDetails;

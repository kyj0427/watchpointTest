import RatingStars from "@/components/ui/RatingStars";
import { allProducts } from "@public/data/allProducts";
import { IconHeart, IconShoppingCartPlus } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Swiper } from "swiper/react";

const RealatedProducts = () => {
  return (
    <section className="section-pb">
      <div className="container">
        <div className="flex-y justify-between gap-24p mb-40p">
          <h2 className="heading-2 text-w-neutral-1">Related Products</h2>
          <Link href="#" className="text-s-medium text-w-neutral-1 link-1">
            View All
            <i className="ti ti-arrow-right"></i>
          </Link>
        </div>
        <Swiper>
          {allProducts?.map((item, idx) => (
            <div
              key={idx}
              className="py-30p px-20p rounded-20 border border-shap group"
            >
              <div className="flex-col-c overflow-hidden mb-30p">
                <Image
                  className="w-[220px] h-[225px] group-hover:scale-105 transition-1"
                  src={item?.image}
                  alt="img"
                />
              </div>
              <div className="py-24p border-t border-shap pt-30p">
                <Link
                  href="/shop-details"
                  className="heading-4 text-w-neutral-1 line-clamp-1 link-1 mb-20p "
                >
                  Wireless Earbuds with Noise Cancellation
                </Link>
                <div className="flex-y flex-wrap gap-x-24p gap-y-3 mb-20p">
                  <div className="flex-y gap-1">
                    <span className="text-base text-body line-through">
                      ${item?.price}
                    </span>
                    <span className="text-xl-medium text-w-neutral-1">
                      ${item?.discountPrice}
                    </span>
                  </div>
                  <RatingStars rating={item?.rating} />
                </div>
                <div className="flex-y justify-between 4xl:gap-6 gap-3">
                  <Link
                    href="/shopping-cart"
                    className="btn btn-md btn-neutral-3 group-hover:bg-primary group-hover:text-b-neutral-4 rounded-12"
                  >
                    <span className="flex-c icon-24">
                      <i className="ti ti-shopping-cart-plus"></i>
                      <IconShoppingCartPlus size={24} />
                    </span>
                    Add To Cart
                  </Link>
                  <button className="shrink-0 btn-c btn-c-lg btn-c-neutral-3 group-hover:bg-secondary group-hover:text-b-neutral-4 icon-24">
                    <IconHeart />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Swiper>
        <div className="flex-c mt-48p">
          <Link href="#" className="btn btn-xl py-3 btn-primary rounded-12">
            Load More...
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RealatedProducts;

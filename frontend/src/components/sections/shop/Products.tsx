"use client";

import RatingStars from "@/components/ui/RatingStars";
import { allProducts } from "@public/data/allProducts";
import {
  IconFilter,
  IconHeart,
  IconLayoutGrid,
  IconList,
  IconShoppingCartPlus,
  IconSearch,
  IconStarHalfFilled,
  IconX,
  IconStarFilled,
  IconChevronDown,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@public/images/icons/logo.png";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useToggle } from "@/hooks";

const Products = () => {
  const filterTypes = [
    "Newest",
    "Best Treanding",
    "Best Selling",
    "Price Low to High",
    "Price High to Low",
  ];

  const [selectedFilter, setSelectedFilter] = useState(filterTypes[0]);

  const {
    open: filterOpen,
    handleToggle: filterToggle,
    ref: filterRef,
  } = useToggle();

  const [filterSidebar, setFilterSidebar] = useState(false);

  const sliderOneRef = useRef<HTMLInputElement | null>(null);
  const sliderTwoRef = useRef<HTMLInputElement | null>(null);
  const [minValue, setMinValue] = useState(14);
  const [maxValue, setMaxValue] = useState(900);
  const [sliderTrackStyle, setSliderTrackStyle] = useState("");

  const onSubmit = (data: any) => {
    // submit the form
  };

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      search: "",
      priceRange: { min: 14, max: 146 },
    },
  });

  const updateSliderTrackColor = useCallback(() => {
    const maxSliderValue = 1000;
    const percent1 = (minValue / maxSliderValue) * 100;
    const percent2 = (maxValue / maxSliderValue) * 100;
    setSliderTrackStyle(
      `linear-gradient(to right, #E8ECEF ${percent1}%, #F29620 ${percent1}%, #F29620 ${percent2}%, #E8ECEF ${percent2}%)`
    );
  }, [minValue, maxValue]);

  useEffect(() => {
    updateSliderTrackColor();
  }, [updateSliderTrackColor]);

  useEffect(() => {
    updateSliderTrackColor();
  }, [updateSliderTrackColor]);

  const handleMinChange = (value: number) => {
    if (value > maxValue - 10) return;
    setMinValue(value);
    setValue("priceRange", { min: value, max: maxValue });
  };

  const handleMaxChange = (value: number) => {
    if (value < minValue + 10) return;
    setMaxValue(value);
    setValue("priceRange", { min: minValue, max: value });
  };

  return (
    <section className="section-py overflow-visible relative">
      <div className="container">
        <h2 className="heading-2 text-w-neutral-1 mb-40p">Latest Products</h2>

        <div className="xl:grid xl:grid-cols-12 gap-x-30p gap-y-10">
          <aside className="xxl+:col-span-3 xl:col-span-4 relative max-xl:z-[60]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={`${
                filterSidebar
                  ? "xl:translate-x-0"
                  : "max-xl:-translate-x-[150%]"
              } xl:sticky max-xl:fixed xl:top-30 top-0 left-0 transition-1 w-full`}
            >
              <div className="relative h-screen overflow-y-auto scrollbar-sm sm:w-[400px] xsm:w-[300px] xl:w-full bg-b-neutral-4 z-20">
                <div className="xl:hidden w-full flex-y justify-between gap-20p max-xl:p-20p">
                  <Link href="index" className="shrink-0">
                    <Image
                      className="xl:w-[170px] sm:w-30 w-25 h-auto shrink-0"
                      src={logo}
                      alt="brand"
                    />
                  </Link>
                  <button
                    onClick={() => setFilterSidebar(false)}
                    className="btn-c btn-c-md btn-primary "
                  >
                    <IconX size={24} />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-24p max-xl:p-20p">
                  <div className="bg-b-neutral-3 p-24p border border-shap rounded-12">
                    <div className="border-l-2 border-primary mb-20p">
                      <span className="ml-1 heading-4">Search</span>
                    </div>
                    <div className="flex-y justify-between gap-2 w-full py-2 pl-3 pr-2 rounded-4 border border-shap">
                      <input
                        className="bg-transparent text-base text-w-neutral-1 placeholder:text-body w-full"
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search"
                      />
                      <button className="shrink-0 flex-c bg-primary text-b-neutral-4 size-8 rounded-4 icon-20">
                        <IconSearch size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-b-neutral-3 p-24p border border-shap rounded-12">
                    <div className="border-l-2 border-primary mb-20p">
                      <span className="ml-1 heading-4">Filter by Price</span>
                    </div>
                    <div className="products-price-range mt-24p">
                      <div className="range-slider  mb-24p">
                        <div
                          className="slider-track"
                          style={{ background: sliderTrackStyle }}
                        ></div>
                        <input
                          ref={sliderOneRef}
                          type="range"
                          min="0"
                          max="1000"
                          value={minValue}
                          onChange={(e) =>
                            handleMinChange(Number(e.target.value))
                          }
                        />
                        <input
                          ref={sliderTwoRef}
                          type="range"
                          min="0"
                          max="1000"
                          value={maxValue}
                          onChange={(e) =>
                            handleMaxChange(Number(e.target.value))
                          }
                        />
                      </div>
                      <div className="flex-y flex-wrap justify-between gap-20p">
                        <div className="price-values">
                          <div className="flex-y text-l-medium text-white">
                            <span>Price :</span>
                            <span className="flex gap-1 ml-1">
                              $ <span id="min-value">${minValue}</span>— ${" "}
                              <span id="max-value">{maxValue}</span>
                            </span>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn px-16p py-2 btn-primary rounded-4"
                        >
                          Filter
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-b-neutral-3 p-24p border border-shap rounded-12">
                    <div className="border-l-2 border-primary mb-24p">
                      <span className="ml-1 heading-4">Category</span>
                    </div>

                    <div className="grid grid-cols-1 *:py-2 divide-y divide-b-neutral-2 border-y border-b-neutral-2">
                      <div className="checkbox-container shrink-0">
                        <input
                          type="checkbox"
                          value="macbook"
                          id="product-1"
                          className="border-corners-checkbox"
                        />
                        <label
                          htmlFor="product-1"
                          className="border-corners-checkbox-label gap-2 text-body"
                        >
                          <i className="ti icon-24 text-body"></i>
                          MacBook Air M2
                        </label>
                      </div>
                      <div className="checkbox-container shrink-0">
                        <input
                          type="checkbox"
                          value="headphones"
                          id="product-2"
                          className="border-corners-checkbox"
                        />
                        <label
                          htmlFor="product-2"
                          className="border-corners-checkbox-label gap-2 text-body"
                        >
                          <i className="ti icon-24 text-body"></i>
                          Ear Headphones - Gold Tone
                        </label>
                      </div>
                      <div className="checkbox-container shrink-0">
                        <input
                          type="checkbox"
                          value="macbook_pro"
                          id="product-3"
                          className="border-corners-checkbox"
                        />
                        <label
                          htmlFor="product-3"
                          className="border-corners-checkbox-label gap-2 text-body"
                        >
                          <i className="ti icon-24 text-body"></i>
                          MacBook Pro
                        </label>
                      </div>
                      <div className="checkbox-container shrink-0">
                        <input
                          type="checkbox"
                          value="mic"
                          id="product-4"
                          className="border-corners-checkbox"
                        />
                        <label
                          htmlFor="product-4"
                          className="border-corners-checkbox-label gap-2 text-body"
                        >
                          <i className="ti icon-24 text-body"></i>
                          Ear Earbuds with Mic
                        </label>
                      </div>
                      <div className="checkbox-container shrink-0">
                        <input
                          type="checkbox"
                          value="watch"
                          id="product-5"
                          className="border-corners-checkbox"
                        />
                        <label
                          htmlFor="product-5"
                          className="border-corners-checkbox-label gap-2 text-body"
                        >
                          <i className="ti icon-24 text-body"></i>
                          Apple Watch SE
                        </label>
                      </div>
                      <div className="checkbox-container shrink-0">
                        <input
                          type="checkbox"
                          value="quest"
                          id="product-6"
                          className="border-corners-checkbox"
                        />
                        <label
                          htmlFor="product-6"
                          className="border-corners-checkbox-label gap-2 text-body"
                        >
                          <i className="ti icon-24 text-body"></i>
                          Meta Quest 2
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-b-neutral-3 p-24p border border-shap rounded-12">
                    <div className="border-l-2 border-primary mb-20p">
                      <span className="ml-1 heading-4">Latest Products</span>
                    </div>
                    <div className="grid grid-cols-1 gap-16p">
                      {allProducts?.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex-y gap-3">
                          <div className="shrink-0 size-100p p-3 rounded-8 bg-b-neutral-2">
                            <Image
                              className="rounded-8 "
                              src={item?.image}
                              width={100}
                              height={100}
                              alt="product"
                            />
                          </div>
                          <div>
                            <div className="flex-y gap-1 icon-16 text-primary">
                              <IconStarFilled size={16} />
                              <IconStarFilled size={16} />
                              <IconStarFilled size={16} />
                              <IconStarFilled size={16} />
                              <IconStarHalfFilled size={16} />
                            </div>
                            <Link
                              href={`/shop/${item?.id}`}
                              className="heading-5 text-white line-clamp-1 link-1 my-1"
                            >
                              {item?.name}
                            </Link>
                            <span className="text-l-regular text-body">
                              ${item?.discountPrice}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div
                onClick={() => setFilterSidebar(false)}
                className="absolute inset-0 bg-black/20"
              ></div>
            </form>
          </aside>

          <div className="xxl+:col-span-9 xl:col-span-8">
            <div className="flex flex-wrap-reverse items-center justify-between gap-24p p-16p bg-b-neutral-3 rounded-12 border border-shap mb-30p">
              <p className="text-lg text-w-neutral-1">{`Showing 1–${allProducts?.length} of ${allProducts?.length} Results`}</p>
              <div className="flex flex-wrap items-center gap-24p">
                <Listbox
                  ref={filterRef}
                  value={selectedFilter}
                  onChange={setSelectedFilter}
                  as="div"
                  className="dropdown group "
                >
                  <ListboxButton
                    onClick={filterToggle}
                    className="dropdown-toggle toggle-3"
                  >
                    Short By {selectedFilter}
                    <IconChevronDown
                      size={20}
                      className={`${filterOpen && "rotate-180"} icon-20`}
                    />
                  </ListboxButton>
                  <ListboxOptions className="dropdown-content">
                    {filterTypes.map((item, idx) => (
                      <ListboxOption
                        className={`dropdown-item capitalize font-medium ${
                          selectedFilter === item && "active"
                        }`}
                        key={idx}
                        value={item}
                      >
                        {item}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Listbox>

                <div className="flex items-center gap-2">
                  <button className="flex-c xl:hidden border border-shap hover:border-primary hover:bg-primary text-w-neutral-1 hover:text-b-neutral-4 size-48p rounded-4">
                    <IconFilter size={24} />
                  </button>
                  <button
                    onClick={() => setFilterSidebar(!filterSidebar)}
                    className="flex-c border border-shap hover:border-primary hover:bg-primary text-w-neutral-1 hover:text-b-neutral-4 size-48p rounded-4"
                  >
                    <IconLayoutGrid size={24} />
                  </button>
                  <button className="flex-c border border-shap hover:border-primary hover:bg-primary text-w-neutral-1 hover:text-b-neutral-4 size-48p rounded-4 icon-24">
                    <IconList size={24} />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid xxl+:grid-cols-3 sm:grid-cols-2 gap-30p mb-60p">
              {allProducts?.map((product, idx) => (
                <div
                  key={idx}
                  className="py-30p px-20p rounded-20 border border-shap group"
                >
                  <div className="flex-col-c overflow-hidden mb-30p">
                    <Image
                      className="w-[220px] h-[225px] group-hover:scale-105 transition-1"
                      src={product?.image}
                      alt={product?.name}
                    />
                  </div>
                  <div className="py-24p border-t border-shap pt-30p">
                    <Link
                      href={`/shop/${product?.id}`}
                      className="heading-4 text-w-neutral-1 line-clamp-1 link-1 mb-20p"
                    >
                      {product?.name}
                    </Link>
                    <div className="flex-y flex-wrap gap-x-24p gap-y-3 mb-20p">
                      <div className="flex-y gap-1">
                        <span className="text-base text-body line-through">
                          ${product?.price}
                        </span>
                        <span className="text-xl-medium text-w-neutral-1">
                          ${product?.discountPrice}
                        </span>
                      </div>
                      <div className="flex-c gap-1 icon-20 text-primary">
                        <RatingStars rating={product?.rating} />
                      </div>
                    </div>
                    <div className="flex-y justify-between 4xl:gap-6 gap-3">
                      <Link
                        href="/shopping-cart"
                        className="btn btn-md btn-neutral-3 group-hover:bg-primary group-hover:text-b-neutral-4 rounded-12"
                      >
                        <IconShoppingCartPlus size={24} />
                        Add To Cart
                      </Link>
                      <button className="shrink-0 btn-c btn-c-lg btn-c-neutral-3 group-hover:bg-secondary group-hover:text-b-neutral-4 icon-24">
                        <IconHeart size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-c mt-48p">
              <Link href="#" className="btn btn-xl py-3 btn-primary rounded-12">
                Load More...
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;

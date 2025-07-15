"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useForm } from "react-hook-form";

const GameSidebar = () => {
  const platforms = ["playstation", "xbox", "windows", "mac_os"];
  const genres = [
    "action",
    "adventure",
    "fighting",
    "flight_simulation",
    "platform",
    "racing",
  ];

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      search: "",
      priceRange: { min: 14, max: 146 },
      platforms,
      genres,
    },
  });

  const sliderOneRef = useRef<HTMLInputElement | null>(null);
  const sliderTwoRef = useRef<HTMLInputElement | null>(null);
  const [minValue, setMinValue] = useState(14);
  const [maxValue, setMaxValue] = useState(900);
  const [sliderTrackStyle, setSliderTrackStyle] = useState("");

  const onSubmit = (data: any) => {
    // submit the form
  };

  // Memoize the updateSliderTrackColor function to prevent unnecessary re-renders
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
    <div className="xl:sticky xl:top-30">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-30p *:bg-b-neutral-3 *:rounded-12 *:p-30p mb-30p">
          {/* Search Bar */}
          <div>
            <div className="flex items-center sm:gap-3 gap-2 text-w-neutral-1">
              <span className="flex-c icon-24">
                <i className="ti ti-search"></i>
              </span>
              <input
                {...register("search")}
                autoComplete="off"
                className="bg-transparent placeholder:text-w-neutral-1 w-full"
                type="text"
                placeholder="Search..."
              />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="heading-4 text-w-neutral-1 mb-16p">Price Range</h4>
            <div className="products-price-range mt-16p">
              <div className="price-values">
                <h5 className="text-18 text-G-300 font-normal">
                  <span className="flex gap-1">
                    $<span>{minValue}</span>— $<span>{maxValue}</span>
                  </span>
                </h5>
              </div>
              <div className="range-slider">
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
                  onChange={(e) => handleMinChange(Number(e.target.value))}
                />
                <input
                  ref={sliderTwoRef}
                  type="range"
                  min="0"
                  max="1000"
                  value={maxValue}
                  onChange={(e) => handleMaxChange(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="heading-4 text-w-neutral-1 mb-16p">Platforms</h4>
            <ul>
              {platforms.map((platform) => (
                <li key={platform}>
                  <div className="checkbox-container shrink-0">
                    <input
                      {...register("platforms")}
                      type="checkbox"
                      value={platform}
                      className="border-corners-checkbox"
                      id={`platform-${platform}`}
                      defaultChecked
                    />
                    <label
                      htmlFor={`platform-${platform}`}
                      className="border-corners-checkbox-label gap-2"
                    >
                      <i className="ti icon-24 text-primary"></i>
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Genres */}
          <div>
            <h4 className="heading-4 text-w-neutral-1 mb-16p">Genres</h4>
            <ul>
              {genres.map((genre) => (
                <li key={genre}>
                  <div className="checkbox-container shrink-0">
                    <input
                      {...register("genres")}
                      type="checkbox"
                      value={genre}
                      className="border-corners-checkbox"
                      id={`genres-${genre}`}
                      defaultChecked
                    />
                    <label
                      htmlFor={`genres-${genre}`}
                      className="border-corners-checkbox-label gap-2"
                    >
                      <i className="ti icon-24 text-primary"></i>
                      {genre.charAt(0).toUpperCase() + genre.slice(1)}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-md btn-primary w-full">
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default GameSidebar;

"use client";

import { useToggle } from "@/hooks";
import { Listbox } from "@headlessui/react";
import { IconChevronDown, IconPlayerPlayFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FeaturedVideosSlider from "../FeaturedVideosSlider";
import game60 from "@public/images/games/game60.png";
import game61 from "@public/images/games/game61.png";
import YoutubeVideos from "./YoutubeVideos_hl";

const featuredVideosData = [
  {
    id: 1,
    image: game60,
    title: "Turbo Drive Racing Rival",
    description: "Brace yourself for an immersive horror Whispering Shadows.",
    viewers: 270,
    tags: ["English", "Strumming"],
  },
  {
    id: 2,
    image: game61,
    title: "Rise the Eternal Realm",
    description: "Brace yourself for an immersive horror Whispering Shadows.",
    viewers: 360,
    tags: ["English", "Strumming"],
  },
];

const RecommendedVideos = () => {
  const filterTypes = ["Popular", "Action", "Adventure", "Sports"];

  const [selectedFilter, setSelectedFilter] = useState(filterTypes[0]);

  const {
    open: filterOpen,
    handleToggle: filterToggle,
    ref: filterRef,
  } = useToggle();

  return (
    <section className="section-pt">
      <div className="container">
        {/* 비디오 */}
          <YoutubeVideos/>
      </div>
    </section>
  );
};

export default RecommendedVideos;

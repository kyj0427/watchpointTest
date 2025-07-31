"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AOSInit = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init({
        easing: "ease-out-cubic",
        startEvent: "DOMContentLoaded",
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99,
        offset: 100,
        delay: 0,
        duration: 500,
        mirror: false,
        anchorPlacement: "top-bottom",
      });

      // ✅ Safe: only runs on client
      AOS.refresh();
    }
  }, []);

  return null;
};

export default AOSInit;

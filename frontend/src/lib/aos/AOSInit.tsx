"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AOSInit = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (typeof window !== "undefined") {
      // AOS 초기화 전에 잠시 대기하여 DOM이 완전히 준비되도록 함
      const timer = setTimeout(() => {
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
          once: true,
          disable: false,
        });

        AOS.refresh();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  return null;
};

export default AOSInit;

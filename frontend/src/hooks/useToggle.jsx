"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to manage a toggle state and handle click outside events.
 * @returns An object with the open state, a function to toggle the state,
 * and a ref to the element to check for outside clicks.
 */
const useToggle = () => {
  // State to track the toggle state
  const [open, setOpen] = useState(false);

  // Ref to the element to check for outside clicks
  const ref = useRef(null);

  /**
   * Event handler for click outside events.
   * @param event - The mouse event.
   */
  const handleClickOutside = (event) => {
    // If the click target is outside the ref element, close the toggle
    if (
      window.scrollY > 100 ||
      (ref.current && !ref.current.contains(event.target))
    ) {
      setOpen(false);
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 180) {
      setOpen(false);
    }
  };

  // Add and remove the click outside event listener on mount and unmount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * Function to toggle the toggle state.
   */
  const handleToggle = () => {
    setOpen(!open);
  };

  // Return the state, toggle function, and ref
  return { open, handleToggle, ref };
};
export default useToggle;

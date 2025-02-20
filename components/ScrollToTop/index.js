"use client";
import React, { useEffect } from "react";

const ScrollToTop = () => {
  useEffect(() => {
    const result = document.querySelector(".scroll-top");

    if (!result) return;

    const handleScroll = () => {
      if (window.scrollY > 200) {
        result.classList.add("open");
      } else {
        result.classList.remove("open");
      }
    };

    const handleClick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    document.addEventListener("scroll", handleScroll);
    result.addEventListener("click", handleClick);

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      document.removeEventListener("scroll", handleScroll);
      result.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <button className="scroll-top scroll-to-target" data-target="html">
      <i className="icon-chevrons-up"></i>
    </button>
  );
};

export default ScrollToTop;

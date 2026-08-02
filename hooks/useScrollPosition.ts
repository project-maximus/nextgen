"use client";

import { useEffect, useState } from "react";

/** rAF-throttled scroll-Y tracker. Pass a threshold to get a stable "past N px" boolean too. */
export function useScrollPosition(threshold = 0) {
  const [scrollY, setScrollY] = useState(0);
  const [pastThreshold, setPastThreshold] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setScrollY(window.scrollY);
      setPastThreshold(window.scrollY > threshold);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { scrollY, pastThreshold };
}

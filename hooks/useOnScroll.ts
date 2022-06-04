import { useState, useEffect } from "react";

export const useOnScroll = () => {
  const [showFixed, setShowFixed] = useState(false);

  useEffect(() => {
    const onScroll = (e: Event) => {
      setShowFixed(window.scrollY > 0);
    };
    document.addEventListener("scroll", onScroll);
    if (window.scrollY > 0) setShowFixed(true);

    return () => document.removeEventListener("scroll", onScroll);
  }, []); //eslint-disable-line

  return { showFixed };
};

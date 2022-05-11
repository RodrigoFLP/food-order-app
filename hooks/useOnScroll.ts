import { useState, useEffect } from "react";

export const useOnScroll = () => {
  const [showFixed, setShowFixed] = useState(false);

  useEffect(() => {
    const onScroll = (e: Event) => {
      const newShowFixed = window.scrollY > 0;
      showFixed !== newShowFixed && setShowFixed(newShowFixed);
    };
    document.addEventListener("scroll", onScroll);

    return () => document.removeEventListener("scroll", onScroll);
  });

  return { showFixed };
};

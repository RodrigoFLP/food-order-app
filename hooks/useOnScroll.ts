import { useState, useEffect, useRef } from "react";

export const useOnScroll = ({ margin = 200 }) => {
  const [showFixed, setShowFixed] = useState(false);

  const elementRef = useRef<HTMLDivElement | null>(null);

  const scrollToLeft = () => {
    elementRef.current?.scrollTo({ left: 100, behavior: "smooth" });
  };

  useEffect(() => {
    if (!elementRef?.current) return;

    const onScroll = (e: Event) => {
      const newShowFixed =
        !(elementRef?.current!.scrollLeft > margin) &&
        elementRef?.current!.scrollWidth > elementRef?.current!.clientWidth;

      newShowFixed !== showFixed && setShowFixed(newShowFixed);
    };

    elementRef!.current.addEventListener("scroll", onScroll);
  });

  useEffect(() => {
    setTimeout(() => {
      const newShowFixed =
        elementRef?.current!.scrollWidth > elementRef?.current!.clientWidth;
      setShowFixed(newShowFixed);
    }, 200);
  }, [elementRef]);

  return { showFixed, elementRef, scrollToLeft };
};

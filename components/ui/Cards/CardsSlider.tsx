import { FC, ReactNode } from "react";
import { ArrowRight, Plus } from "tabler-icons-react";
import { useOnScroll } from "../../../hooks";

interface Props {
  children: ReactNode;
}

export const CardsSlider: FC<Props> = ({ children }) => {
  const { elementRef, showFixed, scrollToLeft } = useOnScroll({ margin: 0 });

  return (
    <>
      <div className="relative ">
        {showFixed && (
          <div
            onClick={scrollToLeft}
            className="h-6 w-6 bg-red-500 flex justify-center items-center rounded-full absolute z-10 right-0 top-2 animate-pulse cursor-pointer"
          >
            <ArrowRight color="white" size={18} />
          </div>
        )}
        <div
          className="h-14 w-20  right-0 absolute z-10 bottom-0 bg-opacity-25 pointer-events-none
            bg-gradient-to-l "
        ></div>
        <div
          className="flex flex-row overflow-scroll space-x-2 relative no-scrollbar pr-10 w-full h-12 opacity-gradient"
          ref={elementRef}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default CardsSlider;

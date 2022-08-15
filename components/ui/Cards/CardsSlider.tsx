import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const CardsSlider: FC<Props> = ({ children }) => {
  return (
    <div className="relative">
      <div
        className="h-14 w-20 right-0 absolute z-10 bottom-0 bg-opacity-25 pointer-events-none
            bg-gradient-to-l "
      ></div>
      <div className="flex flex-row overflow-scroll space-x-2 relative no-scrollbar pr-10 w-full h-12">
        {children}
      </div>
    </div>
  );
};

export default CardsSlider;

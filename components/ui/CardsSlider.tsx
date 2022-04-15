import { FC, ReactNode } from "react";
import SliderButton from "./SliderButton";


interface Props {
    children: ReactNode;
}

export const CardsSlider: FC<Props> = ({ children }) => {

    return (
        <div className="relative">
            <div className="flex flex-row overflow-scroll space-x-2 relative no-scrollbar pr-10 w-full">
                {children}

            </div>
            <div className="h-14 w-20 right-0 absolute bottom-0 bg-opacity-25 pointer-events-none
            bg-gradient-to-l from-slate-50">

            </div>
        </div>


    );
}

export default CardsSlider;
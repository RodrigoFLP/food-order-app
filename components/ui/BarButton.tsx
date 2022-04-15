import { FC } from "react";
import { ArrowRight } from 'react-feather';


interface Props {
    title: string;
}


export const BarButton: FC<Props> = ({ title }) => {

    return (
        <button className="bg-primary w-full text-white font-semibold h-12 rounded-2xl 
        flex items-center justify-between space-x-4 px-4
        hover:scale-95 transition-all">

            <span>
                {title}
            </span>
            <ArrowRight />
        </button>
    );
}


export default BarButton;
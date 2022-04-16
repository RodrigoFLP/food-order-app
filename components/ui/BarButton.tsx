import { type } from "os";
import { FC, FormEvent, FormEventHandler } from "react";
import { ArrowRight } from 'react-feather';


interface Props {
    title: string;
    type?: "button" | "submit" | "reset" | undefined;

}


export const BarButton: FC<Props> = ({ title, type }) => {



    return (
        <button type={type} className="bg-primary w-full text-white font-semibold h-12 rounded-2xl 
        flex items-center justify-between space-x-4 px-4
        active:scale-95 transition-all active:bg-secondary"
        >

            <span>
                {title}
            </span>
            <ArrowRight />
        </button>
    );
}


export default BarButton;
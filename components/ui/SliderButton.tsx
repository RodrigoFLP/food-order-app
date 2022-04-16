import { useRouter } from "next/router";
import { FC } from "react";


interface Props {
    title: string;
    selected: boolean;
    onSelect: Function;
}

export const SliderButton: FC<Props> = ({ title, selected = false, onSelect }) => {

    const router = useRouter();

    return (

        <button className={`whitespace-nowrap 
         font-semibold text-sm active:scale-95
         px-4 py-2 rounded-3xl transition-all
        hover:bg-primary hover:text-white
         ${selected ? 'bg-primary text-white' : 'bg-shade text-black'}`}
            onClick={() => onSelect(title)}>
            {title}
        </button>
    );
}

export default SliderButton;
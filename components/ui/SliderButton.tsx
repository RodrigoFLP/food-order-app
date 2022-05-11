import { useRouter } from "next/router";
import { FC } from "react";


interface Props {
    category: any;
    selected: boolean;
    onSelect: Function;
}

export const SliderButton: FC<Props> = ({ category, selected = false, onSelect }) => {

    const router = useRouter();

    return (

        <button className={`animate-opacityin whitespace-nowrap 
         font-semibold text-sm active:scale-95 shadow-sm
         h-10 px-4 py-2 rounded-3xl transition-all
        hover:bg-primary hover:text-white 
        active:bg-secondary
         ${selected ? 'bg-primary text-white' : 'bg-white text-black'}`}
            onClick={() => onSelect(category)}>
            {category.name}
        </button>
    );
}

export default SliderButton;
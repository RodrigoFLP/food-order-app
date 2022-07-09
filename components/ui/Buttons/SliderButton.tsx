import { useRouter } from "next/router";
import { FC, LegacyRef } from "react";

interface Props {
  category: any;
  selected: boolean;
  onSelect: Function;
  ref?: LegacyRef<HTMLButtonElement> | undefined;
}

export const SliderButton: FC<Props> = ({
  category,
  selected = false,
  onSelect,
  ref,
}) => {
  return (
    <button
      className={`animate-opacityin whitespace-nowrap 
         font-semibold text-sm active:scale-95 shadow-sm
         h-10 px-4 py-2 rounded-3xl transition-all
        hover:bg-primary hover:text-white border
        active:bg-secondary
         ${selected ? "bg-primary text-white" : "bg-white text-black"}`}
      ref={ref}
      onClick={() => onSelect(category.id)}
    >
      {category.name}
    </button>
  );
};

export default SliderButton;

import { FC } from "react";
import { Portion } from "../../interfaces";

interface Props {
  portions: Portion[];
  selectedPortion: string;
  handleChange: (portion: Portion) => void;
}

export const PortionsList: FC<Props> = ({
  portions,
  handleChange,
  selectedPortion,
}) => {
  return (
    <section className="space-y-0">
      <h2 className="font-semibold text-lg">Porciones</h2>
      <p className="text-sm text-gray-700">Selecciona el tamaño del platillo</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 justify-between text-sm pt-4">
        {portions.map((portion) => (
          <button
            key={portion.name}
            className={`${
              selectedPortion == portion.name
                ? "bg-primary text-white"
                : "bg-shade text-black"
            } 
                    p-2 px-4 rounded-3xl border border-dashed border-gray-300 hover:bg-primary font-medium
                    hover:text-white active:scale-95 active:bg-secondary shadow-sm cursor-pointer`}
            onClick={() => handleChange(portion)}
          >
            {portion.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default PortionsList;

import { FC } from "react";

interface Portion {
  name: string;
  price: number;
}

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
    <section className="space-y-4">
      <h2 className="font-semibold text-xl">Porciones</h2>
      <p className="text-sm">Selecciona el tamaño del platillo</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 justify-between text-sm">
        {portions.map((portion) => (
          <button
            key={portion.name}
            className={`${
              selectedPortion == portion.name
                ? "bg-primary text-white"
                : "bg-shade text-black"
            } 
                    p-2 px-4 rounded-3xl border border-dashed border-gray-300 hover:bg-primary 
                    hover:text-white active:scale-95 active:bg-secondary shadow-md cursor-pointer`}
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

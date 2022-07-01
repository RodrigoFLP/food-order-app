import { FC, MouseEventHandler, ReactNode } from "react";
import { AlertCircle, Check, CheckCircle, Icon } from "react-feather";

interface Props {
  type?: "button" | "submit" | "reset" | undefined;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  isSelected: boolean;
}

export const LocationButton: FC<Props> = ({
  type,
  handleClick,
  disabled = false,
  isSelected = true,
}) => {
  return (
    <button
      type={type}
      className="bg-white w-full text-black border border-gray-300 font-regular h-12 
        rounded-lg flex items-center justify-between space-x-4 px-4
        active:scale-95 transition-all active:bg-secondary active:text-white hover:opacity-80
        disabled:grayscale disabled:opacity-20 disabled:pointer-events-none"
      onClick={handleClick}
      disabled={disabled}
    >
      {isSelected ? "Ubicación seleccionada" : "Seleccionar ubicación"}
      {isSelected ? (
        <CheckCircle className="text-green-500" />
      ) : (
        <AlertCircle />
      )}
    </button>
  );
};

export default LocationButton;

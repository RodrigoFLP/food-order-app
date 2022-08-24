import { MouseEventHandler, ReactNode } from "react";

export const StepButton = ({
  disabled,
  onClick,
  icon,
  title,
}: {
  disabled: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon: ReactNode;
  title: string;
}) => {
  return (
    <button
      // disabled={disabled}
      className={`${
        !disabled ? "bg-primary text-white" : "bg-shade pointer-events-none"
      } p-2 flex-1 rounded-lg
      hover:scale-95 active:bg-secondary active:text-white transition-all flex justify-center h-12 w-full`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon}
        <div className="pl-4">{title}</div>
      </div>
    </button>
  );
};

export default StepButton;

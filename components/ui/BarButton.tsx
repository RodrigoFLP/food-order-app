import { type } from "os";
import {
  FC,
  FormEvent,
  FormEventHandler,
  MouseEventHandler,
  ReactNode,
} from "react";
import { ArrowRight, Icon } from "react-feather";

interface Props {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  Icon?: Icon;
  disabled?: boolean;
}

export const BarButton: FC<Props> = ({
  children,
  type,
  handleClick,
  Icon,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className="bg-primary w-full text-white font-semibold h-12 
        rounded-lg flex items-center justify-between space-x-4 px-4
        active:scale-95 transition-all active:bg-secondary hover:opacity-80
        disabled:grayscale disabled:opacity-20 disabled:pointer-events-none"
      onClick={handleClick}
      disabled={disabled}
    >
      {children}

      {Icon && <Icon />}
    </button>
  );
};

export default BarButton;

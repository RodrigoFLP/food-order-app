import { FC, HTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { Icon } from "react-feather";

interface Props {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  Icon?: Icon;
  disabled?: boolean;
  size?: "sm" | "base";
}

const styles = {
  sm: "h-10",
  base: "h-12",
};

export const BarButton: FC<Props> = ({
  children,
  type,
  handleClick,
  Icon,
  disabled = false,
  size = "base",
}) => {
  return (
    <button
      type={type}
      className={`bg-primary relative w-full text-white font-semibold ${styles[size]}  
        rounded-lg flex items-center justify-between space-x-4 px-4
        active:scale-95 transition-all active:bg-secondary hover:opacity-80
        disabled:grayscale disabled:opacity-20 disabled:pointer-events-none`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}

      {Icon && <Icon />}
    </button>
  );
};

export default BarButton;

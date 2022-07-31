import { FC, MouseEventHandler, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: boolean;
}

export const ButtonIcon: FC<Props> = ({ children, style = false, onClick }) => {
  return (
    <button
      className={`${
        style
          ? "bg-primary hover:bg-primary hover:bg-opacity-80 text-white"
          : "bg-white border shadow-sm hover:bg-gray-200"
      }  h-8 w-8 rounded-full
        active:scale-90  transition-all
        flex items-center justify-center
        p-2  `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonIcon;

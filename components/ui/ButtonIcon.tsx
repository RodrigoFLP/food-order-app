import { FC, MouseEventHandler, ReactNode } from "react";


interface Props {
    children: ReactNode;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    style?: string;
}


export const ButtonIcon: FC<Props> = ({ children, style = '', handleClick }) => {

    return (
        <button className={`bg-shade h-8 w-8 rounded-full
        active:scale-90 hover:bg-gray-200 transition-all
        flex items-center justify-center
        p-2 ${style} `}
            onClick={handleClick}>
            {children}
        </button>
    )
}

export default ButtonIcon;
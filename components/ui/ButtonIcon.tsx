import { FC, ReactNode } from "react";


interface Props {
    children: ReactNode;
    style?: string;
}


export const ButtonIcon: FC<Props> = ({ children, style = '' }) => {

    return (
        <button className={`bg-shade h-8 w-8 rounded-full
        active:scale-90 hover:bg-gray-200 transition-all
        flex items-center justify-center
        p-2 ${style} `}>
            {children}
        </button>
    )
}

export default ButtonIcon;
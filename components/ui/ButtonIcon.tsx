import { FC, ReactNode } from "react";


interface Props {
    children: ReactNode;
}


export const ButtonIcon: FC<Props> = ({ children }) => {

    return (
        <button className="bg-shade h-8 w-8 rounded-full
        hover:scale-90 hover:bg-gray-200 transition-all
        flex items-center justify-center
        p-2">
            {children}
        </button>
    )
}

export default ButtonIcon;
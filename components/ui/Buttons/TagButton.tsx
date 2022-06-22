import { FC, ReactNode } from "react";


interface Props {
    isSelected: boolean;
    children: ReactNode
}


export const TagButton: FC<Props> = ({ isSelected, children }) => {

    return (
        <button className="bg-shade text-black p-2 px-4 rounded-3xl border border-dashed 
                                    border-gray-300 hover:bg-primary hover:text-white 
                                    active:scale-95 active:bg-secondary shadow-md cursor-pointer">
            {children}
        </button>
    )
}

export default TagButton;
import { FC, ReactNode, useEffect, useState, } from "react";
import { createPortal } from 'react-dom';

interface Props {
    children: ReactNode;
    className?: string;
    el?: string;
    show: boolean;
}

export const Modal: FC<Props> = ({ children, className = 'root-portal', el = 'div', show }) => {

    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
        const container = document.createElement(el)
        container.classList.add(className)
        document.body.appendChild(container)
        // document.body.style.overflow = 'hidden';
        return () => {
            document.body.removeChild(container)
        }
    }, [])

    return isBrowser ? createPortal(children, document.createElement(el)) : null;
    // return (
    //     <div className="z-30 bg-black w-full h-full absolute top-0 left-0 bg-opacity-25
    //     flex justify-center items-center">
    //         <div className="bg-white z-40 w-11/12 h-5/6 md:w-1/2 md:h-1/2 rounded-xl">
    //             Hola
    //         </div>
    //     </div>
    // );


}

export default Modal;
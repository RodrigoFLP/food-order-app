import { FC, ReactNode, useEffect, useState, } from "react";
import { createPortal } from 'react-dom';

interface Props {
    children: ReactNode;
}

export const ModalContainer: FC<Props> = ({ children }) => {

    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {


        document.body.style.overflow = 'hidden';
        setIsBrowser(true);

        return () => {
            document.body.style.overflow = 'scroll'
        }
    }, [])

    return isBrowser ? createPortal(children, document.body) : null;
}

export default ModalContainer;
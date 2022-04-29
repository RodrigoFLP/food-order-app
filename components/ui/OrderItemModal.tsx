import { FC } from "react";
import ModalContainer from "./ModalContainer";


interface Props {
    handleClose: () => void;
}


export const OrderItemModal: FC<Props> = ({ handleClose }) => {


    return (
        <ModalContainer>
            <div className="z-40 w-full h-screen fixed top-0 left-0
                flex justify-center items-center">
                <div className="bg-white fixed z-50 w-11/12 h-4/6 md:w-3/4 md:h-3/4 
                rounded-3xl overflow-hidden border flex flex-col justify-between
                animate-bouncein">
                    <div className="pt-4 flex justify-center items-center font-bold text-lg">
                        Selecciona tu ubicación
                    </div>
                    <div className="z-30 bg-black w-full h-screen fixed 
                top-0 left-0 bg-opacity-50 animate-opacityin backdrop-blur-sm cursor-pointer"
                        onClick={handleClose}>
                    </div>
                </div>
            </div>
        </ModalContainer>
    )
}

export default OrderItemModal;
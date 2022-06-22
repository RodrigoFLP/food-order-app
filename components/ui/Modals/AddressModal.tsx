import { FC } from "react";

import ModalContainer from "./ModalContainer";

import "leaflet/dist/leaflet.css";
import { toast, ToastContainer } from "react-toastify";
import { AddressForm } from "../Forms/AddressForm";

interface Props {
  show: boolean;
  handleClose: () => void;
}

export const AddressModal: FC<Props> = ({ show = false, handleClose }) => {
  return show ? (
    <ModalContainer>
      <div
        className="z-40 w-full h-screen fixed top-0 left-0
                flex justify-center items-center"
      >
        <div
          className="bg-white fixed z-50 w-11/12 h-4/6 md:w-3/4 md:h-3/4 
                rounded-2xl overflow-scroll flex flex-col
                animate-bouncein shadow-md p-4 [-webkit-scrollbar:none]"
        >
          <h1 className="font-semibold text-xl">Edita la dirección</h1>
          <AddressForm />
        </div>
        <div
          className="z-30 bg-black w-full h-screen fixed 
                top-0 left-0 bg-opacity-50 animate-opacityin cursor-pointer"
          onClick={handleClose}
        ></div>
      </div>
      <ToastContainer />
    </ModalContainer>
  ) : null;
};

export default AddressModal;

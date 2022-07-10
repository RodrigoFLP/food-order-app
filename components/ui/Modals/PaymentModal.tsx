import { createRef, FC, useEffect, useRef, useState } from "react";

import ModalContainer from "./ModalContainer";

import "leaflet/dist/leaflet.css";
import { toast, ToastContainer } from "react-toastify";
import { AddressForm } from "../Forms/AddressForm";
import { Address, Coordinate } from "../../../interfaces";
import MapForm from "../Forms/MapForm";
import { ArrowLeft } from "react-feather";

import "react-toastify/dist/ReactToastify.css";
import { findDOMNode } from "react-dom";
import { type } from "os";

interface Props {
  show: boolean;
  src: string;
  handleClose: () => void;
}

export const PaymentModal: FC<Props> = ({ show = false, handleClose, src }) => {
  useEffect(() => {
    window.addEventListener("message", (ev) => {
      if (ev.data.type === "confirmation" && ev.data.message) {
        handleClose();
      }
    });
  }, []);

  return show ? (
    <ModalContainer>
      <div
        className="z-40 w-full h-screen fixed top-0 left-0
                flex justify-center items-center overflow-hidden pointer-events-none"
      >
        <div
          className="bg-white fixed z-50 w-11/12 h-4/6 md:w-3/4 md:h-3/4 
                rounded-2xl overflow-scroll flex
                animate-bouncein shadow-md scrollbar-hide pointer-events-auto"
        >
          <iframe className="w-full h-full" src={src}></iframe>
        </div>
      </div>
      <div
        className="z-30 bg-black w-full h-screen fixed 
                top-0 left-0 bg-opacity-50 animate-opacityin cursor-pointer"
        onClick={handleClose}
      ></div>
      <ToastContainer />
    </ModalContainer>
  ) : null;
};

export default PaymentModal;

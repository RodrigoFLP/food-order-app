import { FC, ReactNode, useEffect, useState } from "react";

import ModalContainer from "./ModalContainer";

interface Props {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const RightModal: FC<Props> = ({ show, onClose, children }) => {
  return show ? (
    <ModalContainer>
      <div className="bg-white w-full sm:w-8/12 md:w-6/12 lg:w-4/12 right-0 animate-slideinright h-screen fixed top-0 z-40">
        {children}
      </div>

      <div
        onClick={onClose}
        className="z-30 bg-black w-full h-screen fixed 
                top-0 left-0 bg-opacity-50 animate-opacityin cursor-pointer"
      ></div>
    </ModalContainer>
  ) : null;
};

export default RightModal;

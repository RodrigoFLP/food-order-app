import { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
}

export const ModalContainer: FC<Props> = ({ children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  useEffect(() => {
    document.body.style.marginRight = `${getScrollbarWidth()}px`;
    document.body.style.overflow = "hidden";

    setIsBrowser(true);

    return () => {
      document.body.style.overflowY = "scroll";
      document.body.style.marginRight = "0px";
    };
  }, []);

  return isBrowser
    ? createPortal(children, document.getElementById("modal-root")!)
    : null;
};

export default ModalContainer;

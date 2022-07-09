import { useState } from "react";
import { X } from "react-feather";
import { ButtonIcon } from "../Buttons";

export const EmailAlert = () => {
  const [show, setShow] = useState(true);

  return show ? (
    <div
      className=" p-4 fixed bottom-0 z-50 text-white m-4 rounded-xl r-0
  text-sm animate-opacityin animate-bouncein clip-rect bg-primary shadow-md
  "
    >
      Tú email no ha sido confirmado. Revisa tu correo o{" "}
      <span className="underline font-semibold">reenvía la confirmación</span>
      <div className="absolute -top-3 -right-3">
        <ButtonIcon handleClick={() => setShow(false)}>
          <X color="black" />
        </ButtonIcon>
      </div>
    </div>
  ) : null;
};

export default EmailAlert;

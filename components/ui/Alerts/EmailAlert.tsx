import { useState } from "react";
import { X } from "react-feather";
import { toast, ToastContainer } from "react-toastify";
import { useResendConfirmationMutation } from "../../../services/api";
import { ButtonIcon } from "../Buttons";

export const EmailAlert = () => {
  const [show, setShow] = useState(true);

  const [resendConfirmation, result] = useResendConfirmationMutation();

  const handleResendConfirmation = async () => {
    try {
      await resendConfirmation().unwrap();
      toast("Se ha enviado el correo", {
        toastId: "confirmation",
        type: "success",
        position: "top-right",
      });
    } catch (err) {
      toast("No se ha podido reenviar, intenta en 30 segundos", {
        toastId: "confirmation",
        type: "error",
        position: "top-right",
      });
    }
  };

  return show ? (
    <>
      <div
        className="p-4 text-white m-4 rounded-lg r-0
  text-sm animate-opacityin animate-bouncein clip-rect bg-primary shadow-md backdrop-blur-md
  "
      >
        Tú email no ha sido confirmado. Revisa tu correo o{" "}
        <span
          onClick={handleResendConfirmation}
          className="underline font-semibold cursor-pointer"
        >
          reenvía la confirmación
        </span>
        <div className="absolute -top-3 -right-3">
          <ButtonIcon onClick={() => setShow(false)}>
            <X color="black" />
          </ButtonIcon>
        </div>
      </div>
      <ToastContainer />
    </>
  ) : null;
};

export default EmailAlert;

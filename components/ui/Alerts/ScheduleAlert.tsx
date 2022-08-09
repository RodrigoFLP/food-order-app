import { useState } from "react";
import { X } from "react-feather";
import { ButtonIcon } from "../Buttons";

export const ScheduleAlert = () => {
  const [show, setShow] = useState(true);

  return show ? (
    <div
      className="p-4 text-white m-4 rounded-lg r-0
  text-sm animate-opacityin animate-bouncein clip-rect bg-primary shadow-md backdrop-blur-md
  "
    >
      ¡Pancho&apos;s Villa se encuentra{" "}
      <span className="font-bold">cerrado</span> en este momento!
      <div className="absolute -top-3 -right-3">
        <ButtonIcon onClick={() => setShow(false)}>
          <X color="black" />
        </ButtonIcon>
      </div>
    </div>
  ) : null;
};

export default ScheduleAlert;

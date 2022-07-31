import { FC } from "react";
import { Minus, Plus } from "react-feather";
import { ButtonIcon } from "./Buttons";

interface Props {
  onPlusClick: () => void;
  onMinusClick: () => void;
  count: number;
}

export const Counter: FC<Props> = ({ onPlusClick, onMinusClick, count }) => {
  return (
    <div className="flex flex-row space-x-4 items-center p-2">
      <ButtonIcon onClick={onMinusClick}>
        <Minus />
      </ButtonIcon>

      <span className="font-bold text-sm">{count}</span>

      <ButtonIcon style={true} onClick={onPlusClick}>
        <Plus color="white" />
      </ButtonIcon>
    </div>
  );
};

export default Counter;

import { FC } from "react";

interface Props {
  isActivated: boolean;
}

export const StepSeparator: FC<Props> = ({
  isActivated = false,
}: {
  isActivated: boolean;
}) => {
  return (
    <div
      className={`w-[4px] transition-all h-6 ${
        isActivated ? "bg-primary" : "bg-gray-300"
      } ml-4`}
    ></div>
  );
};

export default StepSeparator;

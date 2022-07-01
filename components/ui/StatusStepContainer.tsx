import React, { FC, ReactNode } from "react";
import { Check } from "react-feather";

interface Props {
  showStepLine?: boolean;
  title: string;
  subtitle: string | null;
  isDone: boolean;
}

const StatusStepContainer: FC<Props> = ({
  showStepLine = true,
  isDone = false,
  title,
  subtitle,
}) => {
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col">
        <div
          className={`ml-1 h-4 w-4 rounded-full flex items-center justify-center ${
            isDone ? "bg-primary" : "bg-gray-300"
          }`}
        >
          {isDone && <Check size={12} color={"white"} />}
        </div>
        {showStepLine && (
          <div className="flex-1 h-auto bg-gray-300 w-[2px] ml-[0.71rem]" />
        )}
      </div>
      <div className="relative -top-1 pb-6">
        <h2 className="font-semibold">{title}</h2>
        {subtitle && <h3 className="text-sm text-gray-800">{subtitle}</h3>}
      </div>
    </div>
  );
};

export default StatusStepContainer;

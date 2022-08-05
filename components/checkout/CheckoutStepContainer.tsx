import { FC, ReactNode } from "react";
import { Check } from "react-feather";

interface Props {
  children: ReactNode;
  title: string;
  stepNumber: number;
  disabled: boolean;
  isDone?: boolean;
}

export const CheckoutStepContainer: FC<Props> = ({
  children,
  title,
  stepNumber,
  disabled,
  isDone = false,
}) => {
  return (
    <section
      className={`flex flex-row bg-white rounded-xl
            overflow-hidden transition-all ${
              disabled && "grayscale opacity-30 pointer-events-none"
            } `}
    >
      <div className="h-auto bg-primary text-xl text-white font-extrabold p-4 pr-8 w-12">
        {isDone ? <Check size={20} /> : stepNumber}
      </div>
      <div className="-ml-2 bg-white rounded-md p-4 space-y-4 w-full">
        <h2 className="font-semibold">{title}</h2>
        {children}
      </div>
    </section>
  );
};

export default CheckoutStepContainer;

import { FC, HTMLInputTypeAttribute } from "react";
import { Icon } from "react-feather";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  error: boolean;
  errorMessage?: string;
  Icon: Icon;
  register?: UseFormRegisterReturn;
  type?: HTMLInputTypeAttribute;
}

export const Input: FC<Props> = ({
  label,
  error,
  errorMessage,
  Icon,
  register,
  type,
}) => {
  return (
    <div className="relative">
      {error && (
        <label className="block text-xs right-0 self-center text-right pb-1 rounded-md text-red-500">
          {errorMessage}
        </label>
      )}

      <div className="relative flex-grow w-full">
        <input
          type={type}
          {...register}
          className={`relative form-select form-select-lg appearance-none block 
                pl-4 pr-12 pt-6 pb-1 text-base font-normal text-gray-700 
        bg-white bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out m-0
        focus:text-gray-700 focus:bg-white ${
          error
            ? "focus:outline-red-500 border-2 border-red-500"
            : "focus:outline-blue-400 border-gray-300 border border-solid "
        } w-full peer`}
          aria-label=".form-select-lg example"
          defaultValue=""
        />

        <label
          className={`z-20 absolute pointer-events-none text-xs mx-4 top-0 pt-2 rounded-md ${
            error
              ? "peer-focus:text-red-500 text-red-500"
              : "peer-focus:text-blue-400"
          }  transition-colors`}
        >
          {label}
        </label>

        <Icon
          size={16}
          className={` stroke-gray-600 absolute top-0 right-4 ${
            error
              ? "peer-focus:stroke-red-500 stroke-red-500"
              : "peer-focus:stroke-blue-400"
          } peer-focus:stroke-blue-400 h-14 pointer-events-none`}
        />
      </div>
    </div>
  );
};

export default Input;

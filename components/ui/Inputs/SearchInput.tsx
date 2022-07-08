import {
  ChangeEventHandler,
  FC,
  HTMLInputTypeAttribute,
  MouseEventHandler,
} from "react";
import { Icon } from "react-feather";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  error: boolean;
  errorMessage?: string;
  Icon: Icon;
  register?: UseFormRegisterReturn;
  type?: HTMLInputTypeAttribute;
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<SVGElement>;
}

export const SearchInput: FC<Props> = ({
  label,
  error,
  errorMessage,
  Icon,
  register,
  type,
  onChange,
  onClick,
  value,
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
          onChange={onChange}
          value={value}
          type={type}
          {...register}
          className={`relative form-select form-select-lg appearance-none block 
                pl-8 pr-12 py-4 text-base font-normal text-gray-700 
        bg-shade bg-clip-padding bg-no-repeat rounded-full transition ease-in-out m-0
        focus:text-gray-700 focus:bg-white hover:bg-white hover:outline-blue-400 z-0 ${
          error
            ? "focus:outline-red-500 border-2 border-red-500"
            : "focus:outline-blue-400"
        } w-full peer`}
          aria-label=".form-select-lg example"
          defaultValue=""
          placeholder="Buscar"
        />
        <Icon
          size={16}
          onClick={value ? onClick : undefined}
          className={` stroke-gray-600 absolute top-0 right-4 drop-shadow-md stroke-[3px] ${
            error
              ? "peer-focus:stroke-red-500 stroke-red-500"
              : "peer-focus:stroke-blue-400"
          } peer-focus:stroke-blue-400 h-14 ${value && "cursor-pointer"}
           `}
        />
      </div>
    </div>
  );
};

export default SearchInput;

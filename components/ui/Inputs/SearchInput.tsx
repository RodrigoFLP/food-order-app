import { FC, HTMLInputTypeAttribute } from "react";
import { Icon } from 'react-feather';
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
    label: string;
    error: boolean;
    errorMessage?: string;
    Icon: Icon
    register?: UseFormRegisterReturn;
    type?: HTMLInputTypeAttribute;
}

export const SearchInput: FC<Props> = ({
    label,
    error,
    errorMessage,
    Icon,
    register,
    type,
}) => {
    return (
        <div className="relative">

            {error &&
                <label
                    className="block text-xs right-0 self-center text-right pb-1 rounded-md text-red-500">
                    {errorMessage}
                </label>
            }

            <div className="relative flex-grow w-full">

                <input
                    type={type}
                    {...register}
                    className={`relative shadow-sm form-select form-select-lg appearance-none block 
                pl-4 pr-12 py-4 text-base font-normal text-gray-700 
        bg-white bg-clip-padding bg-no-repeat rounded-2xl transition ease-in-out m-0
        focus:text-gray-700 focus:bg-white ${error
                            ? "focus:outline-red-500 border-2 border-red-500"
                            : "focus:outline-blue-400"
                        } w-full peer`}
                    aria-label=".form-select-lg example"
                    defaultValue=''
                    placeholder="Buscar"
                />
                <Icon
                    size={16}
                    className={` stroke-gray-600 absolute top-0 right-4 ${error
                        ? "peer-focus:stroke-red-500 stroke-red-500"
                        : "peer-focus:stroke-blue-400"
                        } peer-focus:stroke-blue-400 h-14 pointer-events-none`}
                />

            </div>
        </div>
    );
};

export default SearchInput;
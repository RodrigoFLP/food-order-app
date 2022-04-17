import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";


interface Props {
    label: string;
    error: boolean;
    errorMessage?: string;
    register?: UseFormRegisterReturn;
}

export const DateInput: FC<Props> = ({
    label,
    error,
    errorMessage,
    register
}) => {

    return (
        <div className="relative">

            {error &&
                <label
                    className="block text-xs right-0
                    text-right pb-1 rounded-md text-red-500">
                    {errorMessage}
                </label>
            }
            <div className="relative flex-grow w-full">


                <input
                    {...register}
                    className={`relative form-select form-select-lg appearance-none block 
            pl-4 pr-3 pt-6 pb-1 text-base font-normal text-gray-700 
    bg-white bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out m-0
    focus:text-gray-700 focus:bg-white ${error
                            ? "focus:outline-red-500 border-2 border-red-500"
                            : "focus:outline-blue-400 border-gray-300 border border-solid "
                        } w-full peer`}
                    type="date" />

                <label
                    className={`z-20 absolute pointer-events-none text-xs mx-4 top-0 pt-2 rounded-md ${error
                        ? "peer-focus:text-red-500 text-red-500"
                        : "peer-focus:text-blue-400"
                        }  transition-colors`}
                >
                    {label}
                </label>
            </div>

        </div>
    );
}


export default DateInput;
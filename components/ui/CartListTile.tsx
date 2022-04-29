import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import ButtonIcon from "./ButtonIcon";
import { Plus, Minus, Trash } from 'react-feather';

interface Props {
    title: string;
    description: string;
    src: string;
    price: number;
    onClick: () => void;
}

export const CartListTile: FC<Props> = ({ title, description, src, price, onClick }) => {



    return (
        // <Link href={`/menu/${title}`} passHref>
        <div className="w-full h-28 flex rounded-2xl border bg-white 
        shadow-gray-100 overflow-hidden space-x-4 transition-all cursor-pointer"
            onClick={onClick}>
            <div id="image" className="w-24 bg-slate-50 rounded-r-2xl relative overflow-hidden aspect-square">
                <Image src={src}
                    layout='fill'
                    alt={title}
                    className="object-cover" />
            </div>
            <div className="flex flex-col justify-center pr-4 py-2 flex-1">
                <div className="font-semibold flex-1">
                    {title}
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 flex-1">
                    <div>
                        Medium
                    </div>
                </p>
                <div className="font-extrabold flex-1">
                    <span className="text-sm text-primary">
                        $
                    </span>
                    {price.toFixed(2)}
                </div>
            </div>
            <div className="flex flex-col items-center p-2 justify-between">
                <ButtonIcon style="bg-primary hover:bg-primary">
                    <Plus color="white" />
                </ButtonIcon>
                <span className="font-bold text-sm">
                    {1}
                </span>
                <ButtonIcon>

                    <Minus />
                </ButtonIcon>
            </div>
        </div>
        // </Link>
    );
}

export default CartListTile;
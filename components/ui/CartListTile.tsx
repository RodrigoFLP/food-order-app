import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import ButtonIcon from "./ButtonIcon";
import { Plus, Minus, Trash } from 'react-feather';
import { OrderState } from "../../interfaces";
import { incrementItemQuantity, remove } from "../../features";
import { useAppDispatch } from "../../store/hooks";

interface Props {
    order: OrderState,
    src: string;
}

export const CartListTile: FC<Props> = ({ order, src }) => {

    const dispatch = useAppDispatch();


    const handleMinusClick = () => {
        dispatch(remove(order.orderId));
    }

    const handlePlusClick = () => {
        dispatch(incrementItemQuantity(order.orderId));
    }




    return (
        // <Link href={`/menu/${title}`} passHref>
        <div className="w-full h-28 flex rounded-2xl border bg-white 
        shadow-gray-100 overflow-hidden space-x-4 transition-all"
        >
            <div id="image" className="w-24 bg-slate-50 rounded-r-2xl relative overflow-hidden aspect-square">
                <Image src={src}
                    layout='fill'
                    alt={order.productName}
                    className="object-cover" />
            </div>
            <div className="flex flex-col justify-center pr-4 py-2 flex-1">
                <div className="font-semibold flex-1">
                    {order.productName}
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 flex-1">
                    {order.portion.name}
                </p>
                <div className="font-extrabold flex-1">
                    <span className="text-sm text-primary">
                        $
                    </span>
                    {order.unitPrice.toFixed(2)} x {order.quantity}
                </div>
            </div>
            <div className="flex flex-col items-center p-2 justify-between">
                <ButtonIcon style="bg-primary hover:bg-primary" handleClick={handlePlusClick}>
                    <Plus color="white" />
                </ButtonIcon>
                <span className="font-bold text-sm">
                    {order.quantity}
                </span>
                <ButtonIcon handleClick={handleMinusClick}>
                    <Minus />
                </ButtonIcon>
            </div>
        </div>
        // </Link>
    );
}

export default CartListTile;
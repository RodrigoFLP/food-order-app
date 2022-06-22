import { FC } from "react";
import { Ticket } from "../../../interfaces";

export const OrderCard: FC<Ticket> = ({
  id,
  status,
  totalAmount,
  createdAt,
}) => {
  return (
    <div
      key={id}
      className="ml-2 border text-black rounded-lg p-2 text-sm shadow-sm hover:scale-95 cursor-pointer transition-all"
    >
      <div className="font-semibold">Orden #{id}</div>
      <div>{createdAt.toString()}</div>
      <div>Estado: {status}</div>
      <div className="text-right">Total: ${Number(totalAmount).toFixed(2)}</div>
    </div>
  );
};

export default OrderCard;

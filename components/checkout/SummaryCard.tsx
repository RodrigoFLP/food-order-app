import { FC } from "react";
import { TicketCalculation } from "../../interfaces";

export const SummaryCard: FC<
  TicketCalculation & {
    orderType: string;
    deliveryCost: number | null | string;
    isDeliveryCostEnabled: boolean;
  }
> = ({
  ticketItems,
  totalAmount,
  orderType,
  deliveryCost,
  isDeliveryCostEnabled,
}) => {
  return (
    <article className="bg-white p-4 rounded-xl border space-y-2 w-full h-min cursor-pointer hover:scale-95 transition-all active:bg-shade">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-semibold text-base">Resumen</h1>
        <div className="bg-secondary text-white p-1 px-2 rounded-full text-xs font-bold">
          {orderType === "delivery" ? "A domicilio" : "Recoger"}
        </div>
      </div>
      <div className="text-sm">
        {ticketItems.map((item) => (
          <div key={item.id + item.quantity + item.totalAmount}>
            {item.quantity} x {item.product.name}
          </div>
        ))}
      </div>
      <hr />
      <div className="flex justify-between">
        <div className="text-sm">Subtotal</div>
        <div className="text-sm">${parseFloat(totalAmount).toFixed(2)}</div>
      </div>

      {orderType === "delivery" && deliveryCost && isDeliveryCostEnabled && (
        <div className="flex justify-between">
          <div className="text-sm">Envío</div>
          <div className="text-sm">${+deliveryCost}</div>
        </div>
      )}
      <hr />
      <div className="flex justify-between">
        <div className="text-sm">Total</div>
        <div className="text-sm">
          $
          {orderType === "delivery" && deliveryCost && isDeliveryCostEnabled
            ? parseFloat(totalAmount + +deliveryCost).toFixed(2)
            : parseFloat(totalAmount).toFixed(2)}
        </div>
      </div>
    </article>
  );
};

export default SummaryCard;

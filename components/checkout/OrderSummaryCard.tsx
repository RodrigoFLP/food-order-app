import { OrderItemState } from "../../interfaces";

export const OrderSummaryCard = ({
  items,
  showItems,
  isLoading,
  isError,
  data,
}: {
  items: OrderItemState[];
  showItems: boolean;
  isLoading: boolean;
  isError: boolean;
  data: any;
}) => {
  return (
    <div className="flex bg-white w-full h-full p-4 rounded-2xl shadow-sm flex-col space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Resumen</h2>
        <h3 className="text-sm text-primary font-semibold cursor-pointer">
          Editar
        </h3>
      </div>
      {showItems && (
        <>
          <div className="border shadow-sm p-2 rounded-xl divide-y">
            {items.map((item) => {
              return (
                <div key={item.orderItemId} className="p-1">
                  <div>
                    <span className="mr-2 p-1 rounded-lg text-white font-semibold bg-primary">
                      {item.quantity}
                    </span>
                    <span className="font-semibold">{item.productName} </span>
                    <span className="text-xs">{item.portion.name}</span>
                  </div>
                  {/* {item.tagsGroups} */}
                </div>
              );
            })}
          </div>
          <div className="text-right pt-2 ">
            Total: $
            {!isLoading && !isError
              ? data.totalAmount.toFixed(2)
              : isError && isError}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummaryCard;

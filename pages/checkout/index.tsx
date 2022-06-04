import { NextPage } from "next";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Check, CreditCard, Edit, Info, Key, Map, MapPin } from "react-feather";
import { Layout } from "../../components/layouts";
import {
  AddressCard,
  BarButton,
  CheckoutStepContainer,
  DateInput,
  Input,
  SelectInput,
} from "../../components/ui";
import { Address } from "../../interfaces";
import {
  useCalculateTotalQuery,
  useGetAddressMutation,
  useGetAddressQuery,
  usePayWithWompiMutation,
} from "../../services/auth";
import { selectItems } from "../../store";
import { useAppSelector } from "../../store/hooks";

const PickupForm = () => {
  return (
    <>
      <p>Selecciona la sucursal</p>
      <SelectInput
        setValue={() => {}}
        error={false}
        initialValue={1}
        label="Sucursal"
        options={["Santa Ana", "San Salvador"]}
      />
      <p>Datos</p>
      <Input
        error={false}
        label="Nombre de quién recogera la orden"
        Icon={Info}
      />
    </>
  );
};

interface Props {
  addresses: Address[];
}

const DeliveryForm: FC<Props> = ({ addresses }) => {
  return (
    <>
      <p>Selecciona tu dirección:</p>
      <SelectInput
        setValue={() => {}}
        error={false}
        initialValue={1}
        label="Dirección"
        options={[
          ...addresses.map(
            (address) => `Dirección ${address.id}: ${address.addressLine1}`
          ),
        ]}
      />
      <AddressCard {...addresses[0]} />
    </>
  );
};

const CheckoutPage: NextPage = () => {
  const items = useAppSelector(selectItems);
  const router = useRouter();
  const { data, isError, isLoading } = useCalculateTotalQuery(items);
  const [payWithWompi, result] = usePayWithWompiMutation();
  const { isSuccess, data: addressResult } = useGetAddressQuery();

  const [isClient, setIsClient] = useState(false);

  const [deliveryType, setDeliveryType] = useState("");

  useEffect(() => {
    items.length < 1 ? router.push("/cart") : setIsClient(true);
  }, [items, router]);

  const handleWompiPayment = async () => {
    await payWithWompi(items).then((result) =>
      router.push(result.data.urlEnlace)
    );
  };

  const handleDeliveryChange = async (deliveryType: string) => {
    setDeliveryType(deliveryType);
  };

  return (
    <Layout title="Pagar">
      <h1 className="text-lg font-semibold pb-4">Finalizar pedido</h1>
      <hr />
      {isClient && (
        <div className="pt-6 flex flex-col-reverse space-y-4 lg:space-y-0 lg:flex-row w-full lg:space-x-4">
          <div className="lg:w-4/6 flex-none pt-4 lg:pt-0">
            <CheckoutStepContainer
              title="Tipo de entrega"
              stepNumber={1}
              disabled={false}
              isDone={!!deliveryType}
            >
              <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4 w-full">
                <button
                  className={`${
                    deliveryType === "pickup"
                      ? "bg-primary text-white"
                      : "bg-shade"
                  } p-4 flex-1 rounded-2xl 
                  hover:scale-95 active:bg-secondary active:text-white transition-all flex justify-center`}
                  onClick={() => handleDeliveryChange("pickup")}
                >
                  <MapPin />
                  <div className="pl-4">Recoger</div>
                </button>
                <button
                  className={`${
                    deliveryType === "delivery"
                      ? "bg-primary text-white"
                      : "bg-shade"
                  } p-4 flex-1 rounded-2xl 
                    hover:scale-95 active:bg-secondary active:text-white transition-all flex justify-center`}
                  onClick={() => handleDeliveryChange("delivery")}
                >
                  <Map />
                  <div className="pl-4">Domicilio</div>
                </button>
              </div>
            </CheckoutStepContainer>
            <div
              className={`w-[4px] transition-all h-6 ${
                deliveryType ? "bg-primary" : "bg-gray-300"
              } ml-4`}
            ></div>
            <CheckoutStepContainer
              disabled={!deliveryType}
              stepNumber={2}
              title="Datos"
              isDone={false}
            >
              {deliveryType && deliveryType === "pickup" ? (
                <PickupForm />
              ) : (
                deliveryType && <DeliveryForm addresses={addressResult!} />
              )}
              <BarButton>Confirmar información</BarButton>
            </CheckoutStepContainer>
            <div
              className={`w-[4px] transition-all h-6 ${
                deliveryType ? "bg-primary" : "bg-gray-300"
              } ml-4`}
            ></div>
            <CheckoutStepContainer
              title="Pago"
              stepNumber={3}
              disabled={!deliveryType}
            >
              <BarButton Icon={CreditCard} handleClick={handleWompiPayment}>
                Pagar con tarjeta de crédito/débito
              </BarButton>
            </CheckoutStepContainer>
          </div>
          <div className="flex bg-white w-full h-full p-4 rounded-2xl shadow-sm flex-col space-y-2">
            <h2 className="font-semibold">Resumen</h2>
            {isClient && (
              <>
                <div className="border shadow-sm p-2 rounded-xl divide-y">
                  {items.map((item, index) => {
                    return (
                      <div key={item.orderItemId} className="p-1">
                        <span>{item.quantity} x </span>
                        {item.productName}
                      </div>
                    );
                  })}
                </div>
                <div className="text-right pt-2">
                  Total: $
                  {!isLoading && !isError
                    ? data.totalAmount.toFixed(2)
                    : isError && isError}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CheckoutPage;

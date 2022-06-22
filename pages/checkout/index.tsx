import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { Address, IPaymentLink, OrderItemState } from "../../interfaces";

import { Layout } from "../../components/layouts";
import { CheckoutStepContainer } from "../../components/ui";
import { BarButton } from "../../components/ui/Buttons";
import { AddressCard } from "../../components/ui/Cards";
import {
  Input,
  SelectAddressInput,
  SelectInput,
} from "../../components/ui/Inputs";

import {
  useCalculateTotalQuery,
  useGetAddressQuery,
  useGetStoresQuery,
  usePayWithWompiMutation,
} from "../../services/auth";
import { selectItems } from "../../store";
import { useAppSelector } from "../../store/hooks";

import { CreditCard, Info, Map, MapPin } from "react-feather";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

const PickupForm = () => {
  const { data, isError, isLoading, isSuccess } = useGetStoresQuery();

  return isSuccess ? (
    <>
      <p>Selecciona la sucursal</p>
      <SelectInput
        setValue={() => {}}
        error={false}
        initialValue={1}
        label="Sucursal"
        options={data?.map((store) => `${store.name} - ${store.addressLine1}`)}
      />
      <p>Datos</p>
      <Input
        error={false}
        label="Nombre de quién recogera la orden"
        Icon={Info}
      />
    </>
  ) : null;
};

interface OrderInfo {
  deliveryType: string;
  clientName: string;
  storeId: number;
  addressId: number;
}

interface Props {
  addresses: Address[];
  orderInfo: OrderInfo;
  setOrderInfo: Dispatch<SetStateAction<OrderInfo>>;
}

const DeliveryForm: FC<Props> = ({ addresses, orderInfo, setOrderInfo }) => {
  const handleAddressChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOrderInfo((currentValue) => ({
      ...currentValue,
      addressId: parseInt(event.target.value),
    }));
  };

  return (
    <>
      <p>Selecciona tu dirección:</p>
      <SelectAddressInput
        setValue={handleAddressChange}
        error={false}
        initialValue={orderInfo.addressId}
        label="Dirección"
        options={addresses}
      />
      <AddressCard
        {...addresses.find((address) => address.id === orderInfo.addressId)!}
      />
    </>
  );
};

const StepSeparator = ({ isActivated = false }: { isActivated: boolean }) => {
  return (
    <div
      className={`w-[4px] transition-all h-6 ${
        isActivated ? "bg-primary" : "bg-gray-300"
      } ml-4`}
    ></div>
  );
};

const OrderSummary = ({
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

const CheckoutPage: NextPage = () => {
  const router = useRouter();
  const items = useAppSelector(selectItems);

  const [payWithWompi, result] = usePayWithWompiMutation();

  const { data, isError, isLoading } = useCalculateTotalQuery(items);

  const { isSuccess, data: addressResult } = useGetAddressQuery();

  //SSR check
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    items.length < 1 ? router.push("/cart") : setIsClient(true);
  }, [items, router]);

  const [stepsState, setStepsState] = useState({
    isStepOneDone: false,
    isStepTwoDone: false,
    isStepThreeDone: false,
  });

  const [orderInfo, setOrderInfo] = useState({
    deliveryType: "",
    clientName: "",
    storeId: 0,
    addressId: 0,
  });

  const handleDeliveryChange = (deliveryType: string) => {
    setStepsState((currentState) => ({ ...currentState, isStepOneDone: true }));
    setOrderInfo((currentState) => ({ ...currentState, deliveryType }));
  };

  const handleSecondStepChange = () => {
    setStepsState((currentState) => ({ ...currentState, isStepTwoDone: true }));
  };

  const handleWompiPayment = async () => {
    try {
      const res = await toast
        .promise(
          payWithWompi(items),
          {
            success: "Enlace creado",
            pending: "Creando enlace",
            error: "No se ha podido crear el pago",
          },
          { autoClose: 1000, position: "bottom-right" }
        )
        .then((res) => {
          const { error } = res as {
            error: FetchBaseQueryError | SerializedError;
          };

          if (error) {
            throw new Error("could not create payment");
          }
          const response = res as { data: IPaymentLink };
          router.push(response.data?.urlEnlace);
        })
        .catch((error) => console.log("hay error"));
    } catch (err) {
      console.log(err);
    }
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
              isDone={stepsState.isStepOneDone}
            >
              <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4 w-full">
                <button
                  className={`${
                    orderInfo.deliveryType === "pickup"
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
                    orderInfo.deliveryType === "delivery"
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
            <StepSeparator isActivated={stepsState.isStepOneDone} />
            <CheckoutStepContainer
              disabled={!stepsState.isStepOneDone}
              stepNumber={2}
              title="Datos"
              isDone={stepsState.isStepTwoDone}
            >
              {orderInfo.deliveryType && orderInfo.deliveryType === "pickup" ? (
                <PickupForm />
              ) : (
                orderInfo.deliveryType && (
                  <DeliveryForm
                    addresses={addressResult!}
                    orderInfo={orderInfo}
                    setOrderInfo={setOrderInfo}
                  />
                )
              )}
              <BarButton handleClick={handleSecondStepChange}>
                Confirmar información
              </BarButton>
            </CheckoutStepContainer>
            <StepSeparator isActivated={stepsState.isStepTwoDone} />
            <CheckoutStepContainer
              title="Pago"
              stepNumber={3}
              disabled={!stepsState.isStepTwoDone}
            >
              <BarButton Icon={CreditCard} handleClick={handleWompiPayment}>
                Pagar con tarjeta de crédito/débito
              </BarButton>
            </CheckoutStepContainer>
          </div>
          <OrderSummary
            data={data}
            isLoading={isLoading}
            isError={isError}
            items={items}
            showItems={isClient}
          />
        </div>
      )}
      <ToastContainer />
    </Layout>
  );
};

export default CheckoutPage;

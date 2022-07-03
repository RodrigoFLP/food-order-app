import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { IPaymentLink } from "../../interfaces";

import { Layout } from "../../components/layouts";
import { CheckoutStepContainer } from "../../components/ui";
import { BarButton } from "../../components/ui/Buttons";
import PickupForm from "../../components/ui/Forms/PickupForm";
import DeliveryForm from "../../components/ui/Forms/DeliveryForm";
import { OrderSummaryCard } from "../../components/ui/Cards";

import {
  useCalculateTotalQuery,
  useGetAddressQuery,
  usePayWithWompiMutation,
} from "../../services/api";
import { selectItems } from "../../store";
import { useAppSelector } from "../../store/hooks";

import { CreditCard, Map, MapPin } from "react-feather";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StepSeparator } from "../../components/ui";

interface OrderInfo {
  deliveryType: string;
  clientName: string;
  storeId: number;
  addressId: string | undefined;
}

const CheckoutPage: NextPage = () => {
  const router = useRouter();
  const items = useAppSelector(selectItems);

  const [payWithWompi, result] = usePayWithWompiMutation();
  const { data, isError, isLoading } = useCalculateTotalQuery(items);
  const { isSuccess, data: addressResult } = useGetAddressQuery();

  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    deliveryType: "",
    clientName: "",
    storeId: 0,
    addressId: undefined,
  });

  useEffect(() => {
    if (isSuccess) {
      setOrderInfo((currentValue) => ({
        ...currentValue,
        addressId: addressResult[0].id,
      }));
    }
  }, [addressResult, isSuccess]);

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

  const handleDeliveryChange = (deliveryType: string) => {
    setStepsState((currentState) => ({ ...currentState, isStepOneDone: true }));
    setOrderInfo((currentState) => ({ ...currentState, deliveryType }));
  };

  const handleSecondStepChange = () => {
    setStepsState((currentState) => ({ ...currentState, isStepTwoDone: true }));
  };

  const handleWompiPayment = async () => {
    try {
      toast("Creando pago...", {
        toastId: "payment",
        isLoading: true,
        position: "bottom-right",
      });

      const res = (await payWithWompi({
        info: {
          orderType: orderInfo.deliveryType,
          storeId: orderInfo.storeId,
          customerAddressId: orderInfo.addressId,
        },
        items,
      })) as any;

      if (res.error) {
        throw new Error("No se ha podido generar el pago");
      }

      const response = res as { data: IPaymentLink };
      router.push(response.data?.urlEnlace);
    } catch (err: any) {
      toast.dismiss("payment");
      toast.dismiss("error");
      setTimeout(
        () =>
          toast(`${err.data ? err.data.message : err} `, {
            type: "error",
            toastId: "error",
            autoClose: 1000,
            position: "bottom-right",
          }),
        500
      );
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
          <OrderSummaryCard
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

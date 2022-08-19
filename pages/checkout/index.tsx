import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Layout } from "../../components/layouts";
import { CheckoutStepContainer } from "../../components/ui";
import { BarButton } from "../../components/ui/Buttons";
import PickupForm from "../../components/checkout/PickupForm";
import DeliveryForm from "../../components/checkout/DeliveryForm";

import {
  useCalculateTotalQuery,
  useGetAddressQuery,
  useGetOneStoreQuery,
  useCreateTicketMutation,
} from "../../services/api";
import { clearCart, selectItems } from "../../store";
import { useAppSelector } from "../../store/hooks";

import { CreditCard, Map, MapPin } from "react-feather";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StepSeparator } from "../../components/ui";
import PaymentModal from "../../components/checkout/PaymentModal";
import SummaryCard from "../../components/checkout/SummaryCard";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import Loading from "../../components/ui/Loading";
import { Checks, ReportMoney } from "tabler-icons-react";

interface OrderInfo {
  deliveryType: string;
  paymentType: "inplace" | "wompi" | "";
  clientName: string;
  storeId: number;
  addressId: string | undefined;
}

const CheckoutPage: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const items = useAppSelector(selectItems);

  const [showWompiModal, setShowWompiModal] = useState(false);

  const [createTicket, result] = useCreateTicketMutation();
  const { data, isError, isLoading, isUninitialized } =
    useCalculateTotalQuery(items);
  const { isSuccess, data: addressResult } = useGetAddressQuery();

  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    deliveryType: "",
    paymentType: "",
    clientName: "",
    storeId: 0,
    addressId: undefined,
  });

  const {
    data: store,
    isError: isStoreError,
    isLoading: isStoreLoading,
    isUninitialized: isStoreUninitialized,
  } = useGetOneStoreQuery();

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

  const handlePaymentTypeChange = (paymentType: "inplace" | "wompi") => {
    setStepsState((currentState) => ({
      ...currentState,
      isStepThreeDone: true,
    }));
    setOrderInfo((currentState) => ({ ...currentState, paymentType }));
  };

  const handleSecondStepChange = () => {
    setStepsState((currentState) => ({ ...currentState, isStepTwoDone: true }));
  };

  const handleTicketCreation = async () => {
    try {
      toast("Creando orden...", {
        toastId: "ticket",
        isLoading: true,
        position: "bottom-right",
      });

      const res = await createTicket({
        info: {
          orderType: orderInfo.deliveryType,
          paymentType: orderInfo.paymentType,
          storeId: orderInfo.storeId,
          customerAddressId: orderInfo.addressId,
        },
        items,
      }).unwrap();

      toast.dismiss("ticket");

      if (orderInfo.deliveryType === "wompi") {
        setShowWompiModal(true);
      }

      if (orderInfo.deliveryType === "inplace") {
        router.push(`profile/orders/${res.orderId}`);
      }
    } catch (err) {
      toast.dismiss("payment");
      toast.dismiss("error");
      setTimeout(
        () =>
          toast(`${err ? err : err} `, {
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
      {(isLoading ||
        isStoreLoading ||
        isStoreUninitialized ||
        isUninitialized) && <Loading />}
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
                  } p-2 flex-1 rounded-lg
                  hover:scale-95 active:bg-secondary active:text-white transition-all flex justify-center`}
                  onClick={() => handleDeliveryChange("pickup")}
                >
                  <div className="flex items-center">
                    <MapPin size={14} />
                    <div className="pl-4">Recoger</div>
                  </div>
                </button>
                <button
                  className={`${
                    orderInfo.deliveryType === "delivery"
                      ? "bg-primary text-white"
                      : "bg-shade"
                  } p-2 flex-1 rounded-lg
                    hover:scale-95 active:bg-secondary active:text-white transition-all flex justify-center`}
                  onClick={() => handleDeliveryChange("delivery")}
                >
                  <div className="flex items-center">
                    <Map size={14} />
                    <div className="pl-4">Domicilio</div>
                  </div>
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
              <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4 w-full">
                <button
                  className={`${
                    orderInfo.paymentType === "wompi"
                      ? "bg-primary text-white"
                      : "bg-shade"
                  } p-2 flex-1 rounded-lg
              hover:scale-95 active:bg-secondary active:text-white transition-all flex justify-center`}
                  onClick={() => handlePaymentTypeChange("wompi")}
                >
                  <div className="flex items-center">
                    <CreditCard size={14} />
                    <div className="pl-4">Pagar con Wompi</div>
                  </div>
                </button>
                <button
                  className={`${
                    orderInfo.paymentType === "inplace"
                      ? "bg-primary text-white"
                      : "bg-shade"
                  } p-2 flex-1 rounded-lg
                hover:scale-95 active:bg-secondary active:text-white transition-all flex justify-center`}
                  onClick={() => handlePaymentTypeChange("inplace")}
                >
                  <div className="flex items-center">
                    <ReportMoney size={14} />
                    <div className="pl-4">Pagar en entrega</div>
                  </div>
                </button>
              </div>
            </CheckoutStepContainer>
            <button
              disabled={!stepsState.isStepThreeDone}
              className={`${
                stepsState.isStepThreeDone
                  ? "bg-primary text-white"
                  : "grayscale opacity-30 pointer-events-none"
              }  mt-6 w-full p-2 flex-1 rounded-lg
                hover:scale-95 active:bg-secondary active:text-white transition-all flex justify-center h-12}`}
              onClick={handleTicketCreation}
            >
              <div className="flex items-center">
                <Checks size={14} />
                <div className="pl-4">Realizar orden</div>
              </div>
            </button>
          </div>
          {data && store && (
            <SummaryCard
              orderType={orderInfo.deliveryType}
              deliveryCost={store.deliveryCost}
              isDeliveryCostEnabled={store.isDeliveryCostEnabled}
              ticketItems={data?.ticketItems}
              totalAmount={data.totalAmount}
            />
          )}
        </div>
      )}

      <PaymentModal
        show={showWompiModal}
        handleClose={() => {
          setShowWompiModal(false);
          dispatch(clearCart());
        }}
        src={result.data?.urlQrCodeEnlace!}
      />
      <ToastContainer />
    </Layout>
  );
};

export default CheckoutPage;

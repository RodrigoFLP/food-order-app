import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useCalculateTotalQuery,
  useGetAddressQuery,
  useGetOneStoreQuery,
  useCreateTicketMutation,
} from "../services/api";
import { clearCart, selectItems } from "../store";
import { useAppSelector } from "../store/hooks";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

interface OrderInfo {
  deliveryType: string;
  paymentType: "inplace" | "wompi" | "";
  clientName: string;
  storeId: number;
  addressId: string | undefined;
}

export const useCheckout = () => {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const items = useAppSelector(selectItems);

  const [showWompiModal, setShowWompiModal] = useState(false);

  const [createTicket, result] = useCreateTicketMutation();
  const {
    data: total,
    isLoading: isTotalLoading,
    isSuccess: isTotalSuccess,
    isUninitialized: isTotalUninitialized,
  } = useCalculateTotalQuery(items);
  const { isSuccess: isAddressSuccess, data: addressResult } =
    useGetAddressQuery();

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
    isSuccess: isStoreSuccess,
    isLoading: isStoreLoading,
    isUninitialized: isStoreUninitialized,
  } = useGetOneStoreQuery();

  useEffect(() => {
    if (isAddressSuccess) {
      setOrderInfo((currentValue) => ({
        ...currentValue,
        addressId: addressResult[0].id,
      }));
    }
  }, [addressResult, isAddressSuccess]);

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

      if (orderInfo.paymentType === "wompi") {
        console.log("");
        setShowWompiModal(true);
      }

      if (orderInfo.paymentType === "inplace") {
        router
          .push(`/profile/orders/${res.orderId}`)
          .then(() => dispatch(clearCart()));
      }
    } catch (err) {
      toast.dismiss("payment");
      toast.dismiss("error");
      setTimeout(
        () =>
          toast(`${err ? err : "No se ha podido realizar la orden"} `, {
            type: "error",
            toastId: "error",
            autoClose: 1000,
            position: "bottom-right",
          }),
        500
      );
    }
  };

  const handlePaymentModalClose = () => {
    setShowWompiModal(false);
    router
      .push(`/profile/orders/${result.data?.orderId}`)
      .then(() => dispatch(clearCart()));
  };

  const isLoading =
    isTotalLoading ||
    isStoreLoading ||
    isStoreUninitialized ||
    isTotalUninitialized;

  const isSuccess = isTotalSuccess || isStoreSuccess;

  return {
    isLoading,
    isClient,
    isSuccess,
    showWompiModal,
    handlePaymentModalClose,
    handleDeliveryChange,
    handlePaymentTypeChange,
    handleSecondStepChange,
    stepsState,
    orderInfo,
    total,
    store,
    addressResult,
    setOrderInfo,
    handleTicketCreation,
    result,
  };
};

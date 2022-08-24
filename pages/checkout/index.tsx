import { NextPage } from "next";

import { Layout } from "../../components/layouts";
import Loading from "../../components/ui/Loading";
import {
  CheckoutStepContainer,
  DeliveryForm,
  PaymentModal,
  PickupForm,
  StepButton,
  StepSeparator,
  SummaryCard,
} from "../../components/checkout";

import {
  Check,
  Checks,
  ReportMoney,
  Map,
  MapPin,
  CreditCard,
} from "tabler-icons-react";

import { useCheckout } from "../../hooks/useCheckout";

const CheckoutPage: NextPage = () => {
  const {
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
  } = useCheckout();

  return (
    <Layout title="Pagar">
      <h1 className="text-lg font-semibold pb-4">Finalizar pedido</h1>
      <hr />
      {isLoading && <Loading />}
      {isClient && isSuccess && (
        <div className="pt-6 flex flex-col-reverse space-y-4 lg:space-y-0 lg:flex-row w-full lg:space-x-4">
          <div className="lg:w-4/6 flex-none pt-4 lg:pt-0">
            <CheckoutStepContainer
              title="Tipo de entrega"
              stepNumber={1}
              disabled={false}
              isDone={stepsState.isStepOneDone}
            >
              <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4 w-full">
                <StepButton
                  title="Recoger"
                  disabled={!(orderInfo.deliveryType === "pickup")}
                  onClick={() => handleDeliveryChange("pickup")}
                  icon={<MapPin size={14} />}
                />
                <StepButton
                  title="Domicilio"
                  disabled={!(orderInfo.deliveryType === "delivery")}
                  onClick={() => handleDeliveryChange("delivery")}
                  icon={<Map size={14} />}
                />
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
              <StepButton
                disabled={!stepsState.isStepOneDone}
                title="Confirmar información"
                onClick={handleSecondStepChange}
                icon={<Check size={14} />}
              />
            </CheckoutStepContainer>
            <StepSeparator isActivated={stepsState.isStepTwoDone} />
            <CheckoutStepContainer
              title="Pago"
              stepNumber={3}
              disabled={!stepsState.isStepTwoDone}
            >
              <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4 w-full">
                <StepButton
                  disabled={!(orderInfo.paymentType === "wompi")}
                  title="Pagar con Wompi"
                  onClick={() => handlePaymentTypeChange("wompi")}
                  icon={<CreditCard size={14} />}
                />
                <StepButton
                  disabled={!(orderInfo.paymentType === "inplace")}
                  title="Pagar en entrega"
                  onClick={() => handlePaymentTypeChange("inplace")}
                  icon={<ReportMoney size={14} />}
                />
              </div>
            </CheckoutStepContainer>
            <div
              className={`mt-6 ${
                !stepsState.isStepThreeDone &&
                "grayscale opacity-30 pointer-events-none"
              }`}
            >
              <StepButton
                disabled={!stepsState.isStepThreeDone}
                title="Realizar orden"
                onClick={handleTicketCreation}
                icon={<Checks size={14} />}
              />
            </div>
          </div>
          {total && store && (
            <SummaryCard
              orderType={orderInfo.deliveryType}
              deliveryCost={store.deliveryCost}
              isDeliveryCostEnabled={store.isDeliveryCostEnabled}
              ticketItems={total?.ticketItems}
              totalAmount={total.totalAmount}
            />
          )}
        </div>
      )}

      <PaymentModal
        show={showWompiModal}
        handleClose={handlePaymentModalClose}
        src={result.data?.urlQrCodeEnlace!}
      />
    </Layout>
  );
};

export default CheckoutPage;

import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Check, CreditCard, Edit, Info, Key, Map, MapPin } from "react-feather";
import { Layout } from "../../components/layouts";
import { BarButton, DateInput, Input, SelectInput } from "../../components/ui";
import {
  useCalculateTotalQuery,
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

const DeliveryForm = () => {
  return (
    <>
      <p>Selecciona tu dirección:</p>
      <SelectInput
        setValue={() => {}}
        error={false}
        initialValue={1}
        label="Dirección"
        options={[
          "Dirección 1: Calle 12 pte col bv",
          "Dirección 2: Calle 12 pte col bv",
        ]}
      />
      <div className="bg-white text-black border rounded-xl shadow-sm p-4 flex justify-between">
        <div>
          <h2 className="font-semibold">Dirección 1</h2>
          <div>Departamento, municipio</div>
          <div>Colonia buena vista calle número 17</div>
          <div>#28</div>
        </div>
        <Edit />
      </div>
    </>
  );
};

const CheckoutPage: NextPage = () => {
  const items = useAppSelector(selectItems);
  const router = useRouter();
  const { data, isError, isLoading } = useCalculateTotalQuery(items);
  const [payWithWompi, result] = usePayWithWompiMutation();

  const [isClient, setIsClient] = useState(false);

  const [deliveryType, setDeliveryType] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleWompiPayment = async () => {
    await payWithWompi(items).then((result) =>
      router.push(result.data.urlEnlace)
    );
  };

  const handleDeliveryChange = (deliveryType: string) => {
    setDeliveryType(deliveryType);
  };

  return (
    <Layout title="Pagar">
      <h1 className="text-lg font-semibold pb-4">Finalizar pedido</h1>
      <hr />
      <div className="pt-6">
        <div className="flex flex-col-reverse space-y-4 lg:space-y-0 lg:flex-row w-full lg:space-x-4">
          <div className="lg:w-4/6 flex-none pt-4 lg:pt-0">
            <section className="flex flex-row bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="h-auto bg-primary text-xl text-white font-bold p-4 pr-8 w-12">
                {deliveryType ? <Check size={20} /> : 1}
              </div>
              <div className="-ml-2 bg-white rounded-lg p-4 space-y-4 w-full">
                <h2 className="font-semibold">Tipo de entrega</h2>
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
              </div>
            </section>
            <div
              className={`w-[4px] transition-all h-6 ${
                deliveryType ? "bg-primary" : "bg-gray-300"
              } ml-4`}
            ></div>

            <section
              className={`flex flex-row bg-white rounded-2xl shadow-sm 
            overflow-hidden transition-all ${
              !deliveryType && "grayscale opacity-30 pointer-events-none"
            } `}
            >
              <div className="h-auto bg-primary text-xl text-white font-extrabold p-4 pr-8 w-12">
                2
              </div>
              <div className="-ml-2 bg-white rounded-lg p-4 space-y-4 w-full">
                <h2 className="font-semibold">Información</h2>

                {deliveryType && deliveryType === "pickup" ? (
                  <PickupForm />
                ) : (
                  <DeliveryForm />
                )}
                <BarButton>Confirmar información</BarButton>
              </div>
            </section>

            <div
              className={`w-[4px] transition-all h-6 ${
                deliveryType ? "bg-primary" : "bg-gray-300"
              } ml-4`}
            ></div>

            <section
              className={`flex flex-row bg-white rounded-2xl shadow-sm 
            overflow-hidden transition-all ${
              !deliveryType && "grayscale opacity-30 pointer-events-none"
            } `}
            >
              <div className="h-auto bg-primary text-xl text-white font-extrabold p-4 pr-8 w-12">
                3
              </div>
              <div className="-ml-2 bg-white rounded-lg p-4 space-y-4 w-full">
                <h2 className="font-semibold">Pago</h2>

                {/* <Input error={false} label="Número" Icon={CreditCard} />
                <div className="flex justify-between space-x-4">
                  <div className="flex-1">
                    <DateInput error={false} label="Fecha de vencimiento" />
                  </div>
                  <Input error={false} label="CVV" Icon={Key} />
                </div> */}

                <BarButton Icon={CreditCard} handleClick={handleWompiPayment}>
                  Pagar con tarjeta de crédito/débito
                </BarButton>
              </div>
            </section>
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
      </div>
    </Layout>
  );
};

export default CheckoutPage;

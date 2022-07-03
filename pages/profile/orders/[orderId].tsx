import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Layout } from "../../../components/layouts";
import { StepSeparator } from "../../../components/ui";
import Loading from "../../../components/ui/Loading";
import StatusStepContainer from "../../../components/ui/StatusStepContainer";
import { useGetCustomerOrderMutation } from "../../../services/api";
import initialToUpperCase from "../../../utils/initialToUpperCase";

const OrderPage: NextPage = () => {
  const router = useRouter();
  const { orderId } = router.query;

  const [order, result] = useGetCustomerOrderMutation();

  useEffect(() => {
    if (orderId) {
      order(orderId as string);
    }
  }, [orderId, order]);

  return (
    <Layout title="Confirmar correo">
      {result.isLoading || (result.isUninitialized && <Loading />)}
      {result.isSuccess && result.data && (
        <section className="md:flex md:space-x-8 animate-opacityin">
          <div className="sm:flex-1">
            <h1 className="text-lg font-bold">Detalles de orden</h1>
            <h2 className="text-sm">#{orderId}</h2>

            <article className="bg-white mt-4 p-4 rounded-2xl border space-y-2 cursor-pointer hover:scale-95 transition-all active:bg-shade">
              <div className="flex flex-row justify-between items-center">
                <h1 className="font-semibold text-base">
                  #{result.data.id.split("-")[0]}
                </h1>
                <div className="bg-secondary text-white p-1 px-2 rounded-full text-xs font-bold">
                  {"status"}
                </div>
              </div>
              <div className="text-xs">{result.data.createdAt}</div>
              <div className="text-sm">
                {result.data.ticketItems.map((item) => (
                  <div key={item.id + item.quantity + item.totalAmount}>
                    {item.quantity} x {item.product.name}
                    <div className="pl-6">
                      {item.tags.map((tag) => (
                        <div key={tag.id + tag.value}>
                          {initialToUpperCase(tag.value)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <div className="text-sm">
                ${parseFloat(result.data.totalAmount).toFixed(2)}
              </div>
            </article>

            {result.error && "No existe la orden"}
          </div>
          <div className="mt-10 md:mt-0 flex-1">
            <h1 className="font-bold text-lg mb-4">Estado de la orden</h1>
            {result.isSuccess && (
              <>
                <StatusStepContainer
                  title="Orden realizada"
                  isPreviousDone={true}
                  isDone={!!result.data.status.orderPlaced}
                  timestamp={result.data.status.orderPlaced}
                  processingSubtitle="Se está procesando la orden"
                />
                <StatusStepContainer
                  title={"Orden pagada"}
                  isPreviousDone={!!result.data.status.orderPlaced}
                  isDone={!!result.data.status.orderPaid}
                  timestamp={result.data.status.orderPaid}
                  processingSubtitle="La orden está por pagarse"
                />
                <StatusStepContainer
                  title={"Orden confirmada"}
                  isPreviousDone={!!result.data.status.orderPaid}
                  isDone={!!result.data.status.orderConfirmed}
                  timestamp={result.data.status.orderConfirmed}
                  processingSubtitle="La orden está por confirmarse"
                />
                <StatusStepContainer
                  title={"Orden preparada"}
                  isPreviousDone={!!result.data.status.orderConfirmed}
                  isDone={!!result.data.status.orderPrepared}
                  timestamp={result.data.status.orderPrepared}
                  processingSubtitle="Se está preparando la orden"
                />
                <StatusStepContainer
                  title={"Orden recibida"}
                  showStepLine={false}
                  isPreviousDone={!!result.data.status.orderPrepared}
                  isDone={!!result.data.status.orderReceived}
                  timestamp={result.data.status.orderReceived}
                  processingSubtitle="La orden está lista para el envío"
                />
              </>
            )}
          </div>
        </section>
      )}
      {result.isError && "No existe la orden"}
    </Layout>
  );
};

export default OrderPage;

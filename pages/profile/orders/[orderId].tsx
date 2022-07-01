import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Layout } from "../../../components/layouts";
import { StepSeparator } from "../../../components/ui";
import StatusStepContainer from "../../../components/ui/StatusStepContainer";
import { useGetCustomerOrderMutation } from "../../../services/auth";
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
      <div className="flex flex-col">
        <h1 className="text-lg font-bold">Detalles de orden</h1>
        <h2 className="text-sm">#{orderId}</h2>
        <section className="mt-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
            {result.isLoading && "Cargando..."}
            {result.isSuccess && result.data && (
              <article className="bg-white p-4 rounded-2xl border space-y-2 cursor-pointer hover:scale-95 transition-all active:bg-shade">
                <div className="flex flex-row justify-between items-center">
                  <h1 className="font-semibold text-base">
                    #{result.data.id.split("-")[0]}
                  </h1>
                  <div className="bg-secondary text-white p-1 px-2 rounded-full text-xs font-bold">
                    {initialToUpperCase(result.data.status)}
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
            )}
            {result.error && "No existe la orden"}
          </div>
          <div className="mt-10">
            <h1 className="font-bold text-lg mb-4">Estado de la orden</h1>
            <StatusStepContainer
              isDone={true}
              title={"Pago procesado"}
              subtitle={"2022-06-30T22:33:25.301Z"}
            />
            <StatusStepContainer
              isDone={false}
              title={"Orden aceptada"}
              subtitle={"2022-06-30T22:33:25.301Z"}
            />
            <StatusStepContainer
              isDone={false}
              title={"Envío"}
              subtitle={"2022-06-30T22:33:25.301Z"}
            />
            <StatusStepContainer
              isDone={false}
              showStepLine={false}
              title={"Recibido"}
              subtitle={"2022-06-30T22:33:25.301Z"}
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default OrderPage;

import { NextPage } from "next";
import { Layout } from "../../../components/layouts";
import { OrderCard } from "../../../components/ui/Cards";
import Loading from "../../../components/ui/Loading";
import { useGetCustomerOrdersQuery } from "../../../services/api";
import { getStatus } from "../../../utils/getStatus";

const OrdersPage: NextPage = () => {
  const { isLoading, isError, data, isSuccess, isUninitialized } =
    useGetCustomerOrdersQuery();

  return (
    <Layout title="Confirmar correo">
      <div className="flex flex-col space-y-4">
        <h1 className="text-lg font-bold">Ordenes</h1>
        {isLoading && <Loading />}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
          {isSuccess &&
            data.length > 0 &&
            data.map((ticket) => (
              <OrderCard
                key={ticket.id}
                {...ticket}
                currentStatus={getStatus(ticket.status)}
              />
            ))}
          {isSuccess && data.length === 0 && "No hay ordenes"}
          {isError && "No se han podido cargar las ordenes, recarga la página"}
        </div>
      </div>
    </Layout>
  );
};

export default OrdersPage;

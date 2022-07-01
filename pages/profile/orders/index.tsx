import { NextPage } from "next";
import { Layout } from "../../../components/layouts";
import { OrderCard } from "../../../components/ui/Cards";
import { useGetCustomerOrdersQuery } from "../../../services/auth";

const ConfirmEmailErrorPage: NextPage = () => {
  const { isLoading, isFetching, data, isSuccess } =
    useGetCustomerOrdersQuery();

  return (
    <Layout title="Confirmar correo">
      <div className="flex flex-col space-y-4">
        <h1 className="text-lg font-bold">Ordenes</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
          {isSuccess
            ? data.length > 0
              ? data.map((ticket) => <OrderCard key={ticket.id} {...ticket} />)
              : "No hay ordenes"
            : "Cargando..."}
        </div>
      </div>
    </Layout>
  );
};

export default ConfirmEmailErrorPage;

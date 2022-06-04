import { NextPage } from "next";
import { Edit } from "react-feather";
import { Layout } from "../../components/layouts";
import { AddressCard } from "../../components/ui";
import { useGetAddressQuery } from "../../services/auth";

const ProfilePage: NextPage = () => {
  const { isLoading, isFetching, data, isSuccess } = useGetAddressQuery();

  return (
    <Layout title="Perfil">
      <div className="">
        <div className="rounded-2xl bg-white shadow-sm p-4">
          <h1 className="font-semibold">¡Bienvenido Rodrigo!</h1>
          <div className="pt-4 text-sm space-y-2">
            <div>
              <span className="bg-secondary rounded-2xl p-1 px-2 text-white font-semibold mr-2">
                Última orden
              </span>
              17 de mayo de 2021
            </div>
            <div>
              <span className="bg-secondary rounded-2xl p-1 px-2 text-white font-semibold mr-2">
                Total de ordenes:
              </span>
              3
            </div>
          </div>
        </div>
        <h1 className="font-semibold pb-4 mt-6">Direcciones</h1>
        <div className="space-y-2">
          {isSuccess
            ? data.map((address) => (
                <AddressCard key={address.id} {...address} />
              ))
            : "Cargando..."}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;

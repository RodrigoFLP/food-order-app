import { NextPage } from "next";
import { Layout } from "../../components/layouts";
import { AddressCard } from "../../components/ui/Cards";
import {
  useGetAddressQuery,
  useGetCustomerProfileQuery,
} from "../../services/auth";

const ProfilePage: NextPage = () => {
  const { isLoading, isFetching, data, isSuccess } = useGetAddressQuery();
  const {
    isLoading: isProfileLoading,
    isFetching: isProfileFetching,
    data: profileData,
    isSuccess: isProfileSuccess,
  } = useGetCustomerProfileQuery();

  return (
    <Layout title="Perfil">
      <div className="rounded-2xl bg-white shadow-sm p-4">
        <h1 className="font-semibold">
          ¡Bienvenido/a {profileData?.firstName}!
        </h1>
        <div className="pt-4 text-sm space-y-2 ">
          <div>
            <span className="bg-primary rounded-2xl p-1 px-2 text-white font-semibold mr-2">
              Teléfono
            </span>
            {profileData?.phoneNumber}
          </div>
          <div className="overflow-x-clip overflow-ellipsis">
            <span className="bg-primary rounded-2xl p-1 px-2 text-white font-semibold mr-2">
              Correo
            </span>
            {profileData?.email}
          </div>
          <div>
            <span className="bg-primary rounded-2xl p-1 px-2 text-white font-semibold mr-2">
              Cumpleaños
            </span>
            {`${profileData?.birthDate}`}
          </div>
        </div>
      </div>
      <div className="pb-4 mt-6 flex justify-between">
        <h1 className="font-semibold">Direcciones</h1>
        {isSuccess && data.length < 3 && (
          <h1 className="font-semibold text-sm text-primary">
            Añadir Dirección
          </h1>
        )}
      </div>
      <div className="space-y-2">
        {isSuccess
          ? data.map((address) => (
              <AddressCard key={address.id} address={address} />
            ))
          : "Cargando..."}
      </div>
    </Layout>
  );
};

export default ProfilePage;

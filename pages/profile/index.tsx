import { NextPage } from "next";
import { Mail, Phone, Calendar } from "react-feather";
import { Layout } from "../../components/layouts";
import { AddressCard, ProfileCard } from "../../components/ui/Cards";
import Loading from "../../components/ui/Loading";
import {
  useGetAddressQuery,
  useGetCustomerProfileQuery,
} from "../../services/api";

const ProfilePage: NextPage = () => {
  const {
    isLoading: isAddressLoading,
    isFetching: isAddressFetching,
    isError: isAddressError,
    data,
    isSuccess: isAddressSuccess,
  } = useGetAddressQuery();
  const {
    isLoading: isProfileLoading,
    isFetching: isProfileFetching,
    data: profileData,
    isSuccess: isProfileSuccess,
    isError: isProfileError,
  } = useGetCustomerProfileQuery();

  return (
    <Layout title="Perfil">
      <div className="md:flex md:justify-between md:space-x-8">
        <section className="flex-1">
          <div className="pb-4 mt-6 flex justify-between">
            <h1 className="font-semibold">Perfil</h1>
          </div>
          <div className="space-y-2">
            {isProfileLoading && <Loading />}
            {isProfileSuccess && profileData && (
              <ProfileCard {...profileData} />
            )}
            {isProfileError && "Error al cargar el perfil"}
          </div>
        </section>

        <section className="flex-1">
          <div className="pb-4 mt-6 flex justify-between">
            <h1 className="font-semibold">Direcciones</h1>
            {isAddressSuccess && data.length < 3 && (
              <h1 className="font-semibold text-sm text-primary">
                Añadir Dirección
              </h1>
            )}
          </div>
          <div className="space-y-2">
            {isAddressLoading && <Loading />}
            {isAddressSuccess &&
              data.map((address, index) => (
                <AddressCard
                  key={address.id}
                  address={{ ...address }}
                  orderId={`${index + 1}`}
                />
              ))}
            {isAddressError && "Error al cargar las direcciones"}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProfilePage;

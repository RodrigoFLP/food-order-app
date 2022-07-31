import { FC } from "react";
import { Info } from "react-feather";
import { useGetStoresQuery } from "../../services/api";
import { Input, SelectInput } from "../ui/Inputs";

export const PickupForm: FC = () => {
  const { data, isError, isLoading, isSuccess } = useGetStoresQuery();

  return isSuccess ? (
    <form>
      <p>Selecciona la sucursal</p>
      <SelectInput
        setValue={() => {}}
        error={false}
        initialValue={1}
        label="Sucursal"
        options={data?.map((store) => `${store.name} - ${store.addressLine1}`)}
      />
      <p>Datos</p>
      <Input
        error={false}
        label="Nombre de quién recogera la orden"
        Icon={Info}
      />
    </form>
  ) : null;
};

export default PickupForm;

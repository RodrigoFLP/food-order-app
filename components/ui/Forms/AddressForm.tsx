import { SelectInput, Input } from "../Inputs";
import { BarButton, LocationButton } from "../Buttons";
import { Map, MapPin, Save } from "react-feather";

import { SubmitHandler, useForm } from "react-hook-form";
import { Address, Coordinate, SignupForm } from "../../../interfaces";
import { validationAddress } from "../../../utils/schemas";
import { FC } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useUpdateAddressMutation } from "../../../services/auth";

import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  address: Address;
  onClickLocationButton: () => void;
  coordinate: Coordinate | null;
  onSave: () => void;
}

export const AddressForm: FC<Props> = ({
  address,
  onClickLocationButton,
  coordinate,
  onSave,
}) => {
  const [updateAddress] = useUpdateAddressMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupForm>({
    resolver: yupResolver(validationAddress),
    defaultValues: {
      state: address?.state,
      city: address?.city,
      addressLine1: address?.addressLine1,
      addressLine2: address?.addressLine2,
      addressReference: address?.addressReference,
    },
  });

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    try {
      if (!coordinate) {
        throw new Error("Ubicación no seleccionada");
      }

      toast("Actualizando...", {
        toastId: "updating",
        isLoading: true,
        position: "top-right",
      });
      const res = (await updateAddress({
        ...data,
        id: address.id,
        lat: coordinate.lat,
        lon: coordinate.lon,
      })) as any;

      if (res.error) {
        throw new Error("No se pudo actualizar");
      }
      onSave();
      toast.dismiss("updating");
    } catch (err) {
      toast.dismiss("updating");
      toast("No se ha podido actualizar", {
        toastId: "error",
        delay: 500,
        autoClose: 500,
        type: "error",
        position: "top-right",
      });
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 items-center">
        <SelectInput
          label="Departamento"
          register={register("state", { required: true })}
          errorMessage={errors.state?.message}
          error={errors.state ? true : false}
          options={["Santa Ana", "San Salvador"]}
          initialValue={1}
          setValue={() => {}}
        />
        <SelectInput
          label="Municipio"
          register={register("city", { required: true })}
          errorMessage={errors.city?.message}
          error={errors.city ? true : false}
          options={["Santa Ana", "San Salvador"]}
          initialValue={1}
          setValue={() => {}}
        />
        <Input
          label="Dirección"
          Icon={Map}
          register={register("addressLine1", { required: true })}
          errorMessage={errors.addressLine1?.message}
          error={errors.addressLine1 ? true : false}
        />
        <Input
          label="Dirección línea 2"
          Icon={Map}
          register={register("addressLine2", { required: true })}
          errorMessage={errors.addressLine2?.message}
          error={errors.addressLine2 ? true : false}
        />
        <Input
          label="No. de casa o apto."
          Icon={MapPin}
          register={register("addressReference", { required: true })}
          errorMessage={errors.addressReference?.message}
          error={errors.addressReference ? true : false}
        />
        <LocationButton
          type="button"
          handleClick={onClickLocationButton}
          isSelected={coordinate ? true : false}
        />
      </section>
      <BarButton Icon={Save}>Guardar cambios</BarButton>
      <ToastContainer />
    </form>
  );
};

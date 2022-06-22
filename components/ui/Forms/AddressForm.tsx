import Input from "../Inputs/Input";
import { SelectInput } from "../Inputs";
import { BarButton } from "../Buttons";
import { Map, MapPin } from "react-feather";

import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { SignupForm } from "../../../interfaces";
import { validationSignup } from "../../../utils/schemas";
import { useCallback } from "react";
import techposApi from "../../../api/techposApi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const useYupValidationResolver = (validationSchema: typeof validationSignup) =>
  useCallback<Resolver<SignupForm>>(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors: any) {
        console.log(data, errors);
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

export const AddressForm = () => {
  const resolver = useYupValidationResolver(validationSignup);

  const router = useRouter();

  const handleClick = () => {
    console.log("show modal");
  };

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    try {
      const res = await toast
        .promise(
          techposApi.post("/auth/register", {
            email: data.email,
            password: data.password,
            customer: {
              firstName: data.firstName,
              lastName: data.lastname,
              phoneNumber: data.phoneNumber,
              birthDate: data.birthDate,
              receiveAds: false,
              address: {
                state: data.state,
                city: data.city,
                addressLine1: data.address,
                addressReference: data.addressDetail,
                coordinates: "0,0",
              },
            },
          }),
          {
            success: "Usuario registrado",
            pending: "Registrando",
            error: "No se ha podido crear el usuario",
          },
          { autoClose: 1000, position: "bottom-right" }
        )
        .then(() => router.replace("/"));

      router.push("/");
    } catch (err) {}
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupForm>({ resolver });

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
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
        <SelectInput
          label="Colonia"
          register={register("locality", { required: true })}
          errorMessage={errors.locality?.message}
          error={errors.locality ? true : false}
          options={["Santa Ana", "San Salvador"]}
          initialValue={1}
          setValue={() => {}}
        />
        <Input
          label="Dirección"
          Icon={Map}
          register={register("address", { required: true })}
          errorMessage={errors.address?.message}
          error={errors.address ? true : false}
        />
        <Input
          label="No. de casa o apto."
          Icon={MapPin}
          register={register("addressDetail", { required: true })}
          errorMessage={errors.addressDetail?.message}
          error={errors.addressDetail ? true : false}
        />
        <BarButton type="button" handleClick={handleClick} Icon={MapPin}>
          Seleccionar ubicación
        </BarButton>
      </section>
    </form>
  );
};

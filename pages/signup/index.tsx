import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import { Lock, Mail, Map, MapPin, Smartphone, User } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import { Layout } from "../../components/layouts";
import { BarButton, LocationButton } from "../../components/ui/Buttons";
import { DateInput, Input, SelectInput } from "../../components/ui/Inputs";

import { validationSignup } from "../../utils/schemas";
import { SignupForm } from "../../interfaces";

import "react-toastify/dist/ReactToastify.css";
import { useSignUpMutation } from "../../services/api";
import { useAppDispatch } from "../../store/hooks";
import { setCredentials } from "../../store";

interface Coordinate {
  lat: number;
  lon: number;
}

const SignupPage: NextPage = () => {
  const LocationModal = dynamic(
    () => import("../../components/ui/Modals/LocationModal"), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  );

  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupForm>({ resolver: yupResolver(validationSignup) });

  const [showModal, setShowModal] = useState(false);

  const [coordinate, setCoordinate] = useState<Coordinate | null>(null);

  const dispatch = useAppDispatch();
  const [signUp] = useSignUpMutation();

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    try {
      toast("Registrando...", {
        toastId: "signup",
        isLoading: true,
        position: "bottom-right",
      });
      if (!coordinate) {
        throw new Error("No has seleccionado la ubicación");
      }
      const payload = await signUp({
        email: data.email,
        password: data.password,
        customer: {
          firstName: data.firstName,
          lastName: data.lastname,
          phoneNumber: data.phoneNumber,
          receiveAds: false,
          birthDate: data.birthDate,
          address: {
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
            city: data.city,
            state: data.state,
            addressReference: data.addressReference,
            lat: coordinate?.lat,
            lon: coordinate?.lon,
          },
        },
      }).unwrap();
      dispatch(setCredentials(payload));

      router.replace(
        router.query.p
          ? `/signup/successful/p=${router.query.p as string}`
          : "/signup/successful"
      );
    } catch (err: any) {
      toast.dismiss("signup");
      setTimeout(
        () =>
          toast(`${err.data ? err.data.message : err} `, {
            type: "error",
            autoClose: 2000,
            position: "bottom-right",
          }),
        500
      );
      console.log("try");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <Layout title="Registro">
      <LocationModal
        show={showModal}
        handleClose={handleCloseModal}
        setCoordinate={setCoordinate}
        coordinate={coordinate}
      />
      <div className="flex flex-col items-center space-y-4">
        <p className=" sm:w-3/4 md:1/2 bg-shade m-4 p-4 rounded-lg text-sm">
          Si tienes una cuenta en Panchos Villa, podrás revisar tus pedidos ,
          direcciones de entrega. ¡Así agilizarás el proceso de compra y estarás
          comiendo tus tacos antes de lo esperado!
        </p>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="font-semibold text-center pb-4 uppercase">
            Información personal
          </h2>
          <hr />
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 items-end">
            <Input
              label="Nombres"
              register={register("firstName", { required: true })}
              error={errors.firstName ? true : false}
              errorMessage={errors.firstName?.message}
              Icon={User}
            />
            <Input
              label="Apellidos"
              register={register("lastname", { required: true })}
              error={errors.lastname ? true : false}
              errorMessage={errors.lastname?.message}
              Icon={User}
            />
            <Input
              label="Teléfono"
              maxLength={8}
              type="tel"
              register={register("phoneNumber", { required: true })}
              error={errors.phoneNumber ? true : false}
              errorMessage={errors.phoneNumber?.message}
              Icon={Smartphone}
            />
            <DateInput
              label="Fecha de nacimiento"
              register={register("birthDate", { required: true })}
              errorMessage={"Ingresa una fecha válida"}
              error={errors.birthDate ? true : false}
            />
            <Input
              label="Correo"
              type="email"
              Icon={Mail}
              register={register("email", { required: true })}
              errorMessage={errors.email?.message}
              error={errors.email ? true : false}
            />
            <Input
              label="Contraseña"
              Icon={Lock}
              type="password"
              register={register("password", { required: true })}
              errorMessage={errors.password?.message}
              error={errors.password ? true : false}
            />
          </section>
          <h2 className="font-semibold text-center pt-8 pb-4 uppercase">
            Dirección principal
          </h2>
          <hr />
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 items-center ">
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
              label="Dirección (Línea 1)"
              Icon={Map}
              register={register("addressLine1", { required: true })}
              errorMessage={errors.addressLine1?.message}
              error={errors.addressLine1 ? true : false}
            />
            <Input
              label="Dirección (Línea 2)"
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
              handleClick={handleClick}
              isSelected={coordinate ? true : false}
            />
          </section>
          <div className="pt-8">
            <BarButton type="submit">Registrarse</BarButton>
          </div>
        </form>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default SignupPage;

import { useRouter } from "next/router";
import { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import { validationSignup } from "../utils/schemas";
import { SignupForm } from "../interfaces";

import { useSignUpMutation } from "../services/api";
import { useAppDispatch } from "../store/hooks";
import { setCredentials } from "../store";

interface Coordinate {
  lat: number;
  lon: number;
}

export const useSignUp = () => {
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
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClick = () => {
    setShowModal(true);
  };

  return {
    showModal,
    handleCloseModal,
    coordinate,
    setCoordinate,
    register,
    errors,
    onSubmit,
    handleSubmit,
    handleClick,
  };
};

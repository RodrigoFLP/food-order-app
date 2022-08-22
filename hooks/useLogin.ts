import { useRouter } from "next/router";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { validationLogin } from "../utils/schemas";

import { useAppDispatch } from "../store/hooks";
import { setCredentials } from "../store/auth/authSlice";

import { useLoginMutation } from "../services/api";
import { yupResolver } from "@hookform/resolvers/yup";

interface IFormInput {
  username: string;
  password: string;
}

export const useLogin = () => {
  const form = useForm<IFormInput>({ resolver: yupResolver(validationLogin) });

  const router = useRouter();

  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    try {
      toast("Ingresando...", {
        toastId: "login",
        isLoading: true,
        position: "bottom-right",
      });
      const payload = await login(data).unwrap();
      dispatch(setCredentials(payload));
      router.replace(router.query.p ? (router.query.p as string) : "/");
    } catch (err: any) {
      form.reset({ password: "" });
      toast.dismiss("login");
      toast(
        `${err.data ? err.data.message : "No se ha podido iniciar sesión"} `,
        {
          type: "error",
          autoClose: 2000,
          delay: 500,
          position: "bottom-right",
        }
      );
    }
  };

  return { ...form, onSubmit };
};

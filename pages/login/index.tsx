import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";

import { User, Lock } from "react-feather";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import { Layout } from "../../components/layouts";
import { Input } from "../../components/ui/Inputs";
import { BarButton } from "../../components/ui/Buttons";

import { validationLogin } from "../../utils/schemas";

import { useAppDispatch } from "../../store/hooks";
import { setCredentials } from "../../store/auth/authSlice";

import "react-toastify/dist/ReactToastify.css";
import { useLoginMutation } from "../../services/auth";
import { yupResolver } from "@hookform/resolvers/yup";

interface IFormInput {
  username: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm<IFormInput>({ resolver: yupResolver(validationLogin) });

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
      reset({ password: "" });
      toast.dismiss("login");
      toast(`${err.data.message ? err.data.message : err} `, {
        type: "error",
        autoClose: 2000,
        delay: 500,
        position: "bottom-right",
      });
    }
  };

  return (
    <Layout title="Ingresar">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="font-bold text-xl">Ingresar</h1>
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register("username", { required: true })}
            label="Correo electrónico"
            error={errors.username ? true : false}
            errorMessage={errors.username?.message}
            Icon={User}
          />
          <Input
            register={register("password", { required: true })}
            label="Contraseña"
            type="password"
            error={errors.password ? true : false}
            errorMessage={errors.password?.message}
            Icon={Lock}
          />
          <div
            className="text-xs text-right underline 
                    decoration-2 decoration-primary pb-2"
          >
            <Link href="/login/forgot">
              <a className="hover:text-primary">¿Has olvidado tu contraseña?</a>
            </Link>
          </div>
          <BarButton type="submit">Ingresar</BarButton>
        </form>
      </div>
      <section className="flex flex-col items-center pt-8">
        <Link href="/signup" passHref>
          <button
            className="flex items-center flex-col p-4 
                rounded-xl bg-slate-100 cursor-pointer peer group active:scale-95"
          >
            <h1 className="font-extrabold peer">¿Aún no tienes cuenta?</h1>
            <h1
              className="underline decoration-2 decoration-primary
                         font-semibold text-primary group-hover:text-secondary 
                         group-hover:decoration-secondary"
            >
              Registrate
            </h1>
          </button>
        </Link>
      </section>
      <ToastContainer />
    </Layout>
  );
};

export default LoginPage;

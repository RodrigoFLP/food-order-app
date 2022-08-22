import { NextPage } from "next";
import Link from "next/link";
import { User, Lock } from "react-feather";
import { Layout } from "../../components/layouts";
import { Input } from "../../components/ui/Inputs";
import { BarButton } from "../../components/ui/Buttons";

import "react-toastify/dist/ReactToastify.css";
import { useLogin } from "../../hooks/useLogin";

const LoginPage: NextPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    onSubmit,
  } = useLogin();

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
          <Link href="/signup" passHref>
            <button
              className="flex items-center flex-col p-4 w-full
                rounded-xl bg-white border shadow-sm cursor-pointer peer group active:scale-95"
            >
              <h1 className="font-extrabold peer">¿Aún no tienes cuenta?</h1>
              <h1
                className="underline decoration-2 decoration-primary
                         font-semibold text-primary group-hover:text-secondary 
                         group-hover:decoration-secondary "
              >
                Registrate
              </h1>
            </button>
          </Link>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;

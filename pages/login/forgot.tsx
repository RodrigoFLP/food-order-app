import { NextPage } from "next";
import { Mail } from "react-feather";
import { useForm } from "react-hook-form";
import { Layout } from "../../components/layouts";
import { Input } from "../../components/ui/Inputs";
import { BarButton } from "../../components/ui/Buttons";

interface IFormInput {
  email: string;
}

const ForgotPage: NextPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit = () => {
    console.log("hi");
  };

  return (
    <Layout title="Restablecer contraseña">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-lg font-bold">Restablece la contraseña</h1>
        <span className="text-sm">
          Se te enviará un correo con las instrucciones a seguir para
          reestablecer tu contraseña
        </span>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register("email", { required: true })}
            label="Correo electrónico"
            error={errors.email ? true : false}
            errorMessage={errors.email?.message}
            Icon={Mail}
          />
          <BarButton type="submit">Enviar</BarButton>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPage;

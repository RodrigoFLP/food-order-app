import { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "../../components/layouts";

const ConfirmEmailErrorPage: NextPage = () => {
  const {
    query: { message },
  } = useRouter();

  return (
    <Layout title="Confirmar correo">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-lg font-bold">Registro exitoso</h1>

        <span className="text-sm">
          Revisa tu correo para encontrar el enlace de verificación, si no lo
          encuentras en tu bandeja de entrada, revisa la carpeta de spam.
        </span>
      </div>
    </Layout>
  );
};

export default ConfirmEmailErrorPage;

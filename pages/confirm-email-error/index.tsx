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
        <h1 className="text-lg font-bold">Confirmación de correo</h1>

        <span className="text-sm">
          {message == "done" && "Tu email ya está confirmado"}
          {message == "invalid" && "En enlace es inválido"}
        </span>
      </div>
    </Layout>
  );
};

export default ConfirmEmailErrorPage;

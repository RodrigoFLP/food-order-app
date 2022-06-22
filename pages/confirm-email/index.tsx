import { NextPage } from "next";
import { Layout } from "../../components/layouts";

interface IFormInput {
  email: string;
}

const ForgotPage: NextPage = () => {
  return (
    <Layout title="Confirmar correo">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-lg font-bold">Confirmación de correo</h1>
        <span className="text-sm">
          Tu email ha sido confirmado satisfactoriamente
        </span>
      </div>
    </Layout>
  );
};

export default ForgotPage;

import { NextPage } from "next";
import { Edit } from "react-feather";
import { Layout } from "../../components/layouts";

const ProfilePage: NextPage = () => {
  return (
    <Layout title="Perfil">
      <div className="">
        <div className="rounded-2xl bg-white shadow-sm p-4">
          <h1 className="font-semibold">¡Bienvenido Rodrigo!</h1>
          <div className="pt-4 text-sm space-y-2">
            <div>
              <span className="bg-secondary rounded-2xl p-1 px-2 text-white font-semibold mr-2">
                Última orden
              </span>
              17 de mayo de 2021
            </div>
            <div>
              <span className="bg-secondary rounded-2xl p-1 px-2 text-white font-semibold mr-2">
                Total de ordenes:
              </span>
              3
            </div>
          </div>
        </div>
        <h1 className="font-semibold pb-4 mt-6">Direcciones</h1>
        <div className="bg-white text-black border rounded-xl shadow-sm p-4 flex justify-between text-sm">
          <div>
            <h2 className="font-semibold">Dirección 1</h2>
            <div>Departamento, municipio</div>
            <div>Colonia buena vista calle número 17</div>
            <div>#28</div>
          </div>
          <Edit />
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;

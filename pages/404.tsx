import Link from "next/link";
import { BarButton } from "../components/ui/Buttons";

export default function Custom404() {
  return (
    <>
      <div className="flex flex-col space-y-4 justify-center items-center h-screen">
        <div className="font-bold text-xl">¡Ha ocurrido un error!</div>
        <div className="space-y-2">
          <div className=" text-base text-center">Intenta recargar o</div>
          <div>
            <Link href="/" passHref shallow={false}>
              <BarButton>Vuelve al inicio</BarButton>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

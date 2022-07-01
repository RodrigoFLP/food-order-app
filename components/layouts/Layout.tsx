import Head from "next/head";
import { FC, ReactNode, useEffect, useState } from "react";
import { selectIsLoggedIn, selectUser } from "../../store";
import { useAppSelector } from "../../store/hooks";
import { Footer, Navbar } from "../ui";

interface Props {
  children: ReactNode;
  title?: string;
  margin?: boolean;
}

export const Layout: FC<Props> = ({ children, title, margin = false }) => {
  const { isEmailConfirmed } = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>{title || "Shop"}</title>
        <meta name="description" content="This is a shop" />
      </Head>
      {isClient && isLoggedIn && !isEmailConfirmed && (
        <div
          className="bg-shade p-4 text-black
        text-sm animate-opacityin animate-heightin clip-rect
        "
        >
          Tú email no ha sido confirmado. Revisa tu correo o{" "}
          <span className="underline">reenvía la confirmación</span>
        </div>
      )}
      <Navbar />
      <main className={`lg:flex p-6 pt-2 px-6 justify-center w-full`}>
        <div className="lg:w-11/12 xl:w-10/12 2xl:7/12">{children}</div>
      </main>
      <Footer margin={margin} />
    </>
  );
};

export default Layout;

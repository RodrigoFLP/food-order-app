import Head from "next/head";
import { FC, ReactNode, useEffect, useState } from "react";
import { selectIsLoggedIn, selectUser } from "../../store";
import { useAppSelector } from "../../store/hooks";
import { EmailAlert, Footer, Navbar } from "../ui";

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
      {isClient && isLoggedIn && !isEmailConfirmed && <EmailAlert />}
      <Navbar />
      <main className={`lg:flex p-6 pt-2 px-6 justify-center w-full`}>
        <div className="lg:w-11/12 xl:w-8/12 2xl:6/12">{children}</div>
      </main>
      <Footer margin={margin} />
    </>
  );
};

export default Layout;

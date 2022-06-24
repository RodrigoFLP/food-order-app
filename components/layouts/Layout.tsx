import Head from "next/head";
import { FC, ReactNode } from "react";
import { Footer, Navbar } from "../ui";

interface Props {
  children: ReactNode;
  title?: string;
  margin?: boolean;
}

export const Layout: FC<Props> = ({ children, title, margin = false }) => {
  return (
    <>
      <Head>
        <title>{title || "Shop"}</title>
        <meta name="description" content="This is a shop" />
      </Head>
      <Navbar />
      <main className={`lg:flex p-6 pt-2 px-6 justify-center w-full`}>
        <div className="lg:w-11/12 xl:w-10/12 2xl:7/12">{children}</div>
      </main>
      <Footer margin={margin} />
    </>
  );
};

export default Layout;

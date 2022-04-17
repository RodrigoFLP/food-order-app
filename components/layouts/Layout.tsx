import Head from "next/head";
import { FC, ReactNode } from "react";
import { Footer, Navbar } from "../ui";

interface Props {
    children: ReactNode;
    title?: string;
}


export const Layout: FC<Props> = ({ children, title }) => {

    return (
        <>
            <Head>
                <title>
                    {title || 'Shop'}
                </title>
                <meta name="description" content="This is a shop" />
            </Head>
            <Navbar />
            <main className="p-6 pt-2 md:px-28">
                {children}
            </main>
            <Footer />
        </>

    );

}

export default Layout;
import Head from "next/head";
import { FC, ReactNode } from "react";
import { Footer, Navbar } from "../ui";

interface Props {
    children: ReactNode;
    title?: string;
    margin?: boolean;
}


export const Layout: FC<Props> = ({ children, title, margin = true }) => {

    return (
        <>
            <Head>
                <title>
                    {title || 'Shop'}
                </title>
                <meta name="description" content="This is a shop" />
            </Head>
            <Navbar />
            <main className={`${margin ? "p-6 pt-2" : ""}`}>
                {children}
            </main>
            <Footer />
        </>

    );

}

export default Layout;
import Head from "next/head";
import { FC, ReactNode } from "react";
import { useCheckAuth, useOnScroll } from "../../hooks";
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
                <title>
                    {title || 'Shop'}
                </title>
                <meta name="description" content="This is a shop" />
            </Head>
            <Navbar />
            <main className={`p-6 pt-2 px-6 ${margin && 'px-0'}`}>
                {children}
            </main>
            <Footer margin={margin} />
        </>

    );

}

export default Layout;
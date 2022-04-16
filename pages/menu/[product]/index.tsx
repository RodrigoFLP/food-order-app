import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Layout } from "../../../components/layouts";

const ProductPage: NextPage = () => {

    const { product } = useRouter().query;

    return (
        <Layout title={product as string}>


            <div className="flex space-x-8 md:px-32">
                <div className="relative w-1/4 rounded-3xl overflow-hidden aspect-square">
                    <Image src={'https://cdnimg.webstaurantstore.com/images/blogs/1804/gameday-header.jpg'}
                        alt={product as string}
                        layout='fill' className="object-cover bg-gradient-to-l from-slate-50">

                    </Image>
                </div>
                <h1 className="font-bold text-2xl w-1/2">
                    {product}
                </h1>
            </div>


        </Layout >
    );
}

import { GetStaticProps } from 'next'
import { products } from "../../../data";

// export const getStaticProps: GetStaticProps = async (ctx) => {
//     const productsList = products;

//     return {
//         props: {

//         }
//     }
// }

export default ProductPage;
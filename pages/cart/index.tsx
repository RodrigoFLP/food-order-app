import { NextPage } from "next";
import { Layout } from "../../components/layouts";
import { BarButton } from "../../components/ui";
import CartListTile from "../../components/ui/CartListTile";


const CartPage: NextPage = () => {


    const handleClick = () => {
        console.log('click');
    }

    return (
        <Layout title="Carrito">
            <h1 className="text-xl font-bold">
                Carrito
            </h1>
            <div className="flex flex-col md:flex-row pt-4 space-y-8 md:space-y-0 md:space-x-4">
                <section className="w-full md:flex-1">
                    <CartListTile
                        onClick={handleClick}
                        title="Tacos"
                        price={10.99}
                        description="Este es un producto"
                        src="http://dummyimage.com/175x100.png/cc0000/ffffff" />
                </section>
                <section className="md:w-1/3 md:px-8 space-y-4">
                    <div className="flex justify-between">
                        <div>
                            Subtotal
                        </div>
                        <div className="font-semibold">
                            $10.99
                        </div>
                    </div>
                    <BarButton title='Continuar' />
                </section>

            </div>

        </Layout>
    )
}

export default CartPage;
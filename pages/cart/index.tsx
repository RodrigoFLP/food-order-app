import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { BarButton } from "../../components/ui";
import CartListTile from "../../components/ui/CartListTile";
import { selectItems, selectTotal } from "../../store";
import { useAppSelector } from "../../store/hooks";


const CartPage: NextPage = () => {

    const items = useAppSelector(selectItems);
    const total = useAppSelector(selectTotal);

    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        setShowCart(true);
    }, [])

    return (
        <Layout title="Carrito">

            <h1 className="text-lg font-bold">
                Carrito
            </h1>
            {showCart && <div className="flex flex-col pt-4 md:flex-row space-y-8 md:space-y-0 md:space-x-4">

                <section className="w-full md:flex-1 space-y-2">
                    {
                        items.length > 0 ? items.map((item) => {
                            return <CartListTile
                                key={item.orderId}
                                order={item}
                                src="http://dummyimage.com/175x100.png/cc0000/ffffff" />
                        }) :
                            <h1 className="text-center text-md">
                                El carrito está vacío
                            </h1>
                    }
                </section>
                <section className="md:w-1/3 md:px-4 space-y-4 p-4  bg-white rounded-xl shadow-sm">
                    <div className="flex justify-between">
                        <div>
                            Subtotal
                        </div>
                        <div className="font-semibold">
                            ${Math.abs(total).toFixed(2)}
                        </div>
                    </div>
                    <BarButton>
                        Continuar
                    </BarButton>
                </section>

            </div>}

        </Layout>
    )
}

export default CartPage;
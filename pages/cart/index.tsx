import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { ShoppingCart } from "react-feather";

import { Layout } from "../../components/layouts";
import { BarButton } from "../../components/ui/Buttons";
import { CartListTile } from "../../components/ui/Cards";

import { selectItems, selectTotal } from "../../store";
import { useAppSelector } from "../../store/hooks";
import { useGetIsOpenQuery } from "../../services/api";

const CartPage: NextPage = () => {
  const items = useAppSelector(selectItems);
  const total = useAppSelector(selectTotal);

  const [showCart, setShowCart] = useState(false);
  const router = useRouter();

  const {
    data: scheduling,
    isLoading,
    isError,
    isUninitialized,
  } = useGetIsOpenQuery();

  useEffect(() => {
    setShowCart(true);
  }, []);

  return (
    <Layout title="Carrito">
      <h1 className="text-xl font-bold pb-4">Carrito</h1>
      <hr />
      {showCart && (
        <div className="flex flex-col pt-6 md:flex-row space-y-8 md:space-y-0 md:space-x-4">
          <section className="w-full md:flex-1 space-y-2">
            {items.length > 0 ? (
              items.map((item) => {
                return (
                  <CartListTile
                    key={item.orderItemId}
                    order={item}
                    src="http://dummyimage.com/175x100.png/cc0000/ffffff"
                  />
                );
              })
            ) : (
              <h1 className="text-center text-md">El carrito está vacío</h1>
            )}
          </section>
          <section className="md:w-1/3 md:px-4 space-y-4 p-4 bg-white rounded-lg border h-full">
            <div className="flex justify-between px-2">
              <div>Subtotal</div>
              <div className="font-semibold">${Math.abs(total).toFixed(2)}</div>
            </div>
            {scheduling && (
              <BarButton
                Icon={ShoppingCart}
                handleClick={() => router.push("/checkout")}
                disabled={
                  !showCart
                    ? true
                    : !(items.length > 0) || scheduling.isOpen
                    ? false
                    : true
                }
              >
                Continuar
              </BarButton>
            )}
          </section>
        </div>
      )}
      <div className="fixed bottom-0 right-0 p-4 w-full md:w-1/3"></div>
    </Layout>
  );
};

export default CartPage;

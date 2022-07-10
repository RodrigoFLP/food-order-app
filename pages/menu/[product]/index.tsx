import { NextPage } from "next";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { useState } from "react";

import { ButtonIcon } from "../../../components/ui/Buttons";
import { Layout } from "../../../components/layouts";
import { PortionsList, TagsList } from "../../../components/ui";
import { BarButton } from "../../../components/ui/Buttons";

import {
  IProduct,
  OrderItemState,
  PortionState,
  TagGroupState,
} from "../../../interfaces";

import { useAppDispatch } from "../../../store/hooks";
import { add } from "../../../store";

import { nanoid } from "@reduxjs/toolkit";
import { Minus, Plus } from "react-feather";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const defaultTags = product.portions[0].tagGroups.map((tagGroup) => ({
    name: tagGroup.name,
    quantity: 0,
    tags: [
      {
        id: null,
        name: "",
        value: "",
        quantity: 0,
        price: 0,
      },
    ],
  }));

  const initialOrderState = {
    orderItemId: nanoid(),
    productId: product.id,
    productName: product.name,
    quantity: 1,
    portion: {
      id: product.portions[0].id,
      name: product.portions[0].name,
      price: product.portions[0].price,
    },
    tagsGroups: defaultTags,
    price: product.portions[0].price,
    unitPrice: product.portions[0].price,
  };

  const [order, setOrder] = useState<OrderItemState>(initialOrderState);

  const handleAddClick = () => {
    toast("Agregado al carrito", {
      type: "success",

      autoClose: 300,
      // icon: <ShoppingCart />,
    });
    dispatch(add({ ...order, orderItemId: nanoid() }));
    setOrder(initialOrderState);
  };

  const calculateTotal = (
    portion: PortionState,
    tagsGroups: TagGroupState[],
    qty: number
  ) => {
    const totalAmount =
      (portion.price +
        tagsGroups.reduce(
          (previousGroup, currentGroup) =>
            previousGroup +
            currentGroup.tags.reduce(
              (previousTag, currentTag) =>
                previousTag + currentTag.quantity * currentTag.price,
              0
            ),
          0
        )) *
      qty;

    return totalAmount;
  };

  const calculateUnitTotal = (
    portion: PortionState,
    tagsGroups: TagGroupState[]
  ) => {
    const totalAmount =
      portion.price +
      tagsGroups.reduce(
        (previousGroup, currentGroup) =>
          previousGroup +
          currentGroup.tags.reduce(
            (previousTag, currentTag) =>
              previousTag + currentTag.quantity * currentTag.price,
            0
          ),
        0
      );

    return totalAmount;
  };

  const handlePortionChange = (portion: any) => {
    return setOrder((prevOrder) => ({
      ...prevOrder,
      tagsGroups: product.portions
        .find((p) => p.id === portion.id)!
        .tagGroups.map((tagGroup) => ({
          name: tagGroup.name,
          quantity: 0,
          tags: [
            {
              id: null,
              name: "",
              value: "",
              quantity: 0,
              price: 0,
            },
          ],
        })),
      portion: { id: portion.id, name: portion.name, price: portion.price },
      price: calculateTotal(portion, prevOrder.tagsGroups, prevOrder.quantity),
      unitPrice: calculateUnitTotal(portion, prevOrder.tagsGroups),
    }));
  };

  const handleTagChange = (tag: any, name: string) => {
    setOrder((prevOrder) => {
      const newTagsGroups = [
        ...prevOrder.tagsGroups.map((tagGroup) => {
          if (tagGroup.name !== tag.name) {
            return tagGroup;
          }
          return tag;
        }),
      ];

      return {
        ...prevOrder,
        tagsGroups: newTagsGroups,
        price: calculateTotal(
          prevOrder.portion,
          newTagsGroups,
          prevOrder.quantity
        ),
        unitPrice: calculateUnitTotal(prevOrder.portion, newTagsGroups),
      };
    });
  };

  return (
    <Layout title={product.name} margin>
      <div className="flex flex-col w-full items-center space-y-0 md:space-y-0 mt-2">
        <div className="w-full">
          <div className="relative overflow-hidden bg-primary border p-8 h-56 space-y-4 pb-14 rounded-t-2xl">
            <div className="block">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                className="object-cover bg-gradient-to-l from-slate-50 z-0"
              ></Image>
            </div>
          </div>
          <div className="w-full bg-white rounded-3xl relative -top-6 shadow-sm border">
            <section className=" z-10 rounded-2xl p-6 pb-3 space-y-2">
              <h1 className="font-semibold text-2xl sm:text-2xl text-black z-10">
                {product.name}
              </h1>
              <p className="text-black z-10 text-sm">{product.description}</p>
            </section>
            <hr className="m-2" />
            <section className="md:w-4/5 space-y-4 p-6 pt-3">
              <PortionsList
                selectedPortion={order.portion.name}
                portions={product.portions}
                handleChange={handlePortionChange}
              />
            </section>

            {product.portions
              .find((portion) => portion.id === order.portion.id)!
              .tagGroups.map((tagGroup, index) => (
                <section
                  key={tagGroup.name}
                  className="md:w-4/5 space-y-4 p-6 pt-2"
                >
                  <TagsList
                    tagGroup={tagGroup}
                    tagsInitialState={order.tagsGroups[index]}
                    handleChange={handleTagChange}
                  />
                </section>
              ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 bg-white border-t w-full left-0 h-20 flex justify-center items-center">
        <div className="w-full lg:w-3/5 xl:1/2 flex px-4 space-x-8">
          <div className="flex flex-row space-x-4 items-center p-2 justify-between">
            <ButtonIcon
              handleClick={() =>
                order.quantity <= 1
                  ? ""
                  : setOrder((prevOrder) => ({
                      ...prevOrder,
                      quantity: prevOrder.quantity - 1,
                      price: calculateTotal(
                        prevOrder.portion,
                        prevOrder.tagsGroups,
                        prevOrder.quantity - 1
                      ),
                      unitPrice: calculateUnitTotal(
                        prevOrder.portion,
                        prevOrder.tagsGroups
                      ),
                    }))
              }
            >
              <Minus />
            </ButtonIcon>

            <span className="font-bold text-sm">{order.quantity}</span>

            <ButtonIcon
              style={true}
              handleClick={() =>
                setOrder((prevOrder) => ({
                  ...prevOrder,
                  quantity: prevOrder.quantity + 1,
                  price: calculateTotal(
                    prevOrder.portion,
                    prevOrder.tagsGroups,
                    prevOrder.quantity + 1
                  ),
                  unitPrice: calculateUnitTotal(
                    prevOrder.portion,
                    prevOrder.tagsGroups
                  ),
                }))
              }
            >
              <Plus color="white" />
            </ButtonIcon>
          </div>
          <BarButton handleClick={handleAddClick}>
            <div className="flex flex-col sm:flex-row justify-between w-full text-sm sm:text-base ">
              <div>Añadir</div>
              <div className="font-extrabold text-sm sm:text-base">
                ${order.price.toFixed(2)}
              </div>
            </div>
          </BarButton>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { product } = params as { product: string };

  const data = await (
    await fetch(`${process.env.API_URL}/products/${product}`)
  ).json();

  if (!data || data === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product: data,
    },
  };
};

export default ProductPage;

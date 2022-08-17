import Image from "next/image";
import { FC, useState } from "react";
import { PortionsList, TagsList } from "../ui";
import { BarButton } from "../ui/Buttons";

import {
  IProduct,
  OrderItemState,
  Portion,
  PortionState,
  TagGroupState,
} from "../../interfaces";

import { useAppDispatch } from "../../store/hooks";
import { add } from "../../store";

import { nanoid } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Counter from "../ui/Counter";

export interface Props {
  product: IProduct;
  onAdd: () => void;
}

export const Product: FC<Props> = ({ product, onAdd }) => {
  const dispatch = useAppDispatch();

  const defaultTags = product.portionsTagGroups
    .filter((tagGroup) => tagGroup.portions.includes(product.portions[0].id))
    .map((tagGroup) => ({
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

  const [order, setOrder] =
    useState<Omit<OrderItemState, "image">>(initialOrderState);

  const handleAddClick = () => {
    toast("Agregado al carrito", {
      type: "success",

      autoClose: 300,
    });
    dispatch(add({ ...order, orderItemId: nanoid(), image: product.image }));
    setOrder(initialOrderState);
    onAdd();
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

  const handlePortionChange = (portion: Portion) => {
    const initialTagGroups = product.portionsTagGroups
      .filter((tg) => tg.portions.includes(portion.id))
      .map((tagGroup) => ({
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

    return setOrder((prevOrder) => ({
      ...prevOrder,
      tagsGroups: initialTagGroups,
      portion: { id: portion.id, name: portion.name, price: portion.price },
      price: calculateTotal(portion, initialTagGroups, prevOrder.quantity),
      unitPrice: calculateUnitTotal(portion, initialTagGroups),
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

  const handleAddQuantity = () => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      quantity: prevOrder.quantity + 1,
      price: calculateTotal(
        prevOrder.portion,
        prevOrder.tagsGroups,
        prevOrder.quantity + 1
      ),
      unitPrice: calculateUnitTotal(prevOrder.portion, prevOrder.tagsGroups),
    }));
  };

  const handleRemoveQuantity = () => {
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
        }));
  };

  return (
    <div>
      <div className="flex flex-col w-full items-center mb-20 animate-opacityin">
        <div className="w-full">
          <div className="relative overflow-hidden bg-shade p-8 h-56 space-y-4 pb-14">
            <div className="block">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  className="object-cover bg-gradient-to-l from-slate-50 z-0"
                ></Image>
              )}
              <Image
                src="/card-placeholder.svg"
                height="200px"
                width="100%"
                alt="placeholder"
                className="opacity-5 text-center z-[0]"
              />
            </div>
          </div>
          <div className="w-full bg-white rounded-t-lg relative -top-6">
            <section className=" z-10 rounded-2xl p-6 pb-3 space-y-2">
              <h1 className="font-semibold text-xl sm:text-xl text-black z-10">
                {product.name}
              </h1>
              <p className="text-gray-700 z-10 text-sm">
                {product.description}
              </p>
            </section>
            <hr className="m-2" />
            <section className="md:w-4/5 space-y-4 p-6 pt-3">
              <PortionsList
                selectedPortion={order.portion.name}
                portions={product.portions}
                handleChange={handlePortionChange}
              />
            </section>

            {product.portionsTagGroups
              .filter((tg) => tg.portions.includes(order.portion.id))
              .map((tagGroup, index) => (
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

      <div className="fixed bottom-0 bg-red border-t h-20 flex px-4 items-center space-x-4 w-full sm:w-8/12 md:w-6/12 lg:w-4/12 bg-white">
        <Counter
          onPlusClick={handleAddQuantity}
          onMinusClick={handleRemoveQuantity}
          count={order.quantity}
        />
        <BarButton handleClick={handleAddClick}>
          <div className="flex flex-row justify-between w-full">
            <div>Añadir</div>
            <div>${order.price.toFixed(2)}</div>
          </div>
        </BarButton>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Product;

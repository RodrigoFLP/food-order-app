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
import { useProduct } from "../../hooks/useProduct";

export interface Props {
  product: IProduct;
  onAdd: () => void;
}

export const Product: FC<Props> = ({ product, onAdd }) => {
  const {
    order,
    handlePortionChange,
    handleTagChange,
    handleAddClick,
    handleAddQuantity,
    handleRemoveQuantity,
  } = useProduct({ product, onAdd });

  return (
    <div>
      <div className="flex flex-col w-full items-center mb-20 animate-opacityin">
        <div className="w-full">
          <div className="relative overflow-hidden bg-shade p-8 h-56 space-y-4 pb-14 flex justify-center items-center">
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

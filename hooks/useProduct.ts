import {
  IProduct,
  OrderItemState,
  Portion,
  PortionState,
  TagGroupState,
} from "../interfaces";

import { useAppDispatch } from "../store/hooks";
import { add } from "../store";

import { nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { useState } from "react";

export interface Props {
  product: IProduct;
  onAdd: () => void;
}

export const useProduct = ({ product, onAdd }: Props) => {
  const dispatch = useAppDispatch();

  const defaultTags = product.portionsTagGroups
    .filter((tagGroup) => tagGroup.portions.includes(product.portions[0].id))
    .map((tagGroup) => ({
      name: tagGroup.name,
      quantity: 0,
      min: tagGroup.min,
      max: tagGroup.max,
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
    const portionsWithoutMin = order.tagsGroups.filter(
      (tagGroup) => tagGroup.quantity < tagGroup.min
    );

    if (portionsWithoutMin.length > 0) {
      return toast(
        `Tienes que elegir al menos ${portionsWithoutMin[0].min} ${portionsWithoutMin[0].name}`,
        {
          toastId: "error",
          type: "error",
          autoClose: 1000,
        }
      );
    }

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
        max: tagGroup.max,
        min: tagGroup.min,
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

  return {
    order,
    handlePortionChange,
    handleTagChange,
    handleAddClick,
    handleAddQuantity,
    handleRemoveQuantity,
  };
};

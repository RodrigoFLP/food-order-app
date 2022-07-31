import { useState } from "react";

export const useProductModal = () => {
  const [productId, setProductId] = useState<number | null>(null);

  const isModalVisible = !!productId;

  const showProductModal = (productId: number) => {
    setProductId(productId);
  };

  const hideProductModal = () => {
    setProductId(null);
  };

  return [
    productId,
    isModalVisible,
    showProductModal,
    hideProductModal,
  ] as const;
};

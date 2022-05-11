import useSWR, { SWRConfiguration } from "swr";

// const fetcher = (...args: [key: string]) =>
//   fetch(...args).then((res) => res.json());

export interface CategoryProducts {
  id: number;
  name: string;
  description: string;
  image: string;
  productsList: Product[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const useProducts = (
  baseUrl: string,
  url: string,
  config: SWRConfiguration = {}
) => {
  const { data, error } = useSWR<CategoryProducts>(baseUrl + "/" + url, config);

  return {
    products: data,
    isLoadingProducts: !error && !data,
    errorProducts: error,
  };
};

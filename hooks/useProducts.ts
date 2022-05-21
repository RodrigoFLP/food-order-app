import useSWR, { SWRConfiguration } from "swr";
import { Category } from "../interfaces";

// const fetcher = (...args: [key: string]) =>
//   fetch(...args).then((res) => res.json());

export const useProducts = (
  baseUrl: string,
  url: string,
  config: SWRConfiguration = {}
) => {
  const { data, error } = useSWR<Category>(baseUrl + "/" + url, config);

  return {
    products: data,
    isLoadingProducts: !error && !data,
    errorProducts: error,
  };
};

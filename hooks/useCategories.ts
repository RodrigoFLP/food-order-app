import useSWR, { SWRConfiguration } from "swr";

import { Category } from "../interfaces";

// const fetcher = (...args: [key: string]) =>
//   fetch(...args).then((res) => res.json());

export const useCategories = (
  baseUrl: string,
  url: string,
  config: SWRConfiguration = {}
) => {
  const { data, error } = useSWR<Category[]>(baseUrl + "/" + url, config);

  return {
    categories: data || [],
    isLoadingCategories: !error && !data,
    errorCategories: error,
  };
};

import useSWR, { SWRConfiguration } from "swr";

// const fetcher = (...args: [key: string]) =>
//   fetch(...args).then((res) => res.json());

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

export const useCategories = (
  baseUrl: string,
  url: string,
  config: SWRConfiguration = {}
) => {
  const { data, error } = useSWR<Category[]>(baseUrl + "/" + url, config);

  return {
    categories: data || [],
    isLoading: !error && !data,
    error: error,
  };
};

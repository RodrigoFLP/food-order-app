import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "../../components/layouts";
import { ListTile } from "../../components/ui";
import { SliderButton } from "../../components/ui/Buttons";
import { CardsSlider } from "../../components/ui/Cards";
import Loading from "../../components/ui/Loading";

import { products } from "../../data";
import { Category } from "../../interfaces";
import {
  useGetCategoriesListQuery,
  useGetCategoryProductsQuery,
} from "../../services/api";

const productsList = products.products;

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  portions: string[];
  tags: string[];
  category: string;
  image: string;
}

const MenuPage: NextPage = () => {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<number>(
    parseInt(router.query.category! as string) || 0
  );
  // const [currentProducts, setCurrentProducts] = useState<Product[]>([]);

  const {
    data: categories,
    isError: isErrorCategories,
    isSuccess: isSuccessCategories,
    isLoading: isLoadingCategories,
  } = useGetCategoriesListQuery();
  const {
    data: products,
    isError: isErrorProducts,
    isSuccess: isSuccessLoadingProducts,
    isLoading: isLoadingProducts,
  } = useGetCategoryProductsQuery(selectedCategory);

  const onSelect = (category: any) => {
    setSelectedCategory(category);
  };

  return (
    <Layout title="Menú">
      <CardsSlider>
        {isSuccessCategories &&
          categories!.map((category) => (
            <SliderButton
              key={category.id}
              selected={selectedCategory === category.id}
              category={category}
              onSelect={onSelect}
            />
          ))}
      </CardsSlider>
      {isLoadingProducts && <Loading />}
      {isErrorProducts &&
        "No se pudieron cargar los productos, recarga la página"}
      {isSuccessLoadingProducts && products !== undefined && (
        <div className="xs:flex md:grid md:grid-cols-3 flex-col pt-8 space-y-4 md:space-y-0 md:gap-4">
          {(products! as Category).productsList.map((product) => (
            <ListTile {...product} src={product.image} key={product.id} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default MenuPage;

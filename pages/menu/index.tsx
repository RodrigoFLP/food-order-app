import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Layout } from "../../components/layouts";
import ProductModal from "../../components/product/ProductModal";
import { ListTile } from "../../components/ui";
import { SliderButton } from "../../components/ui/Buttons";
import { CardsSlider } from "../../components/ui/Cards";
import Loading from "../../components/ui/Loading";
import ListButtonsPlaceholder from "../../components/ui/placeholders/ListButtonsPlaceholder";

import { Category } from "../../interfaces";
import {
  useGetCategoriesListQuery,
  useGetProductsByCategoryMutation,
} from "../../services/api";

const MenuPage: NextPage = () => {
  const router = useRouter();

  const currentCategory = parseInt(router.query.category! as string);

  const {
    data: categories,
    isError: isErrorCategories,
    isSuccess: isSuccessCategories,
    isUninitialized: isUninitializedCategories,
    isLoading: isLoadingCategories,
  } = useGetCategoriesListQuery();

  const [getProducts, products] = useGetProductsByCategoryMutation();

  useEffect(() => {
    if (currentCategory) {
      getProducts(currentCategory);
    }
    //eslint-disable-next-line
  }, [currentCategory]);

  const onSelect = (category: number) => {
    router.push(`/menu?category=${category}`);
  };

  return (
    <Layout title="Menú">
      <CardsSlider>
        {isLoadingCategories && <ListButtonsPlaceholder />}
        {isSuccessCategories &&
          categories!.map((category) => (
            <SliderButton
              key={category.id}
              selected={currentCategory === category.id}
              category={category}
              onSelect={onSelect}
            />
          ))}
      </CardsSlider>
      {products.isLoading && (
        <div className="pt-8">
          <Loading />
        </div>
      )}
      {products.isSuccess &&
        products.data !== undefined &&
        !products.isLoading && (
          <div className="xs:flex md:grid md:grid-cols-3 flex-col pt-8 space-y-4 md:space-y-0 md:gap-4">
            {(products.data! as Category).productsList.map((product) => (
              <Link
                key={product.id}
                href={`/menu/?category=${currentCategory}&producto=${product.id}`}
                passHref
                prefetch={false}
              >
                <a className="block">
                  <ListTile {...product} src={product.image} key={product.id} />
                </a>
              </Link>
            ))}
            {products.isError &&
              "No se pudieron cargar los productos, recarga la página"}
          </div>
        )}
      {!!router.query.producto && (
        <ProductModal
          show={!!router.query.producto}
          onClose={() =>
            router.push(`/menu?category=${currentCategory}`, undefined, {
              scroll: false,
            })
          }
        />
      )}
    </Layout>
  );
};

export default MenuPage;

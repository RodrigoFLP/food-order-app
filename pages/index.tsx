import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "../components/layouts";
import { AdHeader, Search } from "../components/ui";
import { SliderButton } from "../components/ui/Buttons";

import { CardsSlider, ProductCard } from "../components/ui/Cards";
import { SectionContainer } from "../components/ui";
import ListButtonsPlaceholder from "../components/ui/placeholders/ListButtonsPlaceholder";
import { Category } from "../interfaces";

import {
  useGetCategoriesListQuery,
  useGetCategoryProductsQuery,
} from "../services/api";

import ProductModal from "../components/product/ProductModal";
import { useProductModal } from "../hooks/useProductModal";
import Link from "next/link";

const Home: NextPage = () => {
  const router = useRouter();

  const {
    data: categories,
    isError: errorCategories,
    isLoading: isLoadingCategories,
  } = useGetCategoriesListQuery();
  const {
    data: products,
    isError: errorProducts,
    isLoading: isLoadingProducts,
  } = useGetCategoryProductsQuery(1);

  console.log(router.query);

  return (
    <Layout title="Pancho's Villa">
      <div className="flex w-full flex-col-reverse pt-2">
        <div className="flex-none transition-all space-y-4">
          <Search />
          <AdHeader />
          <SectionContainer title="Categorías">
            <CardsSlider>
              {isLoadingCategories || errorCategories ? (
                <ListButtonsPlaceholder />
              ) : (
                categories!.map((category) => (
                  <SliderButton
                    onSelect={() =>
                      router.push(`/menu?category=${category.id}`)
                    }
                    key={category.id}
                    category={category}
                    selected={false}
                  />
                ))
              )}
            </CardsSlider>
          </SectionContainer>
          <SectionContainer title="Más populares">
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-5 gap-x-4 top-0 gap-y-6 ${
                isLoadingProducts ? "h-40" : ""
              }`}
            >
              {!isLoadingProducts &&
                !errorProducts &&
                (products! as Category).productsList.map((product) => (
                  <Link
                    scroll={false}
                    key={product.id}
                    href={`/?producto=${product.id}`}
                  >
                    <a>
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.name}
                        image={product.image}
                        price={parseFloat(product.price)}
                        onClick={() => {}}
                      />
                    </a>
                  </Link>
                ))}
            </div>
          </SectionContainer>
        </div>
      </div>
      <ProductModal
        show={!!router.query.producto}
        onClose={() => router.push("/", undefined, { scroll: false })}
      />
    </Layout>
  );
};

export default Home;

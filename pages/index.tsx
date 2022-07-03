import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "../components/layouts";
import { AdHeader } from "../components/ui";
import { SliderButton } from "../components/ui/Buttons";

import { Card, CardsSlider } from "../components/ui/Cards";
import { SectionContainer } from "../components/ui";
import ListButtonsPlaceholder from "../components/ui/ListButtonsPlaceholder";
import { Category } from "../interfaces";

import {
  useGetCategoriesListQuery,
  useGetCategoryProductsQuery,
} from "../services/auth";
import { SearchInput } from "../components/ui/Inputs";
import { Search } from "react-feather";

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

  return (
    <Layout title="Pancho's Villa">
      <div className="flex w-full flex-col-reverse pt-2">
        <div className="flex-none transition-all">
          <AdHeader />
          <div className="pt-4">
            <SearchInput error={false} label="Buscar" Icon={Search} />
          </div>
          <SectionContainer title="🔥 Categorías">
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
          <SectionContainer title="🔥 Populares">
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-x-4 top-0 gap-y-6 ${
                isLoadingProducts ? "h-40" : ""
              }`}
            >
              {!isLoadingProducts &&
                !errorProducts &&
                (products! as Category).productsList.map((product) => (
                  <Card
                    key={product.id}
                    id={product.id}
                    title={product.name}
                    image={product.image}
                    price={parseFloat(product.price)}
                  />
                ))}
            </div>
          </SectionContainer>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

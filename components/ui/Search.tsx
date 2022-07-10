import React, { memo, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Search as SearchIcon, X } from "react-feather";
import { useDebounce } from "../../hooks";
import { Product } from "../../interfaces";
import { useSearchProductMutation } from "../../services/api";
import { BarButton, ButtonIcon, TagButton } from "./Buttons";
import { Card } from "./Cards";
import { SearchInput } from "./Inputs";
import Loading from "./Loading";

const ProductsContainer = ({
  products,
}: {
  products: Product[] | undefined;
}) => {
  return (
    <div
      className={`pt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-5 gap-x-4 top-0 gap-y-4`}
    >
      {products &&
        products.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            title={product.name}
            image={product.image}
            price={parseFloat(product.price)}
          />
        ))}
    </div>
  );
};

export const Search = () => {
  const [keyword, setKeyword] = useState("");

  const [debouncedValue, isDebounceLoading] = useDebounce(keyword, 500);
  const [searchProduct, result] = useSearchProductMutation();

  const [page, setPage] = useState(0);

  useEffect(() => {
    searchProduct({ keyword: debouncedValue as string, skip: page });
  }, [debouncedValue, searchProduct, page]);

  const isLoading = result.isLoading || isDebounceLoading;
  const isEmpty =
    result.isSuccess && !isDebounceLoading && result.data.count === 0;
  const isNotEmpty = result.isSuccess && !isDebounceLoading;
  const showNextPageButton =
    result.isSuccess &&
    !isDebounceLoading &&
    result.data.count > 5 * (page + 1);
  const showPreviousPageButton =
    result.isSuccess && !isDebounceLoading && page > 0;

  const resultPaginationDescription = (count: number) => {
    if (count === 0) {
      return "";
    }

    if (count < 5) {
      return `Mostrando ${count} resultados`;
    }

    return `Mostrando ${page * 5 + 1} a 
    ${(page + 1) * 5 > count ? count : (page + 1) * 5}
    de ${result.data?.count} resultados`;
  };

  return (
    <>
      <div className="">
        <SearchInput
          // type={"search"}
          error={false}
          label="Buscar"
          Icon={keyword.length > 0 ? X : SearchIcon}
          onClick={() => {
            setKeyword("");
          }}
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPage(0);
          }}
        />
      </div>
      {keyword.length > 0 && (
        <div className="mt-4 p-4 rounded-3xl bg-shade animate-opacityin animate-bouncein transition-all">
          <div className="flex flex-col justify-between">
            <div className="flex items-center justify-between h-10">
              <h2 className="text-lg font-semibold pl-1">Resultados</h2>
              <div className="flex space-x-2">
                {showPreviousPageButton && (
                  <ButtonIcon
                    style
                    handleClick={() => setPage((prev) => prev - 1)}
                  >
                    <ArrowLeft />
                  </ButtonIcon>
                )}
                {showNextPageButton && (
                  <ButtonIcon
                    style
                    handleClick={() => setPage((prev) => prev + 1)}
                  >
                    <ArrowRight />
                  </ButtonIcon>
                )}
              </div>
            </div>
            <h2 className="px-1 text-sm h-6">
              {isNotEmpty && resultPaginationDescription(result.data.count)}
            </h2>
          </div>
          {isLoading && (
            <div className="h-44">
              <Loading />
            </div>
          )}
          {isEmpty && (
            <div className="h-40 flex items-center justify-center text-sm">
              No hay resultados
            </div>
          )}
          {isNotEmpty && (
            <>
              <ProductsContainer products={result.data.result} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Search;

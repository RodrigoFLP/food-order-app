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
      className={`pt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-8 gap-x-4 top-0 gap-y-4`}
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

const MemoizedProducts = React.memo(ProductsContainer);

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

  return (
    <>
      <div className="">
        <SearchInput
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
        <div className="mt-4 p-4 rounded-3xl bg-shade animate-opacityin animate-bouncein animate-heightin">
          <div className="flex items-center justify-between">
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
              <MemoizedProducts products={result.data.result} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Search;

import React, { memo, useEffect, useState } from "react";
import { Search as SearchIcon } from "react-feather";
import { useDebounce } from "../../hooks";
import { Product } from "../../interfaces";
import { useSearchProductMutation } from "../../services/api";
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
      className={`pt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-8 gap-x-4 top-0 gap-y-6`}
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

  useEffect(() => {
    searchProduct(debouncedValue as string);
  }, [debouncedValue, searchProduct]);

  return (
    <>
      <div className="pt-4">
        <SearchInput
          error={false}
          label="Buscar"
          Icon={SearchIcon}
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
      </div>
      {keyword.length > 0 && (
        <div className="mt-4 p-4 rounded-3xl bg-shade animate-opacityin animate-bouncein">
          <h2 className="text-lg font-semibold pl-1">Resultados</h2>
          {result.isUninitialized && <div className="h-40"></div>}
          {result.isLoading ||
            (isDebounceLoading && (
              <div className="h-44">
                <Loading />
              </div>
            ))}
          {result.isSuccess &&
            !isDebounceLoading &&
            result.data.length === 0 && (
              <div className="h-40 flex items-center justify-center">
                No hay resultados
              </div>
            )}
          {result.isSuccess && !isDebounceLoading && (
            <MemoizedProducts products={result.data} />
          )}
        </div>
      )}
    </>
  );
};

export default Search;

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Search as SearchIcon, X } from "react-feather";
import { useDebounce } from "../../hooks";
import { useSearchProductMutation } from "../../services/api";
import { ButtonIcon } from "../ui/Buttons";
import { SearchInput } from "../ui/Inputs";
import Loading from "../ui/Loading";
import ProductsContainer from "./SearchProductsContainer";

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
      <div>
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
        <div className="mt-4 p-4 rounded-xl bg-white animate-opacityin animate-bouncein transition-all">
          <div className="flex flex-col justify-between">
            <div className="flex items-center justify-between h-10">
              <h2 className="text-lg font-semibold pl-1">Resultados</h2>
              <div className="flex space-x-2">
                {showPreviousPageButton && (
                  <ButtonIcon style onClick={() => setPage((prev) => prev - 1)}>
                    <ArrowLeft />
                  </ButtonIcon>
                )}
                {showNextPageButton && (
                  <ButtonIcon style onClick={() => setPage((prev) => prev + 1)}>
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

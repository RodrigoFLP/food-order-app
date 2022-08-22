import Router from "next/router";
import { useGetCategoriesListQuery } from "../../services/api";
import { SectionContainer } from "../ui";
import { SliderButton } from "../ui/Buttons";
import Slider from "../ui/Containers/Slider";
import ListButtonsPlaceholder from "../ui/placeholders/ListButtonsPlaceholder";

export const CategoriesSlider = () => {
  const {
    data: categories,
    isError: errorCategories,
    isSuccess: isSuccessCategories,
    isUninitialized: isUninitializedCategories,
    isLoading: isLoadingCategories,
  } = useGetCategoriesListQuery();

  return (
    <SectionContainer title="Categorías">
      <Slider>
        {(isLoadingCategories || isUninitializedCategories) && (
          <ListButtonsPlaceholder />
        )}
        {isSuccessCategories &&
          categories.map((category) => (
            <SliderButton
              onSelect={() => Router.push(`/menu?category=${category.id}`)}
              key={category.id}
              category={category}
              selected={false}
            />
          ))}
      </Slider>
    </SectionContainer>
  );
};

export default CategoriesSlider;

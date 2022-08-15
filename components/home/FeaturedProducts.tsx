import Link from "next/link";
import { Tag } from "../../interfaces/tag";
import { useGetTagProductsQuery } from "../../services/api";
import ProductCard from "../product/ProductCard";
import { SectionContainer } from "../ui";

export const FeaturedProducts = ({
  defaultHomeTagCategory,
}: {
  defaultHomeTagCategory: Tag;
}) => {
  const {
    data: products,
    isError: errorProducts,
    isLoading: isLoadingProducts,
  } = useGetTagProductsQuery(defaultHomeTagCategory.id);

  return (
    <SectionContainer title={defaultHomeTagCategory.name}>
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-5 gap-x-4 top-0 gap-y-6 ${
          isLoadingProducts ? "h-40" : ""
        }`}
      >
        {!isLoadingProducts &&
          !errorProducts &&
          (products! as Tag).productsList.map((product) => (
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
  );
};

export default FeaturedProducts;

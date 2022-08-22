import Link from "next/link";
import { Product } from "../../interfaces";
import ProductCard from "../product/ProductCard";

export const SearchProductsContainer = ({
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
          <Link
            scroll={false}
            key={product.id}
            href={`/?producto=${product.id}`}
          >
            <a>
              <ProductCard
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
  );
};

export default SearchProductsContainer;

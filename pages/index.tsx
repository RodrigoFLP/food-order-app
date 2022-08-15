import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "../components/layouts";
import { AdHeader, Search } from "../components/ui";
import ProductModal from "../components/product/ProductModal";
import CategoriesSlider from "../components/home/CategoriesSlider";
import { FeaturedProducts } from "../components/home/FeaturedProducts";

import { Tag } from "../interfaces/tag";
import techposApi from "../api/techposApi";
import { Store } from "../interfaces";

interface HomeProps {
  defaultHomeTagCategory: Tag;
}

const Home: NextPage<HomeProps> = ({ defaultHomeTagCategory }) => {
  const router = useRouter();

  return (
    <Layout title="Pancho's Villa">
      <div className="flex w-full flex-col pt-2 space-y-4">
        <Search />
        <AdHeader />
        <CategoriesSlider />
        <FeaturedProducts defaultHomeTagCategory={defaultHomeTagCategory} />
      </div>
      {!!router.query.producto && (
        <ProductModal
          show={!!router.query.producto}
          onClose={() => router.push("/", undefined, { scroll: false })}
        />
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: store } = await techposApi.get<Store>("/stores/1");

  if (!store) {
    return { notFound: true };
  }

  return {
    props: {
      defaultHomeTagCategory: store.defaultHomeTagCategory,
    },
  };
};

export default Home;

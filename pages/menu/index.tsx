import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { CardsSlider, SliderButton, ListTile } from "../../components/ui";
import { products } from "../../data";
import { useCategories } from "../../hooks";
import { Category } from "../../interfaces";
import { useGetCategoriesListQuery, useGetCategoryProductsQuery } from "../../services/auth";

const productsList = products.products;

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    portions: string[];
    tags: string[];
    category: string;
    image: string;
}


const MenuPage: NextPage = () => {

    const router = useRouter()
    const [selectedCategory, setSelectedCategory] = useState<number>(parseInt(router.query.category! as string) || 0);
    // const [currentProducts, setCurrentProducts] = useState<Product[]>([]);


    const { data: categories, isError: errorCategories, isLoading: isLoadingCategories } = useGetCategoriesListQuery();
    const { data: products, isError: errorProducts, isLoading: isLoadingProducts } = useGetCategoryProductsQuery(selectedCategory);


    const onSelect = (category: any) => {
        setSelectedCategory(category);
    }

    console.log(selectedCategory, 'holaa')


    return (
        <Layout title="Menú">
            <CardsSlider >
                {!isLoadingCategories && categories!.map((category) =>
                    <SliderButton key={category.id}
                        selected={selectedCategory === category.id}
                        category={category}
                        onSelect={onSelect} />
                )
                }
            </CardsSlider>
            <div className="xs:flex md:grid md:grid-cols-3 flex-col pt-8 space-y-4 md:space-y-0 md:gap-4">
                {!isLoadingProducts && products !== undefined && (products! as Category).productsList.map((product) =>
                    <ListTile {...product} src={product.image} key={product.id} />)}
            </div>

        </Layout>
    );
}

export default MenuPage;
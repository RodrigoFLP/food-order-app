import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { CardsSlider, SliderButton, ListTile } from "../../components/ui";
import { categories, products } from "../../data";

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

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [currentProducts, setCurrentProducts] = useState<Product[]>([]);

    useEffect(() => {
        const filteredProds = productsList.filter((product) => product.category === selectedCategory);
        setCurrentProducts(filteredProds);

    }, [selectedCategory]);


    const onSelect = (category: string) => {
        setSelectedCategory(category);
    }


    return (
        <Layout title="Menú">
            <CardsSlider >
                {categories.map((category) =>
                    <SliderButton key={category}
                        selected={selectedCategory === category}
                        title={category}
                        onSelect={onSelect} />
                )
                }
            </CardsSlider>

            <div className="xs:flex md:grid md:grid-cols-3 flex-col pt-8 space-y-4 md:space-y-0 md:gap-4">
                {currentProducts.map((product) => <ListTile {...product} src={product.image} key={product.id} />)}
            </div>

        </Layout>
    );
}

export default MenuPage;
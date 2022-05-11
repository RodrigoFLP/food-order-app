import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Minus, Plus } from "react-feather";
import { ButtonIcon } from "../../../components/hoc";
import { Layout } from "../../../components/layouts";
import { BarButton, PortionsList, TagsList } from "../../../components/ui";
import { IProduct } from "../../../interfaces";

import { GetServerSideProps } from 'next'


interface TagGroupState {
    name: string,
    quantity: number,
    tags: TagState[],
}

interface TagState {
    name: string,
    quantity: number,
    price: number;
}

interface PortionState {
    name: string;
    price: number;
}

interface OrderState {
    productId: string,
    quantity: number,
    portion: PortionState,
    tagsGroups: TagGroupState[],
    price: number
}


const mockProduct = {
    "id": 125,
    "name": "Gloves - Goldtouch Disposable",
    "description": "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
    "portions": [
        {
            name: 'small',
            price: 2.99
        },
        {
            name: 'medium',
            price: 3.99
        },
        {
            name: 'big',
            price: 4.99
        },
    ],
    "tagsGroups": [
        {
            name: 'toppings',
            max: 2,
            min: 0,
            description: '',
            tags: [
                {
                    name: 'cheese',
                    price: 0.50,
                    maxQuantity: 2,
                    rate: 0,
                },
                {
                    name: 'beans',
                    price: 0.50,
                    maxQuantity: 2,
                    rate: 0,
                },
            ]
        },
        {
            name: 'complements',
            max: 4,
            min: 0,
            description: '',
            tags: [
                {
                    name: 'tortilla',
                    price: 0.20,
                    maxQuantity: 2,
                    rate: 0,
                },
                {
                    name: 'spicy sauce',
                    price: 0.40,
                    maxQuantity: 2,
                    rate: 0,
                }
            ]
        }
    ],
    "category": "Salidas",
    "image": "http://dummyimage.com/175x100.png/cc0000/ffffff"
}

interface Props {
    product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {


    const defaultTags = product.portions[0].tagGroups.map(tagGroup => ({
        name: tagGroup.name,
        quantity: 0,
        tags: [{
            name: '',
            value: '',
            quantity: 0,
            price: 0,
        }],
    }))

    const [order, setOrder] = useState<OrderState>(
        {
            productId: '',
            quantity: 1,
            portion: product.portions[0],
            tagsGroups: defaultTags,
            price: product.portions[0].price
        }
    );

    const calculateTotal = (portion: PortionState, tagsGroups: TagGroupState[], qty: number) => {
        const totalAmount = (portion.price +
            tagsGroups.reduce((previousGroup, currentGroup) =>
                previousGroup + currentGroup.tags.reduce((previousTag, currentTag) =>
                    (previousTag + (currentTag.quantity * currentTag.price)), 0), 0)) * qty;

        return totalAmount;
    }


    const handlePortionChange = (portion: any) => {

        return setOrder((prevOrder) => (
            {
                ...prevOrder,
                portion: portion,
                price: calculateTotal(portion, prevOrder.tagsGroups, prevOrder.quantity),
            }
        ));

    }

    const handleTagChange = (tag: any, name: string) => {

        console.log(tag, 'hola');

        setOrder((prevOrder) => {

            const newTagsGroups = [...prevOrder.tagsGroups.map(tagGroup => {
                if (tagGroup.name !== tag.name) {
                    return tagGroup;
                }
                return tag;
            })
            ]

            return {
                ...prevOrder,
                tagsGroups: newTagsGroups,
                price: calculateTotal(prevOrder.portion, newTagsGroups, prevOrder.quantity)
            }
        });

    }

    return (
        <Layout title={product.name} margin>

            <div className="flex flex-col items-center space-y-0 md:space-y-0 m-4 mt-2">

                <div className="w-full lg:w-3/5 xl:1/2">
                    <div className="relative overflow-hidden bg-primary p-8 h-vh space-y-4 pb-14 rounded-t-2xl">
                        <div className="block">
                            <Image src={'https://cdnimg.webstaurantstore.com/images/blogs/1804/gameday-header.jpg'}
                                alt={product.name}
                                layout="fill"
                                className="object-cover bg-gradient-to-l from-slate-50 z-0 opacity-10">
                            </Image>
                        </div>

                        <h1 className="font-extrabold text-2xl sm:text-3xl text-white z-10 relative">
                            {product.name}
                        </h1>

                        <p className="text-white">
                            {product.description}
                        </p>
                    </div>

                    <div className="w-full bg-white rounded-3xl relative -top-6">

                        <section className="md:w-4/5 space-y-4 p-6" >
                            <PortionsList
                                selectedPortion={order.portion.name}
                                portions={product.portions} handleChange={handlePortionChange} />
                        </section>

                        {product.portions[0].tagGroups.map((tagGroup, index) => (
                            <section key={tagGroup.name} className="md:w-4/5 space-y-4 p-6" >
                                <TagsList
                                    tagGroup={tagGroup}
                                    tagsInitialState={order.tagsGroups[index]}
                                    handleChange={handleTagChange}
                                />
                            </section>
                        ))}

                        {/* {mockProduct.tagsGroups.map((tagGroup, index) => (
                            <section key={tagGroup.name} className="md:w-4/5 space-y-4 p-6" >
                                <TagsList
                                    tagGroup={tagGroup}
                                    tagsInitialState={order.tagsGroups[index]}
                                    handleChange={handleTagChange}
                                />
                            </section>
                        ))} */}

                    </div>

                </div>
            </div>

            <div className="fixed bottom-0 bg-white border-t w-full h-20 flex justify-center items-center">
                <div className="w-full lg:w-3/5 xl:1/2 flex px-4 space-x-8">
                    <div className="flex flex-row space-x-4 items-center p-2 justify-between">
                        <ButtonIcon handleClick={() => order.quantity <= 1 ? '' : setOrder((prevOrder) => (
                            { ...prevOrder, quantity: prevOrder.quantity - 1, price: calculateTotal(prevOrder.portion, prevOrder.tagsGroups, prevOrder.quantity - 1) }
                        ))}>
                            <Minus />
                        </ButtonIcon>

                        <span className="font-bold text-sm">
                            {order.quantity}
                        </span>

                        <ButtonIcon
                            handleClick={() => setOrder((prevOrder) => (
                                { ...prevOrder, quantity: prevOrder.quantity + 1, price: calculateTotal(prevOrder.portion, prevOrder.tagsGroups, prevOrder.quantity + 1) }
                            ))}
                            style="bg-primary hover:bg-primary">
                            <Plus color="white" />
                        </ButtonIcon>

                    </div>
                    <BarButton>
                        <div className="flex flex-col sm:flex-row justify-between w-full text-sm sm:text-base">
                            <div>
                                Añadir
                            </div>
                            <div className="font-extrabold text-sm sm:text-base">
                                ${order.price.toFixed(2)}
                            </div>

                        </div>
                    </BarButton>
                </div>
            </div>

        </Layout >
    );
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { product } = params as { product: string }
    // console.log(JSON.stringify(params));

    // console.log(product)
    // fetch(`http://192.168.0.12:5000/products/${product}`).then(response => response.json())
    //     .then(data => { console.log(data); })



    const response = await fetch(`http://192.168.0.12:5000/products/${product}`);

    const data = await response.json()
    console.log(data);

    return {
        props: {
            product: data,

        }
    }
}


export default ProductPage;
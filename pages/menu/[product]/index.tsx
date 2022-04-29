import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingCart } from "react-feather";
import { ButtonIcon } from "../../../components/hoc";
import { Layout } from "../../../components/layouts";
import { BarButton, PortionsList, TagButton, TagsList } from "../../../components/ui";

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

const ProductPage: NextPage = () => {

    const { product } = useRouter().query;

    const defaultTags = mockProduct.tagsGroups.map(tagGroup => ({
        name: tagGroup.name,
        quantity: 0,
        tags: [{
            name: '',
            quantity: 0,
            price: 0,
        }],
    }))

    const [order, setOrder] = useState(
        {
            productId: '',
            quantity: 1,
            portion: mockProduct.portions[0],
            tagsGroups: defaultTags,
            price: 0
        }
    );

    const [total, setTotal] = useState(0);

    useEffect(() => {

        const totalAmount = (order.portion.price +
            order.tagsGroups.reduce((previousGroup, currentGroup) =>
                previousGroup + currentGroup.tags.reduce((previousTag, currentTag) =>
                    (previousTag + (currentTag.quantity * currentTag.price)), 0), 0)) * order.quantity;

        setTotal(totalAmount);

    }, [order])



    const handlePortionChange = (portion: any) => {

        return setOrder((prevOrder) => (
            {
                ...prevOrder,
                portion: portion,
                price: portion.price,
            }
        ));

    }

    const handleTagChange = (tag: any, name: string, max: number, min: number) => {

        return setOrder((prevOrder) => (
            {
                ...prevOrder,
                tagsGroups: [...prevOrder.tagsGroups.map(tagGroup => {
                    if (tagGroup.name !== name) {
                        return tagGroup;
                    }
                    switch (tagGroup.quantity) {
                        case 0:
                            return {
                                ...tagGroup,
                                name,
                                quantity: 1,
                                tags: [
                                    {
                                        name: tag.name,
                                        quantity: 1,
                                        price: tag.price,
                                        rate: tag.rate
                                    }
                                ]
                            };
                            break;

                        case max:
                            console.log('maximo')

                            const prevTagIndex = tagGroup.tags.findIndex(t => {
                                return t.name === tag.name
                            });
                            const tagExists = prevTagIndex !== -1;

                            return tagExists ?
                                {
                                    ...tagGroup,
                                    quantity: tagGroup.quantity - tagGroup.tags[prevTagIndex].quantity,
                                    tags: [
                                        ...tagGroup.tags.map((prevTag) => prevTag.name === tag.name ?
                                            {
                                                ...prevTag,
                                                quantity: 0
                                            } : prevTag
                                        )
                                    ]
                                } : tagGroup

                        default:
                            const tagExist = tagGroup.tags.findIndex(t => {
                                return t.name === tag.name
                            }) !== -1;

                            return tagExist ? {
                                ...tagGroup,
                                quantity: tagGroup.quantity + 1,
                                tags: [
                                    ...tagGroup.tags.map((prevTag) => prevTag.name === tag.name ?
                                        {
                                            ...prevTag,
                                            quantity: prevTag.quantity + 1
                                        } : prevTag
                                    )
                                ]
                            } :
                                {
                                    ...tagGroup,
                                    quantity: tagGroup.quantity + 1,
                                    tags: [
                                        ...tagGroup.tags,
                                        {
                                            name: tag.name,
                                            price: tag.price,
                                            quantity: 1,
                                        }
                                    ]
                                }



                    }
                })]
            }
        ));

    }


    return (
        <Layout title={product as string} margin={false}>

            <div className="flex flex-col items-center space-y-0 md:space-y-0 m-4 mt-2">

                <div className="w-full lg:w-3/5 xl:1/2">
                    <div className="relative overflow-hidden bg-primary p-8 h-vh space-y-4 pb-14 rounded-t-2xl">
                        <div className="block">
                            <Image src={'https://cdnimg.webstaurantstore.com/images/blogs/1804/gameday-header.jpg'}
                                alt={product as string}
                                layout="fill"
                                className="object-cover bg-gradient-to-l from-slate-50 z-0 opacity-10">
                            </Image>
                        </div>

                        <h1 className="font-extrabold text-2xl sm:text-3xl text-white z-10 relative">
                            {product}
                        </h1>

                        <p className="text-white">
                            Esta es la descripción del producto
                        </p>
                    </div>

                    <div className="w-full bg-white rounded-3xl relative -top-6">

                        <section className="md:w-4/5 space-y-4 p-6" >
                            <PortionsList
                                selectedPortion={order.portion.name}
                                portions={mockProduct.portions} handleChange={handlePortionChange} />
                        </section>

                        {mockProduct.tagsGroups.map((tagGroup) => (
                            <section key={tagGroup.name} className="md:w-4/5 space-y-4 p-6" >
                                <TagsList
                                    tagGroup={tagGroup}
                                    tagsState={order.tagsGroups.find(group => group.name === tagGroup.name)}
                                    handleChange={handleTagChange}
                                />
                            </section>
                        ))}

                    </div>

                </div>
            </div>

            <div className="fixed bottom-0 bg-white border-t w-full h-20 flex justify-center items-center">
                <div className="w-full lg:w-3/5 xl:1/2 flex px-4 space-x-8">
                    <div className="flex flex-row space-x-4 items-center p-2 justify-between">
                        <ButtonIcon handleClick={() => order.quantity <= 1 ? '' : setOrder((prevOrder) => (
                            { ...prevOrder, quantity: prevOrder.quantity - 1 }
                        ))}>
                            <Minus />
                        </ButtonIcon>

                        <span className="font-bold text-sm">
                            {order.quantity}
                        </span>

                        <ButtonIcon
                            handleClick={() => setOrder((prevOrder) => (
                                { ...prevOrder, quantity: prevOrder.quantity + 1 }
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
                                ${total.toFixed(2)}
                            </div>

                        </div>
                    </BarButton>
                </div>
            </div>

        </Layout >
    );
}



// export const getStaticProps: GetStaticProps = async (ctx) => {
//     const productsList = products;

//     return {
//         props: {

//         }
//     }
// }

export default ProductPage;
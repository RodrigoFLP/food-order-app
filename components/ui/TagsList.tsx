import { rawListeners } from "process";
import { FC, useCallback, useEffect, useState } from "react";

interface Tag {
    name: string,
    price?: number,
    maxQuantity?: number,
    rate?: number,
    quantity?: number,
    value: string,
}


interface TagGroup {
    name: string,
    max: number,
    min: number,
    description: string;
    tags: Tag[],
}

interface TagGroupState {
    name: string,
    quantity: number,
    tags: TagState[],
}

interface TagState {
    name: string,
    value: string,
    quantity: number,
    price: number;
}


interface Props {
    tagGroup: TagGroup;
    tagsInitialState: TagGroupState;
    handleChange: (tags: any, name: string) => void;

}



export const TagsList: FC<Props> = ({ tagGroup, handleChange, tagsInitialState }) => {


    const handleClick = (tag: Tag) => {

        let tagPayload = {};
        const prevTagIndex = tagsInitialState.tags.findIndex(t => {
            return t.value === tag.value
        });
        const tagExists = prevTagIndex !== -1;

        switch (tagsInitialState.quantity) {
            case 0:
                tagPayload =
                {
                    ...tagsInitialState,
                    quantity: 1,
                    tags: [
                        {
                            name: tag.name,
                            value: tag.value,
                            quantity: 1,
                            price: tag.price,
                            rate: tag.rate
                        }
                    ]
                }
                break;
            case tagGroup.max:
                console.log('maximo')

                tagPayload = tagExists ?
                    {
                        ...tagsInitialState,
                        quantity: tagsInitialState.quantity - tagsInitialState.tags[prevTagIndex].quantity,
                        tags: [
                            ...tagsInitialState.tags.map((prevTag) => prevTag.value === tag.value ?
                                {
                                    ...prevTag,
                                    quantity: 0
                                } : prevTag
                            )
                        ]
                    } : tagsInitialState

                break;
            default:
                tagPayload = tagExists ? {
                    ...tagsInitialState,
                    quantity: tagsInitialState.quantity + 1,
                    tags: [
                        ...tagsInitialState.tags.map((prevTag) => prevTag.value === tag.value ?
                            {
                                ...prevTag,
                                quantity: prevTag.quantity + 1
                            } : prevTag
                        )
                    ]
                } :
                    {
                        ...tagsInitialState,
                        quantity: tagsInitialState.quantity + 1,
                        tags: [
                            ...tagsInitialState.tags,
                            {
                                name: tag.name,
                                value: tag.value,
                                price: tag.price,
                                rate: tag.rate,
                                quantity: 1,
                            }
                        ]
                    }




        }

        handleChange(tagPayload, tagGroup.name);
    }

    return (
        <section className="space-y-4">

            <div className="flex items-center space-x-2">
                <h2 className="font-semibold text-xl">
                    {tagGroup.name}
                </h2>
                <div className="bg-secondary text-white rounded-lg text-sm font-bold px-2 py-1 ">
                    {tagsInitialState.quantity}/{tagGroup.max}
                </div>
            </div>
            <div className="text-sm">
                {tagGroup.description}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 justify-between text-sm">
                {tagGroup.tags.map((tag) => {


                    const tagIndex = tagsInitialState.tags.findIndex(t => t.value === tag.value)
                    const tagExists = tagIndex !== -1;
                    const tagQty = tagExists ? tagsInitialState.tags[tagIndex].quantity : 0;

                    return <button key={tag.value} className={`${tagExists && tagQty !== 0 ?
                        "bg-primary text-white" :
                        "bg-shade text-black"} 
                    p-2 px-4 rounded-3xl border border-dashed border-gray-300 hover:bg-secondary 
                    hover:text-white active:scale-95 active:bg-secondary shadow-md cursor-pointer`}
                        onClick={() => {
                            handleClick(tag)
                        }}>
                        <div className="font-semibold">{tagExists && tagsInitialState.tags.find(t => t.value === tag.value)?.quantity || 0} x ${tag.price?.toFixed(2)}</div> {tag.value}
                    </button>
                }
                )
                }
            </div>
        </section>
    )
}


export default TagsList;
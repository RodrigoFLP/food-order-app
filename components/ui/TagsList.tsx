import { FC, useState } from "react";

interface Tag {
    name: string,
    price?: number,
    maxQuantity?: number,
    rate?: number,
}


interface TagGroup {
    name: string,
    max: number,
    min: number,
    description: string;
    tags: Tag[],
}


interface Props {
    tagGroup: TagGroup;
    handleChange: (tags: any, name: string, max: number, min: number) => void;
    tagsState: any;

}


export const TagsList: FC<Props> = ({ tagGroup, handleChange, tagsState }) => {


    return (
        <section className="space-y-4">

            <div className="flex items-center space-x-2">
                <h2 className="font-semibold text-xl">
                    {tagGroup.name}
                </h2>
                <div className="bg-secondary text-white rounded-lg text-sm font-bold px-2 py-1 ">
                    {tagsState.quantity}/{tagGroup.max}
                </div>
            </div>
            <div className="text-sm">
                {tagGroup.description}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 justify-between text-sm">
                {tagGroup.tags.map((tag) => {


                    const tagIndex = tagsState.tags.findIndex(t => t.name === tag.name)
                    const tagExists = tagIndex !== -1;
                    const tagQty = tagExists ? tagsState.tags[tagIndex].quantity : 0;

                    return <button key={tag.name} className={`${tagExists && tagQty !== 0 ?
                        "bg-primary text-white" :
                        "bg-shade text-black"} 
                    p-2 px-4 rounded-3xl border border-dashed border-gray-300 hover:bg-secondary 
                    hover:text-white active:scale-95 active:bg-secondary shadow-md cursor-pointer`}
                        onClick={() => handleChange(tag, tagGroup.name, tagGroup.max, tagGroup.min)}>
                        <div className="font-semibold">{tagExists ? tagsState.tags.find(t => t.name === tag.name)?.quantity : 0} x ${tag.price?.toFixed(2)} </div> {tag.name}
                    </button>
                }
                )
                }
            </div>
        </section>
    )
}


export default TagsList;
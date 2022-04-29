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
}


export const TagsList: FC<Props> = ({ tagGroup }) => {

    const [selectedTags, setSelectedTags] = useState(
        {
            quantity: 0,
            tags: [
                {
                    name: '',
                    quantity: 0,
                }
            ]
        }
    );

    const handleClick = (tag: Tag) => {
        console.log('hola');

        switch (selectedTags.quantity) {
            case 0:
                setSelectedTags((prevState) => (
                    {
                        quantity: 1,
                        tags: [
                            {
                                name: tag.name,
                                quantity: 1,
                            }
                        ]
                    }
                ));
                break;
            case tagGroup.max:
                console.log('maximo')
                setSelectedTags((prevState) => {
                    const prevTagIndex = prevState.tags.findIndex(t => {
                        return t.name === tag.name
                    });
                    console.log(prevTagIndex)
                    return prevTagIndex !== -1 ?
                        {
                            quantity: prevState.quantity - prevState.tags[prevTagIndex].quantity,
                            tags: [
                                ...prevState.tags.map((prevTag) => prevTag.name === tag.name ?
                                    {
                                        ...prevTag,
                                        quantity: 0
                                    } : prevTag
                                )
                            ]
                        } : prevState
                });
                break;
            default:
                setSelectedTags((prevState) => {
                    const prevTagIndex = prevState.tags.findIndex(t => {
                        return t.name === tag.name
                    });
                    return prevTagIndex !== -1 ? {
                        quantity: prevState.quantity + 1,
                        tags: [
                            ...prevState.tags.map((prevTag) => prevTag.name === tag.name ?
                                {
                                    ...prevTag,
                                    quantity: prevTag.quantity + 1
                                } : prevTag
                            )
                        ]
                    } :
                        {
                            quantity: prevState.quantity + 1,
                            tags: [
                                ...prevState.tags,
                                {
                                    name: tag.name,
                                    quantity: 1,
                                }
                            ]
                        }

                }
                );

        }
    }

    return (
        <section className="space-y-4">

            <div className="flex items-center space-x-2">
                <h2 className="font-semibold text-xl">
                    {tagGroup.name}
                </h2>
                <div className="bg-secondary text-white rounded-lg text-sm font-bold px-2 py-1 ">
                    {selectedTags.quantity}/{tagGroup.max}
                </div>
            </div>
            <div className="text-sm">
                {tagGroup.description}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 justify-between text-sm">
                {tagGroup.tags.map((tag) => {


                    const tagIndex = selectedTags.tags.findIndex(t => t.name === tag.name)
                    const tagExists = tagIndex !== -1;
                    const tagQty = tagExists ? selectedTags.tags[tagIndex].quantity : 0;

                    return <button key={tag.name} className={`${tagExists && tagQty !== 0 ?
                        "bg-primary text-white" :
                        "bg-shade text-black"} 
                    p-2 px-4 rounded-3xl border border-dashed border-gray-300 hover:bg-secondary 
                    hover:text-white active:scale-95 active:bg-secondary shadow-md cursor-pointer`}
                        onClick={() => handleClick(tag)}>
                        <div className="font-semibold">{tagExists && selectedTags.tags.find(t => t.name === tag.name)?.quantity}</div> {tag.name}
                    </button>
                }
                )
                }
            </div>
        </section>
    )
}


export default TagsList;
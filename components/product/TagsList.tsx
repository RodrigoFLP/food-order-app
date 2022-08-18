import { FC } from "react";
import { Minus, Plus } from "tabler-icons-react";
import { useTagList } from "../../hooks";
import { TagGroup, TagGroupState } from "../../interfaces";
import initialToUpperCase from "../../utils/initialToUpperCase";

interface Props {
  tagGroup: TagGroup;
  tagsInitialState: TagGroupState;
  handleChange: (tags: any, name: string) => void;
}

export const TagsList: FC<Props> = ({
  tagGroup,
  handleChange,
  tagsInitialState,
}) => {
  const { handleAdd, handleRemove, handleClick } = useTagList(
    tagGroup,
    handleChange,
    tagsInitialState
  );

  return (
    <section className="space-y-4">
      <div className="flex items-center space-x-2">
        <h2 className="font-semibold text-lg">
          {initialToUpperCase(tagGroup.name)}
        </h2>
        <div className="bg-primary text-white rounded-lg text-sm font-bold px-2 py-1 ">
          {tagsInitialState.quantity}/{tagGroup.max}
        </div>
      </div>
      <div className="text-sm">{tagGroup.description}</div>
      <div className="flex flex-wrap gap-2 justify-between text-sm">
        {tagGroup.tags.map((tag) => {
          const tagIndex = tagsInitialState.tags.findIndex(
            (t) => t.value === tag.value
          );
          const tagExists = tagIndex !== -1;
          const tagQty = tagExists
            ? tagsInitialState.tags[tagIndex].quantity
            : 0;

          return tagGroup.max > 1 ? (
            <div
              key={tag.value}
              className={`${
                tagExists && tagQty !== 0
                  ? "bg-secondary text-white"
                  : "bg-shade text-black"
              } 
                    p-2 px-4 rounded-xl border border-dashed border-gray-300  
                      shadow-sm flex space-x-2 items-center select-none`}
            >
              <div
                className="bg-white w-6 h-6 rounded-full flex justify-center items-center cursor-pointer hover:scale-95"
                onClick={() => handleRemove(tag)}
              >
                <Minus size={16} color="black" />
              </div>
              <div>
                <div>{initialToUpperCase(tag.value)}</div>
                <div className="font-semibold">
                  {(tagExists &&
                    tagsInitialState.tags.find((t) => t.value === tag.value)
                      ?.quantity) ||
                    0}{" "}
                  x ${tag.price?.toFixed(2)}
                </div>
              </div>
              <div
                className="bg-primary w-6 h-6 rounded-full flex justify-center items-center cursor-pointer hover:scale-95"
                onClick={() => handleAdd(tag)}
              >
                <Plus size={16} color="white" />
              </div>
            </div>
          ) : (
            <button
              key={tag.value}
              className={`${
                tagExists && tagQty !== 0
                  ? "bg-primary text-white"
                  : "bg-shade text-black"
              } 
                p-2 px-4 rounded-xl flex-grow border border-dashed border-gray-300 hover:bg-secondary 
                hover:text-white active:scale-95 active:bg-secondary shadow-sm cursor-pointer`}
              onClick={() => {
                handleClick(tag);
              }}
            >
              {initialToUpperCase(tag.value)}
              <div className="font-semibold">${tag.price?.toFixed(2)}</div>{" "}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default TagsList;

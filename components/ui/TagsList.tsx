import { FC } from "react";
import { useTagList } from "../../hooks";
import { TagGroup, TagGroupState } from "../../interfaces";

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
  const [handleClick] = useTagList(tagGroup, handleChange, tagsInitialState);

  return (
    <section className="space-y-4">
      <div className="flex items-center space-x-2">
        <h2 className="font-semibold text-xl">{tagGroup.name}</h2>
        <div className="bg-secondary text-white rounded-lg text-sm font-bold px-2 py-1 ">
          {tagsInitialState.quantity}/{tagGroup.max}
        </div>
      </div>
      <div className="text-sm">{tagGroup.description}</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 justify-between text-sm">
        {tagGroup.tags.map((tag) => {
          const tagIndex = tagsInitialState.tags.findIndex(
            (t) => t.value === tag.value
          );
          const tagExists = tagIndex !== -1;
          const tagQty = tagExists
            ? tagsInitialState.tags[tagIndex].quantity
            : 0;

          return (
            <button
              key={tag.value}
              className={`${
                tagExists && tagQty !== 0
                  ? "bg-primary text-white"
                  : "bg-shade text-black"
              } 
                    p-2 px-4 rounded-3xl border border-dashed border-gray-300 hover:bg-secondary 
                    hover:text-white active:scale-95 active:bg-secondary shadow-md cursor-pointer`}
              onClick={() => {
                handleClick(tag);
              }}
            >
              <div className="font-semibold">
                {(tagExists &&
                  tagsInitialState.tags.find((t) => t.value === tag.value)
                    ?.quantity) ||
                  0}{" "}
                x ${tag.price?.toFixed(2)}
              </div>{" "}
              {tag.value}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default TagsList;

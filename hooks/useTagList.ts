import { Tag, TagGroup, TagGroupState } from "../interfaces";

export const useTagList = (
  tagGroup: TagGroup,
  handleChange: (tags: any, name: string) => void,
  tagsInitialState: TagGroupState
) => {
  const handleClick = (tag: Tag) => {
    let tagPayload = {};
    const prevTagIndex = tagsInitialState.tags.findIndex((t) => {
      return t.value === tag.value;
    });
    const tagExists = prevTagIndex !== -1;

    switch (tagsInitialState.quantity) {
      case 0:
        tagPayload = {
          ...tagsInitialState,
          quantity: 1,
          tags: [
            {
              id: tag.id,
              name: tag.name,
              value: tag.value,
              quantity: 1,
              price: tag.price,
              rate: tag.rate,
            },
          ],
        };
        break;
      case tagGroup.max:
        console.log("maximo");

        tagPayload = tagExists
          ? {
              ...tagsInitialState,
              quantity:
                tagsInitialState.quantity -
                tagsInitialState.tags[prevTagIndex].quantity,
              tags: [
                ...tagsInitialState.tags.map((prevTag) =>
                  prevTag.value === tag.value
                    ? {
                        ...prevTag,
                        quantity: 0,
                      }
                    : prevTag
                ),
              ],
            }
          : tagsInitialState;

        break;
      default:
        tagPayload = tagExists
          ? {
              ...tagsInitialState,
              quantity: tagsInitialState.quantity + 1,
              tags: [
                ...tagsInitialState.tags.map((prevTag) =>
                  prevTag.value === tag.value
                    ? {
                        ...prevTag,
                        quantity: prevTag.quantity + 1,
                      }
                    : prevTag
                ),
              ],
            }
          : {
              ...tagsInitialState,
              quantity: tagsInitialState.quantity + 1,
              tags: [
                ...tagsInitialState.tags,
                {
                  id: tag.id,
                  name: tag.name,
                  value: tag.value,
                  price: tag.price,
                  rate: tag.rate,
                  quantity: 1,
                },
              ],
            };
    }

    handleChange(tagPayload, tagGroup.name);
  };

  return [handleClick];
};

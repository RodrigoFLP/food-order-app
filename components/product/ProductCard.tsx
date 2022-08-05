import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { ArrowDown, Coffee } from "react-feather";

interface Props {
  id: number;
  title: string;
  price: number;
  image: string;
  onClick: () => void;
}

export const ProductCard: FC<Props> = ({
  title,
  image,
  price,
  id,
  onClick,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/menu/${id}`);
  };

  return (
    <div
      className="h-40 shadow-shade border rounded-xl bg-white cursor-pointer
        whitespace-nowrap overflow-hidden flex flex-col items-left p-0 space-y-1
        hover:scale-95 transition hover:shadow-gray-100 active:bg-shade
        "
      onClick={onClick}
    >
      <div className="h-3/5 relative w-full overflow-hidden rounded-b-md">
        {image && (
          <Image
            src={image}
            layout="fill"
            alt={title}
            className="object-cover"
          />
        )}
        {/* <div className="bg-shade bg-gradient-to-br from-gray-200 to-shade w-full h-full flex items-center justify-center">
          <Coffee size={50} color="gray" />
        </div> */}
      </div>
      <div className="h-2/5 text-left px-4 pt-1">
        <span className="text-sm font-bold">{title}</span>
        <div className="font-medium text-sm">${price}</div>
      </div>
    </div>
  );
};

export default ProductCard;

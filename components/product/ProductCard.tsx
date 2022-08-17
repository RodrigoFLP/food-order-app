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
      <div className="h-3/5 relative w-full overflow-hidden rounded-b-md bg-gray-100 flex text-center justify-center">
        {image && (
          <Image
            src={image}
            layout="fill"
            alt={title}
            className="object-cover"
          />
        )}
        <Image
          src="/card-placeholder.svg"
          height="100px"
          width="60%"
          alt="placeholder"
          className="opacity-5 text-center"
        />
      </div>
      <div className="h-2/5 text-left px-4 pt-1">
        <span className="text-sm font-bold">{title}</span>
        <div className="font-medium text-sm">${price}</div>
      </div>
    </div>
  );
};

export default ProductCard;

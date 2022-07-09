import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { ArrowDown, Coffee } from "react-feather";

interface Props {
  id: number;
  title: string;
  price: number;
  image: string;
}

export const Card: FC<Props> = ({ title, image, price, id }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/menu/${id}`);
  };

  return (
    <button
      className="h-40 border shadow-shade rounded-2xl bg-white
        whitespace-nowrap overflow-hidden flex flex-col items-left p-2 space-y-1
        hover:scale-95 transition hover:shadow-gray-100 shadow-md active:bg-shade
        "
      onClick={handleClick}
    >
      <div className="h-3/5 relative w-full rounded-xl overflow-hidden">
        {/* <Image src={image} layout="fill" alt={title} className="object-cover" /> */}
        <div className="bg-shade bg-gradient-to-br from-gray-200 to-shade w-full h-full flex items-center justify-center">
          <Coffee size={50} color="gray" />
        </div>
      </div>
      <div className="h-2/5 font-medium text-left p-1">
        <span className="text-sm">{title}</span>
        <div className="font-bold">
          <span className="text-regular">$</span>
          {price}
        </div>
      </div>
    </button>
  );
};

export default Card;

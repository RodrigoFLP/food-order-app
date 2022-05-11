import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";


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
    }

    return (
        <button className="h-40 border shadow-shade rounded-3xl bg-white
        whitespace-nowrap overflow-hidden flex flex-col items-center space-y-2
        hover:scale-95 transition hover:shadow-gray-100 shadow-sm active:bg-shade
        animate-opacityin" onClick={handleClick}>
            <div className="h-3/5 relative w-full rounded-b-2xl overflow-hidden">
                <Image src={image}
                    layout='fill'
                    alt={title}
                    className="object-cover" />
            </div>
            <div className="font-semibold h-2/5">
                <span className="text-sm">
                    {title}
                </span>
                <div className="font-extrabold">
                    <span className="text-sm text-primary">$</span>{price}
                </div>
            </div>
        </button>
    )
}

export default Card;
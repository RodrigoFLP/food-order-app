import Image from "next/image";
import { FC } from "react";


interface Props {
    title: string;
}

export const Card: FC<Props> = ({ title }) => {

    return (
        <button className="h-40 border shadow-shade rounded-3xl bg-white
        whitespace-nowrap overflow-hidden flex flex-col items-center space-y-2
        hover:scale-95 transition hover:shadow-gray-100 shadow-md active:bg-shade">
            <div className="h-3/5 relative w-full rounded-b-xl overflow-hidden">
                <Image src='https://cdnimg.webstaurantstore.com/images/blogs/1804/gameday-header.jpg'
                    layout='fill'
                    alt={title}
                    className="object-cover" />
            </div>
            <div className="font-semibold h-2/5">
                <span className="text-sm">
                    {title}
                </span>
                <div className="font-extrabold">
                    <span className="text-sm text-primary">$</span>4.99
                </div>
            </div>
        </button>
    )
}

export default Card;
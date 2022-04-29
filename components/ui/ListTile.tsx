import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
    title: string;
    description: string;
    src: string;
    price: number;
}

export const ListTile: FC<Props> = ({ title, description, src, price }) => {

    return (
        <Link href={`/menu/${title}`} passHref>
            <div className="w-full h-28 flex rounded-2xl border bg-white
            overflow-hidden space-x-4 cursor-pointer hover:scale-95 active:bg-shade transition-all
            shadow-md shadow-shade">
                <div id="image" className="w-28 bg-slate-50 rounded-r-2xl relative overflow-hidden">
                    <Image src={src}
                        layout='fill'
                        alt={title}
                        className="object-cover" />
                </div>
                <div className="flex flex-col justify-center pr-2 py-2 flex-1">
                    <div className="font-semibold flex-1">
                        {title}
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">
                        {description}
                    </p>
                    <div className="pt-1 flex flex-row items-center justify-between">
                        <div className="font-extrabold">
                            <span className="text-sm text-primary">
                                $
                            </span>
                            {price.toFixed(2)}
                        </div>
                        <div className="text-xs bg-primary py-1 px-2 right-0 
                        rounded-full text-white font-semibold scale-95">
                            Promoción
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ListTile;
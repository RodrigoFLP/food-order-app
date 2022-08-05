import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { IProduct } from "../../interfaces";

type Props = IProduct;

export const ListTile: FC<Props> = ({ id, name, description, src, price }) => {
  return (
    <div
      className="w-full h-28 flex rounded-xl border bg-white shadow-shade animate-opacityin
            overflow-hidden space-x-4 cursor-pointer hover:scale-95 active:bg-shade transition-all
             "
    >
      <div
        id="image"
        className="w-28 bg-slate-50 rounded-r-lg relative overflow-hidden"
      >
        {src && (
          <Image src={src} layout="fill" alt={name} className="object-cover" />
        )}
      </div>
      <div className="flex flex-col justify-around center pr-2 flex-1 py-2">
        <div className="font-semibold flex-none text-base">{name}</div>
        <p className="text-gray-600 text-sm line-clamp-2 leading-none ">
          {description}
        </p>
        <div className="pt-1 flex flex-row items-center justify-between">
          <div className="font-extrabold text-sm">
            ${parseFloat(price).toFixed(2)}
          </div>
          {/* <div
            className="text-xs bg-primary py-1 px-2 right-0 
                        rounded-full text-white font-semibold scale-95"
          >
            Promoción
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ListTile;

import Image from "next/image";

export const AdHeader = () => {

    return (
        <div className="w-full bg-shade h-40 md:h-52 rounded-3xl cursor-pointer relative overflow-hidden">
            <Image src='https://cdnimg.webstaurantstore.com/images/blogs/1804/gameday-header.jpg'
                alt="header"
                layout='fill'
                className="object-cover" />
        </div>
    );
}

export default AdHeader;
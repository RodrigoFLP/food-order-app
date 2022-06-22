import Image from "next/image";
import styles from "../Placeholder.module.css";

export const AdHeader = () => {
  return (
    <div
      className={`${styles.phgradient} w-full shadow-sm h-48 md:h-64 rounded-3xl cursor-pointer relative overflow-hidden bg-white`}
    >
      <Image
        src="https://cdnimg.webstaurantstore.com/images/blogs/1804/gameday-header.jpg"
        alt="header"
        layout="fill"
        className="object-cover"
      />
    </div>
  );
};

export default AdHeader;

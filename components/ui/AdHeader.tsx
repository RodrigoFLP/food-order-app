import Image from "next/image";
import styles from "../Placeholder.module.css";

export const AdHeader = () => {
  return (
    <div
      className={`${styles.phgradient} w-full shadow-sm h-48 md:h-64 rounded-3xl cursor-pointer relative overflow-hidden bg-white`}
    >
      <Image
        src="https://res.cloudinary.com/cloudinary-marketing/images/w_2000,h_1100/f_auto,q_auto/v1647045702/38_stock_photo_site/38_stock_photo_site-jpg?_i=AA"
        priority
        alt="header"
        layout="fill"
        className="object-cover"
      />
    </div>
  );
};

export default AdHeader;

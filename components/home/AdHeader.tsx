import Image from "next/image";
import { useGetOneStoreQuery } from "../../services/api";
import styles from "../Placeholder.module.css";
import Loading from "../ui/Loading";

export const AdHeader = () => {
  const {
    data: store,
    isLoading,
    isUninitialized,
    isError,
    isSuccess,
  } = useGetOneStoreQuery();

  return (
    <div
      className={`${
        isLoading || (isUninitialized && styles.phgradient)
      } w-full shadow-sm aspect-[1290/490] sm:aspect-[1290/350] rounded-2xl cursor-pointer relative overflow-hidden bg-white`}
    >
      {isSuccess && store.headerImage && (
        <Image
          src={store.headerImage}
          // src="/header.jpeg"
          priority
          alt="header"
          layout="fill"
          className="object-cover"
        />
      )}

      {/* {isSuccess && store.headerImage && (
        <img
          src="/header.jpeg"
          alt="header"
          className="object-cover text-center w-full"
        />
      )} */}
    </div>
  );
};

export default AdHeader;

import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { ArrowLeft } from "react-feather";
import { IProduct } from "../../interfaces";
import { ButtonIcon } from "../ui/Buttons";
import Loading from "../ui/Loading";
import ModalContainer from "../ui/Modals/ModalContainer";
import RightModal from "../ui/Modals/RightModal";
import Product from "./Product";

interface Props {
  show: boolean;
  onClose: () => void;
}

export const ProductModal: FC<Props> = ({ show, onClose }) => {
  const router = useRouter();

  const [product, setProduct] = useState<IProduct | null>(null);

  const [closing, setClosing] = useState(false);

  const [isTransitionDone, setIsTransitionDone] = useState(false);

  const fetchProduct = async () => {
    if (router.query.producto) {
      const data = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${router.query.producto}`
        )
      ).json();

      setProduct(data);
    }
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 100);
  };

  useEffect(() => {
    setClosing(false);
    setProduct(null);
    setTimeout(() => setIsTransitionDone(true), 1000);
    setIsTransitionDone(false);
    fetchProduct();
  }, [router.query.producto]);

  return show ? (
    <ModalContainer>
      <div
        className={`bg-white w-full sm:w-8/12 md:w-6/12 lg:w-4/12 right-0 ${
          closing ? "animate-opacityout" : "animate-slideinright"
        }
      h-screen fixed top-0 z-40 overflow-y-scroll`}
      >
        {!product && <Loading />}
        {product && <Product product={product} onAdd={handleClose} />}
        <div className="z-50 top-0 absolute m-4">
          <ButtonIcon onClick={handleClose}>
            <ArrowLeft />
          </ButtonIcon>
        </div>
      </div>

      <div
        onClick={handleClose}
        className={`z-30 bg-black w-full h-screen fixed 
                    top-0 left-0 bg-opacity-70 ${
                      closing ? "animate-opacityout" : "animate-opacityin"
                    } cursor-pointer`}
      ></div>
    </ModalContainer>
  ) : null;
};

export default ProductModal;

import { ShoppingCart } from "react-feather";
import Link from "next/link";
import { useAppSelector } from "../../store/hooks";
import { selectItemsCount } from "../../store";
import { useEffect, useState } from "react";
import { ProfileButton, ButtonIcon } from "../ui/Buttons";
import Image from "next/image";

export const Navbar = () => {
  const itemsCount = useAppSelector(selectItemsCount);

  const [showCartCount, setShowCartCount] = useState(false);

  useEffect(() => {
    setShowCartCount(true);
  }, []);

  return (
    <nav
      className={` z-30 w-full lg:flex items-center transition-all justify-center 
        `}
    >
      <div className="w-full max-w-5xl">
        <ul
          className="flex justify-between items-center
            px-6 h-16"
        >
          <Link href="/" passHref>
            {/* <span className="font-bold text-lg cursor-pointer">
              Pancho&apos;s Villa
            </span> */}
            <Image
              className="cursor-pointer"
              src="/logo.svg"
              width="146.25px"
              height="23.25px"
              alt="Panchos Villa logo"
            />
          </Link>
          <div className="flex space-x-2">
            <li>
              <ProfileButton />
            </li>
            <Link href="/cart" passHref prefetch={false}>
              <li className="relative">
                <ButtonIcon>
                  <ShoppingCart />
                  <div
                    className="absolute -top-2 -right-2 
                                bg-primary rounded-full h-5 w-5
                                text-white flex justify-center items-center
                                text-xs font-semibold"
                  >
                    {showCartCount && itemsCount}
                  </div>
                </ButtonIcon>
              </li>
            </Link>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

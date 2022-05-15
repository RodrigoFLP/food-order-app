import { ButtonIcon } from "../ui";
import { User, ShoppingCart } from 'react-feather';
import Link from "next/link";
import { useOnScroll } from "../../hooks";
import { useAppSelector } from "../../store/hooks";
import { selectItemsCount } from "../../store";


export const Navbar = () => {

    const { showFixed } = useOnScroll();

    const itemsCount = useAppSelector(selectItemsCount)

    return (
        <nav className={`sticky z-30 w-full ${showFixed && 'bg-slate-50 shadow-sm '} top-0`}>
            <ul className="flex justify-between items-center
            px-8 h-16 ">
                <Link href="/" passHref>
                    <span className="font-bold text-lg cursor-pointer">
                        Panchos Villa
                    </span>
                </Link>
                <div className="flex space-x-2">
                    <Link href='/login' passHref>
                        <li>
                            <ButtonIcon>
                                <User />
                            </ButtonIcon>
                        </li>
                    </Link>
                    <Link href='/cart' passHref>
                        <li className="relative">
                            <ButtonIcon>
                                <ShoppingCart />
                                <div className="absolute -top-2 -right-2 
                                bg-primary rounded-full h-5 w-5
                                text-white flex justify-center items-center
                                text-xs font-semibold">
                                    {itemsCount}
                                </div>
                            </ButtonIcon>

                        </li>
                    </Link>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;
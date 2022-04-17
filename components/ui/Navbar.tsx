import { ButtonIcon } from "../ui";
import { User, ShoppingCart } from 'react-feather';
import Link from "next/link";


export const Navbar = () => {

    return (
        <nav>
            <ul className="flex justify-between items-center
            px-6 h-16">
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
                                    1
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
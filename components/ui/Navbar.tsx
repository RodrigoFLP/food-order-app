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
                    <Link href='/user'>
                        <li>
                            <ButtonIcon>
                                <User />
                            </ButtonIcon>
                        </li>
                    </Link>
                    <Link href='/cart'>
                        <li>
                            <ButtonIcon>
                                <ShoppingCart />
                            </ButtonIcon>
                        </li>
                    </Link>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;
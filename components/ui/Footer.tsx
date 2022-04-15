import { FC } from "react";
import ButtonIcon from "./ButtonIcon";
import { Facebook, Instagram } from "react-feather"


export const Footer: FC = () => {

    return (
        <footer className="h-20">

            <ul className="flex justify-center space-x-4 items-center h-full">
                <ButtonIcon>
                    <Facebook />
                </ButtonIcon>
                <ButtonIcon>
                    <Instagram />
                </ButtonIcon>
            </ul>
            <div className="text-center pb-6 text-xs">
                © 2022 Powered by TechPOS
            </div>

        </footer>
    );
}

export default Footer;
import { FC } from "react";
import { ButtonIcon } from "./Buttons";
import { Facebook, Instagram } from "react-feather";

interface Props {
  margin: boolean;
}

export const Footer: FC<Props> = ({ margin = false }) => {
  return (
    <footer className={`h-20 ${margin ? "mb-32" : ""}`}>
      <ul className="flex justify-center space-x-4 items-center h-full">
        <ButtonIcon>
          <Facebook />
        </ButtonIcon>
        <ButtonIcon>
          <Instagram />
        </ButtonIcon>
      </ul>
      <div className="text-center pb-6 text-xs">© 2022 Powered by TechPOS</div>
    </footer>
  );
};

export default Footer;

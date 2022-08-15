import { FC } from "react";
import { ButtonIcon } from "../ui/Buttons";
import { Facebook, Instagram, Phone } from "react-feather";
import { Store } from "../../interfaces";

import { BrandWhatsapp } from "tabler-icons-react";

interface Props {
  margin: boolean;
  store: Store;
}

export const Footer: FC<Props> = ({ margin = false, store }) => {
  return (
    <footer className={`h-20  w-full ${margin ? "mb-32" : ""}`}>
      <ul className="flex justify-center space-x-4 items-center h-full">
        {store.facebook && (
          <a href={store.facebook}>
            <ButtonIcon>
              <Facebook />
            </ButtonIcon>
          </a>
        )}
        {store.instagram && (
          <a href={store.instagram}>
            <ButtonIcon>
              <Instagram />
            </ButtonIcon>
          </a>
        )}
        {store.whatsappNumber && (
          <a
            href={`https://api.whatsapp.com/send?phone=+503${store.whatsappNumber}`}
          >
            <ButtonIcon>
              <BrandWhatsapp />
            </ButtonIcon>
          </a>
        )}
        {store.phoneNumber && (
          <a href={`tel:${store.phoneNumber}`}>
            <ButtonIcon>
              <Phone />
            </ButtonIcon>
          </a>
        )}
      </ul>
      {/* <div className="text-center mb-6 text-xs">© 2022 Pancho&apos;s Villa</div> */}
    </footer>
  );
};

export default Footer;

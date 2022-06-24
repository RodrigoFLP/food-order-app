import { FC, useState } from "react";
import { Edit } from "react-feather";
import { Address } from "../../../interfaces";
import { AddressModal } from "../Modals/AddressModal";

interface Props {
  address: Address;
}

export const AddressCard: FC<Props> = ({ address }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClick = () => {
    setShowModal(true);
  };
  return (
    <>
      <div
        className="group bg-white text-black border rounded-xl shadow-sm p-4 flex justify-between
     transition-all cursor-pointer hover:bg-shade active:scale-95"
        onClick={handleClick}
      >
        <div>
          <h2 className="font-semibold">Dirección {address.id}</h2>
          <div>
            {address.state}, {address.city}
          </div>
          <div>{address.addressLine1}</div>
          <div>{address.addressLine2}</div>
          <div>{address.addressReference}</div>
        </div>
        <Edit className="group-hover:text-blue-400" />
      </div>
      <AddressModal
        show={showModal}
        handleClose={handleCloseModal}
        address={address}
      />
    </>
  );
};

export default AddressCard;

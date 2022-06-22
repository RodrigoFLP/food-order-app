import { FC, useState } from "react";
import { Edit } from "react-feather";
import { Address } from "../../../interfaces";
import { AddressModal } from "../Modals/AddressModal";

export const AddressCard: FC<Address> = ({
  id,
  state,
  city,
  addressLine1,
  addressLine2,
  addressReference,
}) => {
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
          <h2 className="font-semibold">Dirección {id}</h2>
          <div>
            {state}, {city}
          </div>
          <div>{addressLine1}</div>
          <div>{addressLine2}</div>
          <div>{addressReference}</div>
        </div>
        <Edit className="group-hover:text-blue-400" />
      </div>
      <AddressModal show={showModal} handleClose={handleCloseModal} />
    </>
  );
};

export default AddressCard;

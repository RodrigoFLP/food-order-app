import { FC } from "react";
import { Edit } from "react-feather";
import { Address } from "../../interfaces";

export const AddressCard: FC<Address> = ({
  id,
  state,
  city,
  addressLine1,
  addressLine2,
  addressReference,
}) => {
  return (
    <div className="bg-white text-black border rounded-xl shadow-sm p-4 flex justify-between">
      <div>
        <h2 className="font-semibold">Dirección {id}</h2>
        <div>
          {state}, {city}
        </div>
        <div>{addressLine1}</div>
        <div>{addressLine2}</div>
        <div>{addressReference}</div>
      </div>
      <Edit />
    </div>
  );
};

export default AddressCard;

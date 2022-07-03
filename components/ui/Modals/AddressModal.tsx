import { FC, useState } from "react";

import ModalContainer from "./ModalContainer";

import "leaflet/dist/leaflet.css";
import { toast, ToastContainer } from "react-toastify";
import { AddressForm } from "../Forms/AddressForm";
import { Address, Coordinate } from "../../../interfaces";
import MapForm from "../Forms/MapForm";
import { ArrowLeft } from "react-feather";

import "react-toastify/dist/ReactToastify.css";

interface Props {
  address: Address;
  show: boolean;
  handleClose: () => void;
}

export const AddressModal: FC<Props> = ({
  show = false,
  handleClose,
  address,
}) => {
  console.log(address.lat, address.lon);

  const [coordinate, setCoordinate] = useState<Coordinate | null>({
    lat: address.lat,
    lon: address.lon,
  });

  const [showMap, setShowMap] = useState(false);

  const showErrorToast = () => {
    toast("Ubicación sin cobertura", {
      type: "error",
      autoClose: 500,
      toastId: "location",
    });
  };

  const updatingToast = () => {
    toast("Actualizando...", {
      toastId: "signup",
      isLoading: true,
      position: "bottom-right",
    });
  };

  const handleSaveButton = () => {
    handleClose();
  };

  return show ? (
    <ModalContainer>
      <div
        className="z-40 w-full h-screen fixed top-0 left-0
                flex justify-center items-center overflow-hidden pointer-events-none"
      >
        <div
          className="bg-white fixed z-50 w-11/12 h-4/6 md:w-3/4 md:h-3/4 
                rounded-2xl overflow-scroll flex flex-col
                animate-bouncein shadow-md p-4 scrollbar-hide pointer-events-auto space-y-4"
        >
          <div className="flex space-x-4">
            {showMap && (
              <div
                className="h-8 w-8 bg-shade rounded-xl flex items-center justify-center cursor-pointer transition-all hover:scale-95 active:bg-gray-200"
                onClick={() => setShowMap(false)}
              >
                <ArrowLeft />
              </div>
            )}
            <h1 className="font-semibold text-xl">Edita la dirección</h1>
          </div>
          {!showMap ? (
            <AddressForm
              address={address}
              onClickLocationButton={() => setShowMap(true)}
              coordinate={coordinate}
              onSave={handleSaveButton}
            />
          ) : (
            <div className="w-full h-5/6 rounded-xl overflow-hidden relative">
              <MapForm
                setCoordinate={setCoordinate}
                handleClose={() => {
                  setShowMap(false);
                }}
                coordinate={coordinate}
                errorToast={showErrorToast}
              />
            </div>
          )}
        </div>
      </div>
      <div
        className="z-30 bg-black w-full h-screen fixed 
                top-0 left-0 bg-opacity-50 animate-opacityin cursor-pointer"
        onClick={handleClose}
      ></div>
      <ToastContainer />
    </ModalContainer>
  ) : null;
};

export default AddressModal;

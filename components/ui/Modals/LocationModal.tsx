import { FC, useState } from "react";
import { useGetDeliveryAreasQuery } from "../../../services/auth";
import { MapContainer, Marker, Polygon, TileLayer } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";

import ModalContainer from "./ModalContainer";
import { BarButton } from "../Buttons";
import CustomMarker from "../CustomMarker";

import "leaflet/dist/leaflet.css";
import isMarkerInsidePolygon from "../../../utils/isMarkerInsidePolygon";
import { toast, ToastContainer } from "react-toastify";

interface Props {
  show: boolean;
  handleClose: () => void;
}

export const LocationModal: FC<Props> = ({ show = false, handleClose }) => {
  const [markerPosition, setMarkerPosition] = useState([
    13.702342669306118, -89.21357999951415,
  ]);

  const { isSuccess, data, isLoading } = useGetDeliveryAreasQuery(1);

  delete (L.Icon.Default as any).prototype._getIconUrl;

  const purpleOptions = { color: "blue" };

  const polygon =
    isSuccess && !isLoading
      ? [
          ...data[0].coordinates.map((coordinate) => [
            coordinate.lat,
            coordinate.lon,
          ]),
        ]
      : [];

  const handleMapClick = (newPosition: number[]) => {
    const isMarkerInside = isMarkerInsidePolygon(newPosition, polygon);
    isMarkerInside
      ? setMarkerPosition(newPosition)
      : toast("Ubicación sin cobertura", {
          type: "error",
          autoClose: 500,
          // icon: <ShoppingCart />,
        });
  };

  return show ? (
    <ModalContainer>
      <div
        className="z-40 w-full h-screen fixed top-0 left-0
                flex justify-center items-center"
      >
        <div
          className="bg-white fixed z-50 w-11/12 h-4/6 md:w-3/4 md:h-3/4 
                rounded-2xl overflow-hidden flex flex-col justify-between
                animate-bouncein shadow-md"
        >
          <div className="absolute top-0 z-50 pt-4 flex w-full justify-center items-center ">
            <h1 className="bg-white rounded-xl p-4 shadow-md font-bold">
              Selecciona tu ubicación
            </h1>
          </div>

          <MapContainer
            style={{ height: "100%", width: "100%", zIndex: "10" }}
            center={[13.702342669306118, -89.21357999951415]}
            zoom={13}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <CustomMarker
              handleMapClick={handleMapClick}
              markerPosition={markerPosition as LatLngExpression}
            />

            <Polygon
              pathOptions={purpleOptions}
              positions={isSuccess ? (polygon as LatLngExpression[]) : []}
            />
          </MapContainer>
          <div className="absolute p-6 bottom-0 z-50 w-full">
            <BarButton>Seleccionar</BarButton>
          </div>
        </div>
        <div
          className="z-30 bg-black w-full h-screen fixed 
                top-0 left-0 bg-opacity-50 animate-opacityin cursor-pointer"
          onClick={handleClose}
        ></div>
      </div>
      <ToastContainer />
    </ModalContainer>
  ) : null;
};

export default LocationModal;

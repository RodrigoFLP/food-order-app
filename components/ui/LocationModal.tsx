import { FC, useEffect, useState } from "react";
import ModalContainer from "./ModalContainer";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import BarButton from "./BarButton";
import { useGetDeliveryAreasQuery } from "../../services/auth";

const MapContainer = dynamic<any>(
  () => import("react-leaflet").then((module) => module.MapContainer),
  { ssr: false }
);
const Marker = dynamic<any>(
  () => import("react-leaflet").then((module) => module.Marker),
  { ssr: false }
);
const Popup = dynamic<any>(
  () => import("react-leaflet").then((module) => module.Popup),
  { ssr: false }
);
const TileLayer = dynamic<any>(
  () => import("react-leaflet").then((module) => module.TileLayer),
  { ssr: false }
);
const Polygon = dynamic<any>(
  () => import("react-leaflet").then((module) => module.Polygon),
  { ssr: false }
);

interface Props {
  show: boolean;
  handleClose: () => void;
}

export const LocationModal: FC<Props> = ({ show = false, handleClose }) => {
  const { isSuccess, data, isLoading } = useGetDeliveryAreasQuery(1);

  const [markerPosition, setMarkerPosition] = useState([
    13.702342669306118, -89.21357999951415,
  ]);

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
            center={markerPosition}
            zoom={13}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={markerPosition}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>

            <Polygon
              pathOptions={purpleOptions}
              positions={isSuccess ? polygon : []}
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
    </ModalContainer>
  ) : null;
};

export default LocationModal;

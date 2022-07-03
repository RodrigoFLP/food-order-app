import { Dispatch, FC, SetStateAction, useState } from "react";
import { useGetDeliveryAreasQuery } from "../../../services/auth";
import { MapContainer, Polygon, TileLayer } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";

import { BarButton } from "../Buttons";
import CustomMarker from "../CustomMarker";

import "leaflet/dist/leaflet.css";
import isMarkerInsidePolygon from "../../../utils/isMarkerInsidePolygon";
import { Coordinate } from "../../../interfaces";

interface Props {
  handleClose: () => void;
  setCoordinate: Dispatch<SetStateAction<Coordinate | null>>;
  coordinate: { lat: number; lon: number } | null;
  errorToast: () => void;
}

export const MapForm: FC<Props> = ({
  handleClose,
  setCoordinate,
  coordinate,
  errorToast,
}) => {
  console.log(coordinate);

  const [markerPosition, setMarkerPosition] = useState(
    coordinate
      ? [coordinate.lat, coordinate.lon]
      : [13.702342669306118, -89.21357999951415]
  );

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
    isMarkerInside ? setMarkerPosition(newPosition) : errorToast();
  };

  const handleSelectButton = async () => {
    setCoordinate({ lat: markerPosition[0], lon: markerPosition[1] });
    handleClose();
  };

  return (
    <>
      <MapContainer
        style={{
          height: "100%",
          width: "100%",
          zIndex: "10",
        }}
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
        <BarButton handleClick={handleSelectButton}>Seleccionar</BarButton>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default MapForm;

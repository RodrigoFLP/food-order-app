import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import {
  useGetDeliveryAreasQuery,
  useGetOneStoreQuery,
} from "../../../services/api";
import { MapContainer, Polygon, TileLayer } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";

import { BarButton } from "../Buttons";
import CustomMarker from "../../common/CustomMarker";

import "leaflet/dist/leaflet.css";
import isMarkerInsidePolygon, {
  isMarkerInsideAnyPolygon,
} from "../../../utils/isMarkerInsidePolygon";
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
  const {
    isSuccess: isSuccessAreas,
    data: areas,
    isLoading: isLoadingAreas,
  } = useGetDeliveryAreasQuery(1);

  const {
    isSuccess: isSuccessStore,
    data: store,
    isLoading: isLoadingStore,
  } = useGetOneStoreQuery();

  const [centerPosition, setCenterPosition] = useState(
    coordinate
      ? [coordinate.lat, coordinate.lon]
      : [13.981851794679411, -89.56730814403114]
  );

  const [markerPosition, setMarkerPosition] = useState(
    coordinate
      ? [coordinate.lat, coordinate.lon]
      : [13.981851794679411, -89.56730814403114]
  );

  useEffect(() => {
    if (isSuccessStore && !centerPosition && !markerPosition) {
      setMarkerPosition([store.lat, store.lon]);
      setCenterPosition([store.lat, store.lon]);
    }
  }, [store, isSuccessStore, centerPosition, markerPosition]);

  delete (L.Icon.Default as any).prototype._getIconUrl;

  const polygon =
    isSuccessAreas && !isLoadingAreas
      ? [
          ...areas.map((area) =>
            area.coordinates.map((coordinate) => [
              coordinate.lat,
              coordinate.lon,
            ])
          ),
        ]
      : [];

  const handleMapClick = (newPosition: number[]) => {
    const isMarkerInside = isMarkerInsideAnyPolygon(newPosition, polygon);
    isMarkerInside ? setMarkerPosition(newPosition) : errorToast();
  };

  const handleSelectButton = async () => {
    setCoordinate({ lat: markerPosition[0], lon: markerPosition[1] });
    handleClose();
  };

  return (
    <>
      <MapContainer
        style={{ height: "100%", width: "100%", zIndex: "10" }}
        center={centerPosition as LatLngExpression}
        zoom={13}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <CustomMarker
          handleMapClick={handleMapClick}
          markerPosition={markerPosition as LatLngExpression}
        />
        {areas &&
          areas.map((area) => (
            <Polygon
              key={area.id}
              pathOptions={{ color: "green" }}
              positions={area.coordinates.map((c) => [c.lat, c.lon])}
            />
          ))}
      </MapContainer>
      <div className="absolute p-6 bottom-0 z-50 w-full">
        <BarButton handleClick={handleSelectButton}>Seleccionar</BarButton>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default MapForm;

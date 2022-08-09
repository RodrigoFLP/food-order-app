import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import {
  useGetDeliveryAreasQuery,
  useGetOneStoreQuery,
} from "../../services/api";
import { MapContainer, Polygon, TileLayer } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";

import ModalContainer from "../ui/Modals/ModalContainer";
import { BarButton } from "../ui/Buttons";
import CustomMarker from "../common/CustomMarker";

import "leaflet/dist/leaflet.css";
import { isMarkerInsideAnyPolygon } from "../../utils/isMarkerInsidePolygon";
import { toast, ToastContainer } from "react-toastify";

interface Props {
  show: boolean;
  handleClose: () => void;
  setCoordinate: Dispatch<SetStateAction<{ lat: number; lon: number } | null>>;
  coordinate: { lat: number; lon: number } | null;
}

export const LocationModal: FC<Props> = ({
  show = false,
  handleClose,
  setCoordinate,
  coordinate,
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
    isMarkerInside
      ? setMarkerPosition(newPosition)
      : toast("Ubicación sin cobertura", {
          type: "error",
          autoClose: 500,
          // icon: <ShoppingCart />,
        });
  };

  const handleSelectButton = async () => {
    setCoordinate({ lat: markerPosition[0], lon: markerPosition[1] });
    handleClose();
  };

  return show ? (
    <ModalContainer>
      <div
        className="z-40 w-full h-screen fixed top-0 left-0
                flex justify-center items-center "
      >
        <div
          className="bg-white fixed z-50 w-11/12 h-4/6 md:w-3/4 md:h-3/4 
                rounded-2xl overflow-hidden flex flex-col justify-between
                animate-bouncein shadow-md"
        >
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
            <BarButton handleClick={handleSelectButton}>
              Guardar ubicación
            </BarButton>
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

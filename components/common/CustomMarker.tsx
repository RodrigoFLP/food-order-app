import { LatLngExpression } from "leaflet";
import { FC, useEffect } from "react";
import { Marker, useMap, useMapEvents } from "react-leaflet";
import { Location, Radar, Radar2, Gps } from "tabler-icons-react";
import { BarButton } from "../ui/Buttons";

interface Props {
  markerPosition: LatLngExpression;
  handleMapClick: ([]) => void;
}

const CustomMarker: FC<Props> = ({ markerPosition, handleMapClick }) => {
  const mapLocation = useMap();

  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      if (e.containerPoint.y > 100 || e.containerPoint.x < 660) {
        handleMapClick([lat, lng]);
      }
    },
  });

  return (
    <>
      <div className="absolute p-6 top-0 z-[1000] right-0">
        <BarButton handleClick={() => map.locate()}>
          <Gps />
        </BarButton>
      </div>
      <Marker position={markerPosition} />;
    </>
  );
};

export default CustomMarker;

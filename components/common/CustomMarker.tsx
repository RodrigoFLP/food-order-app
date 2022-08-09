import { LatLngExpression } from "leaflet";
import { FC, useEffect } from "react";
import { Marker, useMap, useMapEvents } from "react-leaflet";
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
      handleMapClick([lat, lng]);
    },
  });

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      handleMapClick([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
    });
  }, [mapLocation, map, handleMapClick]);

  return (
    <>
      <div className="absolute p-6 top-0 z-[1000] right-0">
        <BarButton handleClick={() => map.locate()}>Ubicarme</BarButton>
      </div>
      <Marker position={markerPosition} />;
    </>
  );
};

export default CustomMarker;

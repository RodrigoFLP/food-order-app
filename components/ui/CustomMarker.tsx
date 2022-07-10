import { LatLngExpression } from "leaflet";
import { FC, useEffect } from "react";
import { Marker, useMap, useMapEvents } from "react-leaflet";

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

  return <Marker position={markerPosition} />;
};

export default CustomMarker;

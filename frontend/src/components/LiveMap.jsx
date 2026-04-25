import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function LiveMap({ bins }) {
  return (
    <MapContainer
      center={[19.0760, 72.8777]}
      zoom={11}
      style={{ height: "500px", width: "100%", borderRadius: "15px" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {bins.map((bin) => (
        <Marker
          key={bin.bin_id}
          position={[bin.lat, bin.lng]}
        >
          <Popup>
            <b>{bin.bin_id}</b><br />
            Fill Level: {bin.fill_level}%<br />
            Status: {bin.fill_level >= 80 ? "Full" : "Normal"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
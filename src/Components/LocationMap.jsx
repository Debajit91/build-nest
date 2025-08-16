import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const LocationMap = () => {
  const position = [22.3419, 91.8361];
  return (
    <div className="w-full h-[500px] rounded-lg border-1 overflow-hidden shadow-md">
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            📍 BuildNest Apartment
            <br />
            Chittagong, Bangladesh
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap;

import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const defaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const selectedIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapCenter({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const MapComponent = ({ pins, selectedPin, onPinSubmit, onPinSelect }) => {
  const [position, setPosition] = useState(null);
  const [remark, setRemark] = useState("");

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });
    return null;
  }

  const fetchAddress = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`
      );
      return res.data.display_name;
    } catch (error) {
      console.error("Error fetching address", error);
      return "Address not found";
    }
  };

  const handlePinSubmit = async () => {
    const address = await fetchAddress(position.lat, position.lng);
    const newPin = {
      lat: position.lat,
      lng: position.lng,
      remark: `${remark}`, 
      address,
    };

    setRemark("");
    setPosition(null);
    onPinSubmit(newPin);
  };

  return (
    <MapContainer
      center={[10.4500, 77.5200]}
      zoom={13}
      style={{ height: "620px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler />

      {position && (
        <Marker position={position} icon={defaultIcon}>
          <Popup>
            <div className="p-3 min-w-80 bg-amber-300 rounded-lg shadow-md space-y-4">
              <textarea
                placeholder="Enter remarks"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className="w-full h-12 p-1 text-lg text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <div className="text-center">
                <button
                  className="text-lg font-bold px-2 py-1 text-white border border-gray-800 rounded-lg bg-gradient-to-b from-gray-900 to-black hover:from-emerald-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={handlePinSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      )}

      {pins.map((pin, index) => (
        <Marker
          key={index}
          position={[pin.lat, pin.lng]}
          icon={selectedPin === index ? selectedIcon : defaultIcon}
          eventHandlers={{
            click: () => {
              onPinSelect(index);
            },
          }}
        >
          <Popup>
            <div className="p-4 max-w-xs bg-amber-300 rounded-lg shadow-lg">
              <p className="text-lg font-semibold text-gray-950 mb-2">
                <b>Remarks:</b> <b className="text-lime-700">{pin.remark}</b>
              </p>
              <p className="text-lg text-gray-600 leading-tight">
                <b className="text-gray-600">Latitude:</b> <b className="text-lime-700">{pin.lat}</b>
              </p>
              <p className="text-lg text-gray-600 leading-tight">
                <b className="text-gray-600">Longitude:</b> <b className="text-lime-700">{pin.lng}</b>
              </p>
              <p className="text-lg text-gray-600 leading-tight">
                <b className="text-gray-600">Address:</b> <b className="text-lime-700">{pin.address}</b>
              </p>
            </div>
          </Popup>
        </Marker>
      ))}

      {selectedPin !== null && (
        <MapCenter
          center={[pins[selectedPin].lat, pins[selectedPin].lng]}
          zoom={15}
        />
      )}
    </MapContainer>
  );
};

export default MapComponent;

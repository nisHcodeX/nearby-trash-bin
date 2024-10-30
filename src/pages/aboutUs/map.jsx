export {}
// import React, { useEffect, useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine";
// import "./index.scss";

// const LocationMarker = ({ position }) => {
//   return position === null ? null : (
//     <Marker position={position}>
//       <Popup>You are here</Popup>
//     </Marker>
//   );
// };

// const OpenMap = () => {
//   const [position, setPosition] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [routingControl, setRoutingControl] = useState(null);
//   const map = useMapEvents({
//     click() {
//       map.locate();
//     },
//     locationfound(e) {
//       setPosition(e.latlng);
//       setUserLocation(e.latlng); // Set the user's current location
//     },
//   });

//   useEffect(() => {
//     // Get the user's current location if it's not already set
//     if (!userLocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           const userLatLng = L.latLng(latitude, longitude);
//           setUserLocation(userLatLng);
//           map.setView(userLatLng, map.getZoom()); // Center map on user's location
//         },
//         (error) => {
//           console.error("Error getting user location:", error);
//         }
//       );
//     }
//   }, [userLocation, map]);

//   useEffect(() => {
//     if (map && userLocation && L.Routing) {
//       // Replace with your destination coordinates
//       const destination = L.latLng(6.053519, 80.220978);

//       // Remove existing routing control if it exists
//       if (routingControl) {
//         map.removeControl(routingControl);
//       }

//       // Create and add new routing control
//       const newRoutingControl = L.Routing.control({
//         waypoints: [userLocation, destination],
//         routeWhileDragging: true,
//       }).addTo(map);

//       setRoutingControl(newRoutingControl);
//     }
//   }, [map, userLocation, routingControl]);

//   return <LocationMarker position={position} />;
// };

// const App = () => {
//   return (
//     <MapContainer
//       center={[51.505, -0.09]} // Initial center, will be updated
//       zoom={13}
//       scrollWheelZoom={false}
//       style={{ height: "100%", width: "100%" }}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <OpenMap />
//     </MapContainer>
//   );
// };

// export default App;


import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyB9mlNrPmt27rl_SK5d2jgVDw3rszWfBfI"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)

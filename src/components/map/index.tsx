import TrashBinCard from '@components/card';
import React, { useEffect, useState, useCallback } from 'react';
import './index.scss';
import { DirectionsRenderer, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { deprecations } from 'sass';

const containerStyle = {
  width: "100%",
  height: "100%",
};


const DirectionContainer: React.FC<{ lat?: number, lng?: number }> = ({ lat, lng }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCenter({ lat: 6.053519, lng: 80.220978 });
    });
  }, []);

  const onLoad = useCallback((map: google.maps.Map) => {
    if (center) {
      const bounds = new google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
    }
    setMap(map);
    map.setZoom(10)
  }, [center]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY ?? "",
  });

  async function calculateRoute() {

    const directioValue = { lat: lat ?? 6.142658661791, lng: lng ?? 80.54002282138 }
    if (!center && !directioValue) {
      return
    }
    if (center) {
      const directionsService = new google.maps.DirectionsService()
      const results = await directionsService.route({
        origin: center,
        destination: directioValue,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      })
      setDirectionsResponse(results)
    }
  }

  return (
    <div className='login-container p-4'>
      <div className="map-input-container d-flex gap-2 mb-4">
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-success" onClick={() => calculateRoute()}>Calculate Route</button>
          <button type="button" className="btn btn-success" onClick={() => map?.panTo(center!)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
            </svg>
          </button>
          {/* <button type="button" className="btn btn-success" onClick={() => setDirectionsResponse(null)} style={{ marginLeft: 'auto' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button> */}
        </div>
      </div>
      <div className="map-wrapper">
        {isLoaded && center && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              // zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            <Marker position={center} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default DirectionContainer;

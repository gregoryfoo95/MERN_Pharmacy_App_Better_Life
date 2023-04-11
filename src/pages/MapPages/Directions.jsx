import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Directions({ zoom = 17 }) {
  const mapRef = useRef();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [location, setLocation] = useState(null);
  const [destinationMarker, setDestinationMarker] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);
  const [refreshLocation, setRefreshLocation] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCurrentPosition([lat, lng]);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`api/map/${id}`);
        setLocation(response.data?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [refreshLocation]);

  const handleRefreshLocation = () => {
    setRefreshLocation(!refreshLocation);
  };

  useEffect(() => {
    if (!currentPosition || !location) return;

    const map = L.map(mapRef.current).setView(currentPosition, zoom);

    if (!map) return;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const destinationLatLng = L.latLng(location.latitude, location.longitude);
    const destinationMarker = L.marker(destinationLatLng).addTo(map);
    setDestinationMarker(destinationMarker);

    const waypoints = [
      L.latLng(currentPosition[0], currentPosition[1]),
      destinationLatLng,
    ];

    const control = L.Routing.control({
      waypoints: waypoints,
      router: L.Routing.mapbox(process.env.VITE_APP_VITE_VITE_APP_MAPBOX_API_KEY),
      routeWhileDragging: true,
      containerClassName: 'custom-lrm-instructions',
    }).addTo(map);
    setRoutingControl(control);

    const marker = L.marker([location.latitude, location.longitude]);
    marker.bindPopup(`Store Name: ${location.storeName}`);

    const markerGroup = L.layerGroup([marker]).addTo(map);

    return () => {
  map.remove();
  if (routingControl) {
    if (routingControl.removeFrom) {
      routingControl.removeFrom(map);
    }
    setRoutingControl(null);
  }
  if (destinationMarker) {
    if (destinationMarker.removeFrom) {
      destinationMarker.removeFrom(map);
    }
    setDestinationMarker(null);
  }
};

  }, [currentPosition, zoom, location]);


  return (
    <div style={{ width: '100%', height: '100%' }}>
      <button onClick={handleRefreshLocation}>Refresh Location</button>
      <div id="map" ref={mapRef} style={{ width: '    100%', height: 'calc(100% - 40px)', marginBottom: '10px' }} />
  
</div>
);
}

export default Directions;



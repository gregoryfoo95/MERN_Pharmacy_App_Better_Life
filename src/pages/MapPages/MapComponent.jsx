import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import axios from 'axios';
import greenMarkerUrl from '../../../images/MarkersImg/PharmacistAvailable.png';
import redMarkerUrl from '../../../images/MarkersImg/PharmacistNotAvailable.png';
import here from '../../../images/MarkersImg/here.png';

function MapComponent({ zoom = 17 }) {
  const mapRef = useRef();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [locations, setLocations] = useState([]);
  const [refreshLocation, setRefreshLocation] = useState(false);
  

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
  }, [refreshLocation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/map');
        setLocations(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleRefreshLocation = () => {
    setRefreshLocation(!refreshLocation);
  };
  

  useEffect(() => {
    if (!currentPosition) return;

    const map = L.map(mapRef.current).setView(currentPosition, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const currentLocationMarker = L.marker(currentPosition, {
      icon: L.icon({
        iconUrl: here,
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
      }),
    }).addTo(map);

    const markers = locations.map(location => {
      const markerIconUrl = location.pharmacist ? greenMarkerUrl : redMarkerUrl;
    
    const marker = L.marker([location.latitude, location.longitude], {
      icon: L.icon({
        iconUrl: markerIconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [0, -34]
      })
    });

      marker.bindPopup(
        `Store Name: ${location.storeName}`
      );
      return marker;
    });

    const markerGroup = L.layerGroup(markers).addTo(map);

    return () => {
      map.remove();
    };
  }, [currentPosition, zoom, locations]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <button onClick={handleRefreshLocation}>Refresh Location</button>
      <div id="map" ref={mapRef} style={{ width: '    100%', height: 'calc(100% - 40px)', marginBottom: '10px' }} />
      
  
</div>)
}

export default MapComponent;

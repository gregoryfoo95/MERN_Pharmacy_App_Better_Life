import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import axios from 'axios';


function MedicineMapComponent({ filteredMedicines, zoom = 17 }) {
  console.log(filteredMedicines);
  const mapRef = useRef();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [locations, setLocations] = useState([]);

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
        const responses = await Promise.all(
          filteredMedicines.map((medicine) =>
            axios.get('/api/stocks/', { params: { medicineId: medicine._id } })
          )
        );

        console.log('MedicineMapComponent API responses:', responses);

        const allLocations = responses.flatMap((response) => response.data.data);
        console.log('allLocations', allLocations);
        setLocations(allLocations);
      
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [filteredMedicines]);

  

  useEffect(() => {
    if (!currentPosition) return;

    const map = L.map(mapRef.current).setView(currentPosition, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const currentLocationMarker = L.marker(currentPosition, {
      icon: L.icon({
        iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-red.png',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
      }),
    }).addTo(map);

    const markers = locations.map(location => {
      const marker = L.marker([location.Latitude, location.Longitude]);
    
      marker.bindPopup(
        `Store Name: ${location.storeName}<br/>Medicine: ${location.medicine.name}`
      );
      return marker;
    });


    const markerGroup = L.layerGroup(markers).addTo(map);

    return () => {
      map.remove();
    };
  }, [currentPosition, zoom, filteredMedicines]);

  return <div id="map" ref={mapRef} style={{ width: '100%', height: '50%' }} />;
}

export default MedicineMapComponent;

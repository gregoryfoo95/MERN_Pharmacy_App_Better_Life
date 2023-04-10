import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import MarkerDetails from './MarkerDetails';

function sortLocations(locations, currentPosition) {
  return locations.sort((a, b) => {
    const distanceA = L.latLng(currentPosition).distanceTo(
      L.latLng(a.latitude, a.longitude)
    );
    const distanceB = L.latLng(currentPosition).distanceTo(
      L.latLng(b.latitude, b.longitude)
    );
    return distanceA - distanceB;
  });
}


function Path() {
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
        const response = await axios.get(`${process.env.BACK_END_URL}/api/map`);
        const sortedLocations = sortLocations(response.data.data, currentPosition);
        setLocations(
          response.data.data.map((location) => {
            const distanceInMeters = L.latLng(currentPosition).distanceTo(
              L.latLng(location.latitude, location.longitude)
            );
            const distanceInKm = distanceInMeters / 1000;
            const walkingSpeed = 5; // km/hr
            const walkTime = distanceInKm / walkingSpeed;

            return {
              ...location,
              distanceInKm,
              walkTime,
            };
          })
        );
      } catch (error) {
        console.error(error);
      }
    };
    if (currentPosition) {
      fetchData();
    }
  }, [currentPosition]);

  return (
    <div>
      {locations.map((location) => (
        <MarkerDetails
          key={location._id}
          currentPosition={currentPosition}
          location={location}
        />
      ))}
    </div>
  );
}

export default Path;

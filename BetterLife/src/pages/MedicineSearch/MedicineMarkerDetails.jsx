
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MapComponent from '../MapPages/MapComponent';


function MarkerDetails({ currentPosition, location}) {
  const [showDirection, setShowDirection] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleGetDirection = () => {
    setShowDirection(true);
    setSelectedLocation(location);
  };

  const { storeName, storeAddress, Pharmacy, distanceInKm, walkTime } = location;

  return (
    <div key={location._id}>
      <h3>{storeName}</h3>
      <p>Address : {storeAddress}</p>
      <p>Pharmacist: {Pharmacy}</p>
      <p>Distance: {distanceInKm.toFixed(2)} km</p>
      <p>Walk Time: {walkTime.toFixed(1)} hours</p>
      <Link to={`/map/${location._id}`}>Get Direction</Link>
      {showDirection && (
        <MapComponent
          currentPosition={currentPosition}
          locations={[currentPosition, selectedLocation]}
          zoom={15}
        />
        
      )}
    </div>
  );
}

export default MarkerDetails;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function MarkerDetails({ currentPosition, location}) {
  const [showDirection, setShowDirection] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleGetDirection = () => {
    setShowDirection(true);
    setSelectedLocation(location);
  };

  const { storeName, storeAddress, distanceInKm, walkTime } = location;
  const isPharmacistAvailable = location.user[0].available;
  console.log(isPharmacistAvailable);

  return (
    <div key={location._id}>
      <h3>{storeName}</h3>
      <p>Address : {storeAddress}</p>
      <p>Pharmacist:  
      <span style={{ color: isPharmacistAvailable ? 'green' : 'red' }}>
        {isPharmacistAvailable ? ' Available' : ' Not Available'}
      </span>
      </p>
      <p>Distance: {distanceInKm.toFixed(2)} km</p>
      <p>Walk Time: {walkTime.toFixed(1)} hours</p>
      <Link to={`/map/${location._id}`}>Get Direction</Link>
    </div>
  );
}

export default MarkerDetails;

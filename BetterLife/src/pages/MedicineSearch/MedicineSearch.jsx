import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import greenGreenMarkerUrl from '../../../images/MarkersImg/Pharmacist_MedicineAvailable.png';
import greenYellowMarkerUrl from '../../../images/MarkersImg/PharmacistAvailable__MedicineLow.png';
import greenRedMarkerUrl from '../../../images/MarkersImg/PharmacistAvailable__NoMedicine.png';
import redGreenMarkerUrl from '../../../images/MarkersImg/NoPharmacist__MedicineAvailable.png';
import redYellowMarkerUrl from '../../../images/MarkersImg/NoPharmacist__MedicineLow.png';
import redRedMarkerUrl from '../../../images/MarkersImg/NoPharmacist_NoMedicine.png';
import here from '../../../images/MarkersImg/here.png';

const getMarkerIconUrl = (pharmacistAvailable, quantity) => {
  if (pharmacistAvailable) {
    if (quantity > 3) {
      return greenGreenMarkerUrl;
    } else if (quantity > 0) {
      return greenYellowMarkerUrl;
    } else {
      return greenRedMarkerUrl;
    }
  } else {
    if (quantity > 3) {
      return redGreenMarkerUrl;
    } else if (quantity > 0) {
      return redYellowMarkerUrl;
    } else {
      return redRedMarkerUrl;
    }
  }
};


const MedicineSearch = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchMedicineName, setSearchMedicineName] = useState('');
  const [searchBrand, setSearchBrand] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchStrength, setSearchStrength] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    axios.get('/api/stocks').then((response) => {
      setMedicines(response.data);
    });
  }, []);

  useEffect(() => {
    const filtered = medicines.filter((medicine) => {
      const nameMatch = medicine.medicine.name.toLowerCase().includes(searchMedicineName.toLowerCase());
      const brandMatch = searchBrand ? medicine.medicine.brand === searchBrand : true;
      const typeMatch = searchType ? medicine.medicine.type === searchType : true;
      const strengthMatch = searchStrength ? medicine.medicine.strength === searchStrength : true;
      return nameMatch && brandMatch && typeMatch && strengthMatch;
    });
    setFilteredMedicines(filtered);
  }, [medicines, searchMedicineName, searchBrand, searchType, searchStrength]);

  const uniqueBrands = Array.from(new Set(filteredMedicines.map((medicine) => medicine.medicine.brand)));
  const uniqueTypes = Array.from(new Set(filteredMedicines.map((medicine) => medicine.medicine.type)));
  const uniqueStrengths = Array.from(new Set(filteredMedicines.map((medicine) => medicine.medicine.strength)));

  const handleSubmit = (event) => {
    event.preventDefault();
    

    // Create the Leaflet map
    const map = L.map('mapid').setView([0, 0], 13);

    // Add a tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Get the user's current position
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      // Center the map at the user's current location
      map.setView([latitude, longitude], 13);

      // Add a marker at the user's current location
      L.marker([latitude, longitude], {       icon: L.icon({
        iconUrl: here,
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
      }),})
      .addTo(map)
      .bindPopup('You are here');


    // Add markers to the map for each filtered medicine
    filteredMedicines.forEach((medicine) => {
      const {
        location: { latitude: latitude, longitude: longitude },
      } = medicine;


      // Make sure latitude and longitude are defined
      if (latitude && longitude) {
        const markerIconUrl = getMarkerIconUrl(medicine.location.pharmacist, medicine.quantity);
        const markerIcon = L.icon({ iconUrl: markerIconUrl, iconSize: [38, 95], iconAnchor: [22, 94], popupAnchor: [-3, -76] });
        L.marker([latitude, longitude], { icon: markerIcon }).addTo(map);
          // .addTo(map)

      }
      const results = (
        <ul>
          {filteredMedicines.map((medicine) => (
            <li key={medicine._id}>
              <p>Store Name: {medicine.location.storeName}</p>
              <p>Store Address: {medicine.location.storeAddress}</p>
              <p>Pharmacy Dispensing Hours: {medicine.location.dispensingHours}</p>
              <p>Medicine Name: {medicine.medicine.name}</p>
              <p>Brand: {medicine.medicine.brand}</p>
              <p>Type: {medicine.medicine.type}</p>
              <p>Strength: {medicine.medicine.strength}</p>
              <p>Pharmacist: {medicine.location.pharmacist}
              <span style={{ color: medicine.location.pharmacist ? 'green' : 'red' }}>
              {medicine.location.pharmacist ? ' Available' : ' Not Available'}
              </span>
              </p>
              <p>Medicine: {medicine.location.name}
              <span style={{ color: medicine.quantity === 0 ? 'red' : medicine.quantity < 4 ? 'yellow' : 'green' }}>
                {medicine.quantity === 0 ? 'No Stocks' : medicine.quantity < 4 ? 'Low Stocks' : 'Available'}
              </span>
              </p>
              <Link to={`/map/${medicine.location._id}`}>Get Direction</Link>
            </li>
          ))}
        </ul>
      );
      setSearchResults(results);
    });
  },
  (error) => {
    console.error(error);
  }
);

};

  return (
    <div>
      <h2>Medicine List</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Medicine Name:
          <input type="text" onChange={(e) => setSearchMedicineName(e.target.value)} />
        </label>
        <br />
        <label>
          Brand:
          <select value={searchBrand} onChange={(e) => setSearchBrand(e.target.value)}>
            <option value="">Any</option>
            {uniqueBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Type:
          <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="">Any</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Strength:
          <select value={searchStrength} onChange={(e) => setSearchStrength(e.target.value)}>
            <option value="">Any</option>
            {uniqueStrengths.map((strength) => (
              <option key={strength} value={strength}>
                {strength}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Check Stocks</button>
      </form>
      <div id="mapid" style={{ height: "400px", width: "100%" }}></div>
      {searchResults}
    </div>
    
  );
  
};

export default MedicineSearch;

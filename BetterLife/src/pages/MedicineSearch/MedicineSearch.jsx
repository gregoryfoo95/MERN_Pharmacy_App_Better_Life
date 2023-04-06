import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MedicineSearch = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchMedicineName, setSearchMedicineName] = useState('');
  const [searchBrand, setSearchBrand] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchStrength, setSearchStrength] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState([]);

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
        iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-red.png',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
      }),})
      .addTo(map)
      .bindPopup('You are here');


    // Add markers to the map for each filtered medicine
    filteredMedicines.forEach((medicine) => {
      const {
        location: { Latitude: latitude, Longitude: longitude },
      } = medicine;
      // const { name, brand, type, strength } = medicineDetails;
      // const { latitude, longitude } = location;

      console.log(medicine);

    
      // Make sure latitude and longitude are defined
      if (latitude && longitude) {
        L.marker([latitude, longitude])
          .addTo(map)
          // .bindPopup(
            // `<div><b>Name:</b> ${name}</div>` +
              // `<div><b>Brand:</b> ${brand}</div>` +
          //     `<div><b>Type:</b> ${type}</div>` +
          //     `<div><b>Strength:</b> ${strength}</div>` +
          //     `<div><b>Quantity:</b> ${quantity}</div>`
          // );
          
      }
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
      <ul>
        {filteredMedicines.map((medicine) => (
          <li key={medicine._id}>
            <p>Medicine Name: {medicine.medicine.name}</p>
            <p>Brand: {medicine.medicine.brand}</p>
            <p>Type: {medicine.medicine.type}</p>
            <p>Strength: {medicine.medicine.strength}</p>
            <p>Location: {medicine.location.name}</p>
            <p style={{ color: medicine.quantity === 0 ? 'red' : medicine.quantity < 4 ? 'yellow' : 'green' }}>
              {medicine.quantity === 0 ? 'No Stocks' : medicine.quantity < 4 ? 'Low Stocks' : 'Available'}
            </p>
            <Link to={`/map/${medicine.location._id}`}>Get Direction</Link>
          </li>
        ))}
      </ul>
    </div>
    
  );
  
};

export default MedicineSearch;

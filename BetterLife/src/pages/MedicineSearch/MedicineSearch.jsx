import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from '../MapPages/MapComponent';

const MedicineSearch = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchMedicineName, setSearchMedicineName] = useState('');
  const [searchBrand, setSearchBrand] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchStrength, setSearchStrength] = useState('');

  useEffect(() => {
    axios.get('/api/stocks').then((response) => {
      setMedicines(response.data);
    });
  }, []);

  const filteredMedicines = medicines.filter((medicine) => {
    const nameMatch = medicine.medicine.name.toLowerCase().includes(searchMedicineName.toLowerCase());
    const brandMatch = searchBrand ? medicine.medicine.brand === searchBrand : true;
    const typeMatch = searchType ? medicine.medicine.type === searchType : true;
    const strengthMatch = searchStrength ? medicine.medicine.strength === searchStrength : true;

    return nameMatch && brandMatch && typeMatch && strengthMatch;
  });

  const uniqueBrands = Array.from(new Set(filteredMedicines.map((medicine) => medicine.medicine.brand)));
  const uniqueTypes = Array.from(new Set(filteredMedicines.map((medicine) => medicine.medicine.type)));
  const uniqueStrengths = Array.from(new Set(filteredMedicines.map((medicine) => medicine.medicine.strength)));
  const { storeName, storeAddress, Pharmacy, distanceInKm, walkTime } = location;
  return (
    <div>
      <h2>Medicine List</h2>
      <form>
        <label>
          Medicine Name:
          <input type="text" value={searchMedicineName} onChange={(e) => setSearchMedicineName(e.target.value)} />
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
        <button type="submit">Search</button>
      </form>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineSearch;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
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
  const [showClearButton, setShowClearButton] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.VITE_APP_BACK_END_URL}/api/stocks`).then((response) => {
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

  const handleClearAll = () => {
    setSearchMedicineName('');
    setSearchBrand('');
    setSearchType('');
    setSearchStrength('');
    setSearchResults(null);
  
    if (window.map) {
      window.map.remove();
    }
    setShowClearButton(false);
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowClearButton(true);

    // Check if the map container element is available
  if (!document.getElementById('mapid')) {
    return;
  }

    // Create the Leaflet map
    const map = L.map('mapid').setView([0, 0], 13);
    window.map = map;

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
      map.whenReady(() => {
        map.setView([latitude, longitude], 13);
      });

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
        const markerIconUrl = getMarkerIconUrl(medicine.location.user[0].available, medicine.quantity);
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
              <p>Pharmacist: {medicine.location.user[0].available}
              <span style={{ color: medicine.location.user[0].available ? 'green' : 'red' }}>
              {medicine.location.user[0].available ? ' Available' : ' Not Available'}
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
      <h1 className="text-center" style={{ color: '#3a1730' }}>
        Medicine List
      </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label className="form-label">Medicine Name:</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            value={searchMedicineName}
            onChange={e => setSearchMedicineName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Brand:</Form.Label>
          <Form.Select
            value={searchBrand}
            onChange={e => setSearchBrand(e.target.value)}>
            <option value="">Any</option>
            {uniqueBrands.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Type:</Form.Label>
          <Form.Select
            value={searchType}
            onChange={e => setSearchType(e.target.value)}>
            <option value="">Any</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Strength:</Form.Label>
          <Form.Select
            value={searchStrength}
            onChange={e => setSearchStrength(e.target.value)}>
            <option value="">Any</option>
            {uniqueStrengths.map(strength => (
              <option key={strength} value={strength}>
                {strength}
              </option>
            ))}

          </Form.Select>
        </Form.Group>
        <Button
          type="submit"
          style={{ backgroundColor: '#00A0A0', marginTop: '20px' }}>
          Check Stocks
        </Button>
        {showClearButton && (
        <Button 
          type="button" onClick={handleClearAll}
          style={{ backgroundColor: '#00A0A0', marginTop: '20px' }}>
          Search another medicine
          </Button>)}
      </Form>
      <div id="mapid" style={{ height: '400px', width: '100%' }}></div>
      {searchResults}
    </div>
  );
};

export default MedicineSearch;

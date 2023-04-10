import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
const BASE_URL_STOCK = 'http://localhost:3000/api/stock';
import Button from 'react-bootstrap/Button';
import './StockSearchForm.css';

export default function StockSearchForm({ setMedicines }) {
  const [stockOptions, setStockOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    medicineName: '',
    medicineBrand: '',
    medicineStrength: '',
    storeName: '',
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSearchQuery(prevQuery => ({ ...prevQuery, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/api/stock`, {
        params: searchQuery,
      });
      console.log(response.data);
      setMedicines(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchStockOptions = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/api/stock`, {
        params: { medicineName: searchQuery.medicineName },
      });
      setStockOptions(response.data);
    };
    fetchStockOptions();
  }, [searchQuery.medicineName]);

  return (
    <fieldset>
      <h1>Search Bar for Stock Inventory</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group">
          <label style={{ textAlign: 'left' }}>
            Medicine Name:
            <input
              type="text"
              name="medicineName"
              value={searchQuery.medicineName}
              onChange={handleInputChange}
              className="form-control"
            />
          </label>
        </div>
        <div className="form-group">
          <label style={{ textAlign: 'left' }}>
            Brand:
            <select
              type="text"
              name="medicineBrand"
              value={searchQuery.medicineBrand}
              onChange={handleInputChange}
              className="form-control">
              <option value="">Any</option>
              {[
                ...new Set(stockOptions.map(stock => stock.medicine.brand)),
              ].map(brand => (
                <option value={brand}>{brand}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label style={{ textAlign: 'left' }}>
            Type:
            <select
              type="text"
              name="medicineStrength"
              value={searchQuery.medicineStrength}
              onChange={handleInputChange}
              className="form-control">
              <option value="">Any</option>
              {[
                ...new Set(stockOptions.map(stock => stock.medicine.strength)),
              ].map(strength => (
                <option value={strength}>{strength}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label style={{ textAlign: 'left' }}>
            Store Location:
            <select
              type="text"
              name="medicineStrength"
              value={searchQuery.medicineStrength}
              onChange={handleInputChange}
              className="form-control">
              <option value="">Any</option>
              {[
                ...new Set(stockOptions.map(stock => stock.location.storeName)),
              ].map(storeName => (
                <option value={storeName}>{storeName}</option>
              ))}
            </select>
          </label>
        </div>
        <Button
          type="submit"
          className="search-button"
          style={{ backgroundColor: '#00A0A0', marginBottom: '30px' }}>
          Search
        </Button>
      </form>
    </fieldset>
  );
}

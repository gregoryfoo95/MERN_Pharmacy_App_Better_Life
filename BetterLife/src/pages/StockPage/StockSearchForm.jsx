import { useState, useEffect, useRef } from 'react';
import axios from "axios";
const BASE_URL_STOCK = 'http://localhost:3000/api/stock';


export default function StockSearchForm({ setMedicines }) {
    const [stockOptions, setStockOptions] = useState([]);
    const [searchQuery, setSearchQuery] = useState({
        medicineName: '',
        medicineBrand: '',
        medicineStrength: '',
        storeName: '',
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSearchQuery((prevQuery) => ({ ...prevQuery, [name]: value }));
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`${BASE_URL_STOCK}`, {
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
      const response = await axios.get(`${BASE_URL_STOCK}`, {
          params: { medicineName: searchQuery.medicineName },
      });
      setStockOptions(response.data);
      };
      fetchStockOptions();
    }, [searchQuery.medicineName]);

  return (
    <fieldset>
    <legend>Search Bar for Stock Inventory</legend>
    <form onSubmit={handleSubmit}>
      <label>
        Medicine Name:
        <input
          type="text"
          name="medicineName"
          value={searchQuery.medicineName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Brand:
        <select
          type="text"
          name="medicineBrand"
          value={searchQuery.medicineBrand}
          onChange={handleInputChange}
        >
          {[... new Set(stockOptions.map(stock => stock.medicine.brand))].map((brand) => (
            <option value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </label>
      <label>
        Strength:
        <select
          type="text"
          name="medicineStrength"
          value={searchQuery.medicineStrength}
          onChange={handleInputChange}
        >
          {[... new Set(stockOptions.map(stock => stock.medicine.strength))].map((strength) => (
            <option value={strength}>
              {strength}
            </option>
          ))}
        </select>
      </label>
      <label>
        Store Location:
        <select
          type="text"
          name="storeName"
          value={searchQuery.storeName}
          onChange={handleInputChange}
        >
          {[... new Set(stockOptions.map(stock => stock.location.storeName))].map((storeName) => (
            <option value={storeName}>
              {storeName}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Search</button>
    </form>
    </fieldset>
  );
}
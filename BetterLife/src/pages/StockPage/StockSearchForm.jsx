import { useState, useEffect, useRef } from 'react';
import axios from "axios";
const BASE_URL_STOCK = 'http://localhost:3000/api/stock';


export default function StockSearchForm({ setMedicines }) {
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
            const response = await axios.get(`${BASE_URL_STOCK}/search`, {
                params: searchQuery,
            });
            setMedicines(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

  return (
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
        <input
          type="text"
          name="medicineBrand"
          value={searchQuery.medicineBrand}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Type:
        <input
          type="text"
          name="medicineStrength"
          value={searchQuery.medicineStrength}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Store Location:
        <input
          type="text"
          name="storeName"
          value={searchQuery.storeName}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}
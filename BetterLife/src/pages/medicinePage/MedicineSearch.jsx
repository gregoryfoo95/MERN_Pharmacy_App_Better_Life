import { useState, useEffect, useRef } from 'react';
import axios from "axios";

export default function StockSearchForm({ setMedicines, BASE_URL }) {
    const [searchQuery, setSearchQuery] = useState({
        brand: '',
        name: '',
        type: '',
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSearchQuery((prevQuery) => ({ ...prevQuery, [name]: value }));
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`${BASE_URL}`, {
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
        Brand:
        <input
          type="text"
          name="brand"
          value={searchQuery.brand}
          onChange={handleInputChange}
        />
    </label>
    <label>
        Name:
        <input
          type="text"
          name="name"
          value={searchQuery.name}
          onChange={handleInputChange}
        />
    </label>

    <label>
        Type:
        <input
          type="text"
          name="type"
          value={searchQuery.type}
          onChange={handleInputChange}
        />
    </label>
    <button type="submit">Search</button>
    </form>
  );
}
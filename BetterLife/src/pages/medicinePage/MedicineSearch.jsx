import { useState, useEffect, useRef } from 'react';
import axios from "axios";

export default function StockSearchForm({ setMedicines, BASE_URL }) {
    const [medicineOptions, setMedicineOptions] = useState([]);
    const [searchQuery, setSearchQuery] = useState({
        brand: '',
        name: '',
        strength: '',
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

     useEffect(() => {
        const fetchMedicineOptions = async () => {
        const response = await axios.get('/api/medicine', {
            params: { name: searchQuery.name },
        });
        setMedicineOptions(response.data);
        };
        fetchMedicineOptions();
    }, [searchQuery.name]); 

  return (
    <fieldset>
    <legend>Search Bar for Medicine Database</legend>
    <form onSubmit={handleSubmit}>
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
        Brand: 
        <select name="brand" value={searchQuery.brand} onChange={handleInputChange} >
            {[...new Set(medicineOptions.map(medicine => medicine.brand))].map((brand) => (
                <option value={brand}>
                {brand}
                </option>
            ))}
        </select>
    </label>
    <label>
        Strength:
        <select name="strength" value={searchQuery.strength} onChange={handleInputChange} >
            {[...new Set(medicineOptions.map(medicine => medicine.strength))].map((strength) => (
                <option value={strength}>
                {strength}
                </option>
            ))}
        </select>
    </label>
    <button type="submit">Search</button>
    </form>
    </fieldset>
  );
}
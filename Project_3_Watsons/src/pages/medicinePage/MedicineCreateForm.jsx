import { useState, useEffect } from 'react';
import axios from 'axios';
export default function MedicineCreateForm({ setMedicines, BASE_URL }) {
    const [formValues, setFormValues] = useState({
        brand: '',
        name: '',
        type: '',
        strength: '',
        price: '',
        expiry_date: '',
    });

    // Handle form input change
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    // Handle form submission for creating a new medicine
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
        const response = await axios.post(`${BASE_URL}/medicine`, formValues);
        console.log(response)
        setMedicines((prevMedicines) => [...prevMedicines, response.data]);
        setFormValues({
            brand: '',
            name: '',
            type: '',
            strength: '',
            price: '',
            expiry_date: '',
        });
        } catch (err) {
        console.error(err);
        }
    };
    return (
        <>
        <h2>Add a New Medicine</h2>
            <div>
                <label htmlFor="brand">Brand:</label>
                <input type="text" id="brand" name="brand" value={formValues.brand} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="type">Type:</label>
                <input type="text" id="type" name="type" value={formValues.type} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="strength">Strength:</label>
                <input type="text" id="strength" name="strength" value={formValues.strength} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" value={formValues.price} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="expiry_date">Expiry Date:</label>
                <input type="date" id="expiry_date" name="expiry_date" value={formValues.expiry_date} onChange={handleInputChange} />
            </div>
            <button onClick={handleFormSubmit} type="submit">Add Medicine</button>
        </>
    )
}
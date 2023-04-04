import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function MedicineUpdateForm({BASE_URL}) {
    const { id } = useParams();
    const [medicine, setMedicine] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const fetchMedicine = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/${id}`);
                const medicine = await response.data;
                console.log(medicine.expiry_date.slice(0, 10));
                setMedicine(medicine);
            } catch (err) {
                console.log(err);
        }}
        fetchMedicine();
    }, [id]);

    const handleInputChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setMedicine({...medicine, [key]:value})
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, medicine, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            setMedicine(response.data);
            navigate('/medicine');
        } catch (err) {
        console.error(err);
        }
    }

    return (
    <>
        <fieldset>
        <legend>Update Medicine</legend>
            <div>
                <label htmlFor="brand">Brand:</label>
                <input type="text" id="brand" name="brand" value={medicine.brand} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={medicine.name}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="type">Type:</label>
                <input type="text" id="type" name="type" value={medicine.type} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="strength">Strength:</label>
                <input type="text" id="strength" name="strength" value={medicine.strength} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="country">Country:</label>
                <input type="text" id="country" name="country" value={medicine.country} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" value={medicine.price} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="expiry_date">Expiry Date:</label>
                <input type="date" id="expiry_date" name="expiry_date" value={medicine.expiry_date ? medicine.expiry_date.slice(0, 10) : ''} onChange={handleInputChange} />
            </div>
            <button onClick={handleFormSubmit} type="submit">Update Medicine</button>
            </fieldset>
        </>
    )
}
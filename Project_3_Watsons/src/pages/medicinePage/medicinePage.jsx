import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [formValues, setFormValues] = useState({
    brand: '',
    name: '',
    type: '',
    quantity: '',
    price: '',
    expiry_date: '',
  });

  // Fetch all medicines on component mount
  useEffect(() => {
    async function fetchMedicines() {
      try {
        const response = await axios.get(`${API_BASE_URL}/medicines`);
        setMedicines(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMedicines();
  }, []);

  // Handle form input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  // Handle form submission for creating a new medicine
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/medicines`, formValues);
      setMedicines((prevMedicines) => [...prevMedicines, response.data]);
      setFormValues({
        brand: '',
        name: '',
        type: '',
        quantity: '',
        price: '',
        expiry_date: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Handle click event for deleting a medicine
  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/medicines/${id}`);
      setMedicines((prevMedicines) => prevMedicines.filter((m) => m._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Medicine List</h2>
      {medicines.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Brand</th>
              <th>Name</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Expiry Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine._id}>
                <td>{medicine.brand}</td>
                <td>{medicine.name}</td>
                <td>{medicine.type}</td>
                <td>{medicine.quantity}</td>
                <td>{medicine.price}</td>
                <td>{new Date(medicine.expiry_date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDeleteClick(medicine._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No medicines found.</p>
      )}
      <h2>Add a New Medicine</h2>
      <form onSubmit={handleFormSubmit}>
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
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" name="quantity" value={formValues.quantity} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" value={formValues.price} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="expiry_date">Expiry Date:</label>
          <input type="date" id="expiry_date" name="expiry_date" value={formValues.expiry_date} onChange={handleInputChange} />
        </div>
        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
};

export default MedicineList;

import { useState, useEffect, useRef } from 'react';
import axios from "axios";
const BASE_URL_STOCK = 'http://localhost:3000/api/stock';


export default function StockPage() {
    const [medicines, setMedicines] = useState([]);
    const [stock, setStock] = useState({});

    const handleInputChange = (event, medicineId) => {
            const newQty = event.target.value === "" ? "" : parseInt(event.target.value);
            setStock((prevStock) => {
                const newStock = { ...prevStock };
                newStock[medicineId] = {
                ...prevStock[medicineId],
                quantity: isNaN(newQty) || newQty < 0 ? 0 : newQty,
                };
                return newStock;
            });
    };

    const handleUpdateStock = async (event, req, res) => {
        event.preventDefault();
        try {
            medicines.map( async (medicine) => {
                const originalQty = medicine.quantity;
                const newQty = stock[medicine._id]?.quantity;
                if (newQty !== undefined && newQty !== originalQty) {
                    await axios.put(`${BASE_URL_STOCK}/${medicine._id}/updatestock`, { quantity: newQty})
                };

            })
        } catch (err) {
            res.send(err.message);
        }
    }

    useEffect(function() {
        async function getAllStocks() {
            try {
                const response = await axios.get(`${BASE_URL_STOCK}`);
                setMedicines(response.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        getAllStocks();
    }, []);

    return (
        <div>
            <h1>Stock Page</h1>
            {medicines.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    <button onClick={handleUpdateStock}>Update Stock</button>
                    <table >
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Country</th>
                            <th>Strength</th>
                            <th>Store Location</th>
                            <th>Price($)</th>
                            <th>Quantity</th>

                            </tr>
                        </thead>
                        <tbody>
                            {medicines.map((medicine) => (
                            <tr key={medicine._id}>
                                <td>{medicine.medicine.name}</td>
                                <td>{medicine.medicine.brand}</td>
                                <td>{medicine.medicine.country}</td>
                                <td>{medicine.medicine.strength}</td>
                                <td>{medicine.location.storeName}</td>
                                <td>{medicine.medicine.price}</td>
                                <td><input type="number" name="quantity" value={stock[medicine._id]?.quantity || medicine.quantity} onChange = {(event) => handleInputChange(event, medicine._id)} /></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </ul>
            )}
        </div>
    )
}
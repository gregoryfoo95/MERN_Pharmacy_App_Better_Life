import { useState, useEffect, useRef } from 'react';
import { medicinesAPI } from "../../../utils/medicines-api";
import OrderDetails from "./OrderDetails";
//import Order from "../../../models/orderModel";
import axios from "axios";
const BASE_URL_MED = 'http://localhost:3000/api/medicine';

export default function NewOrderPage() {
    const [cart, setCart] = useState({ lineItems: []});
    const [medicines, setMedicines] = useState([]);

    useEffect(function() {
        async function getMedicines() {
            try {
                const response = await axios.get(`${BASE_URL_MED}`);
                console.log(response);
                setMedicines(response.data);
            } catch (error) {
                console.log(error.message);
            }
        }
       /*  async function getCart() {
            try {
                // Call the static method 'getCart' on the Order model to get the user's cart
                const cart = await Order.getCart(userId);
                setCart(cart);
            } catch (error) {
                console.log(error.message);
            }
        } */
        getMedicines();
        /* getCart(); */
    }, []);

    

    async function handleAddToCart(medicine) {
    
        try {
            const existingItemIndex = cart.lineItems.findIndex(item => item.medicine._id === medicine._id);
            if (existingItemIndex !== -1) {
                cart.lineItems[existingItemIndex].qty += 1;
                cart.lineItems[existingItemIndex].extPrice = cart.lineItems[existingItemIndex].qty * cart.lineItems[existingItemIndex].medicine.price;
            } else {
                const newLineItem = {
                    medicine: medicine,
                    qty: 1,
                    extPrice: medicine.price
                    };
                cart.lineItems.push(newLineItem);
            }
            setCart({...cart});
        } catch (err) {
            console.log(err.message);
            }
        }

    return (
        <div>
            <h1>NewOrderPage</h1>
            {medicines.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    <table >
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price($)</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicines.map((medicine) => (
                            <tr key={medicine._id}>
                                <td>{medicine.name}</td>
                                <td>{medicine.brand}</td>
                                <td>{medicine.price}</td>
                                <td><button onClick={()=> handleAddToCart(medicine)}>Add to cart</button></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </ul>
            )}
            <OrderDetails cart={cart}/>
        </div>
    );
}

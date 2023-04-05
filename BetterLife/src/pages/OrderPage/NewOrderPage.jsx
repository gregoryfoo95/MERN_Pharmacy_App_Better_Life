import { useState, useEffect, useRef } from 'react';
import OrderDetails from "./OrderDetails";
import axios from "axios";
const BASE_URL_STOCK = 'http://localhost:3000/api/stock';

export default function NewOrderPage() {
    const [cart, setCart] = useState({ lineItems: [], totalPrice: 0 });
    const [stocks, setStocks] = useState([]);
  
    useEffect(function () {
      async function getAllStock() {
        try {
          const response = await axios.get(`${BASE_URL_STOCK}`);
          console.log(response);
          setStocks(response.data);
        } catch (error) {
          console.log(error.message);
        }
      }
      getAllStock();
    }, []);
  
    useEffect(() => {
      const totalPrice = cart.lineItems.reduce(
        (total, item) => total + item.extPrice,
        0
      );
      setCart((prevCart) => ({ ...prevCart, totalPrice: totalPrice }));
    }, [cart.lineItems]);
    

    async function handleAddToCart(stock) {
        try {
          const medicine = stock.medicine;
          const existingItemIndex = cart.lineItems.findIndex(item => item.medicine._id === medicine._id);
          let newCart = { ...cart };
      
          if (existingItemIndex !== -1) {
            const updatedLineItem = {
              ...newCart.lineItems[existingItemIndex],
              qty: newCart.lineItems[existingItemIndex].qty + 1,
              extPrice: (newCart.lineItems[existingItemIndex].qty + 1) * newCart.lineItems[existingItemIndex].medicine.price,
            };
            newCart.lineItems[existingItemIndex] = updatedLineItem;
          } else {
            const newLineItem = {
              medicine: medicine,
              qty: 1,
              extPrice: medicine.price * 1, // multiply the medicine's price by its quantity (which is 1 in this case)
            };
            newCart.lineItems.push(newLineItem);
          }
          setCart(newCart);
        } catch (err) {
          console.log(err.message);
        }
      }
      

    return (
        <div>
            <h1>NewOrderPage</h1>
            {stocks.length === 0 ? (
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
                            {stocks.map((stock) => (
                            <tr key={stock._id}>
                                <td>{stock.medicine.name}</td>
                                <td>{stock.medicine.brand}</td>
                                <td>{stock.medicine.price}</td>
                                <td><button onClick={()=> handleAddToCart(stock)}>Add to cart</button></td>
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

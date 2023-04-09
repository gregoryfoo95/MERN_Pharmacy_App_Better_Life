import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BarChart from "../../components/Chart/BarChart"
import axios from "axios";
const BASE_URL_STOCK = "http://localhost:3000/api/stock"
export default function StockIllustrationPage() {
  const [stock, setStocks] = useState([]);
    
  useEffect(() => {
    async function getAllStocks() {
    try {
        const response = await axios.get(`${BASE_URL_STOCK}`);
        console.log(response.data);
        setStocks(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getAllStocks();
  }, []);


  return (
    <>
        <h1 style={{ fontFamily: 'Montserrat' }}>Overview of Stocks across Singapore</h1>
        <BarChart data = { stock }/>
    </>
  );
}







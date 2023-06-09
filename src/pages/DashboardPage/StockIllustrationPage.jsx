import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BarChart from "../../components/Chart/BarChart"
import axios from "axios";

export default function StockIllustrationPage() {
  const [stock, setStocks] = useState([]);
    
  useEffect(() => {
    async function getAllStocks() {
    try {
        const response = await axios.get(`/api/stock`);
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







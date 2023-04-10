import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import StockSearchForm from './StockSearchForm';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
const BASE_URL_STOCK = 'http://localhost:3000/api/stock';
import './StockPage.css';

export default function StockPage() {
  const [medicines, setMedicines] = useState([]);
  const [stock, setStock] = useState({});

  const handleInputChange = (event, medicineId) => {
    const newQty =
      event.target.value === '' ? '' : parseInt(event.target.value);
    setStock(prevStock => {
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
      medicines.map(async medicine => {
        const originalQty = medicine.quantity;
        const newQty = stock[medicine._id]?.quantity;
        if (newQty !== undefined && newQty !== originalQty) {
          await axios.put(`/api/stock/${medicine._id}/updatestock`, {
            quantity: newQty,
          });
        }
      });
    } catch (err) {
      res.send(err.message);
    }
  };

  useEffect(function () {
    async function getAllStocks() {
      try {
        const response = await axios.get(`/api/stock`);
        setMedicines(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getAllStocks();
  }, []);

  return (
    <Container>
      {/* <h1
        className="text-center" // Add this line
        style={{ color: '#3A1730', paddingTop: '20px', paddingBottom: '20px' }}>
        Stock Page
      </h1> */}
      {medicines.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div>
          <StockSearchForm setMedicines={setMedicines} />
          <Button
            onClick={handleUpdateStock}
            style={{ backgroundColor: '#00A0A0' }} // Add custom style here
            className="mb-3">
            Update Stock
          </Button>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Brand</th>
                <th>Country</th>
                <th>Type</th>
                <th>Strength</th>
                <th>Store Location</th>
                <th>Price($)</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map(medicine => (
                <tr key={medicine._id}>
                  <td>{medicine.medicine.name}</td>
                  <td>{medicine.medicine.brand}</td>
                  <td>{medicine.medicine.country}</td>
                  <td>{medicine.medicine.type}</td>
                  <td>{medicine.medicine.strength}</td>
                  <td>{medicine.location.storeName}</td>
                  <td>{medicine.medicine.price}</td>
                  <td>
                    <input
                      type="number"
                      name="quantity"
                      value={stock[medicine._id]?.quantity || medicine.quantity}
                      onChange={event => handleInputChange(event, medicine._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}

import { useState, useEffect } from 'react';
import axios from 'axios';
import MedicineCreateForm from "./MedicineCreateForm";
import MedicineList from "./MedicineList";

const BASE_URL = 'http://localhost:3000';

const MedicinePage = () => {
  const [medicines, setMedicines] = useState([]);


  // Fetch all medicines on component mount
  useEffect(() => {
    async function fetchMedicines() {
      try {
        const response = await axios.get(`${BASE_URL}/medicine`);
        setMedicines(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMedicines();
  }, []);

  


  return (
    <div>
      <MedicineCreateForm setMedicines={ setMedicines } BASE_URL={BASE_URL}/>
      <h2>Medicine List</h2>
      {medicines.length > 0 ? (
        <MedicineList medicines={ medicines } setMedicines={ setMedicines } BASE_URL={BASE_URL} />
      ) : (
        <p>No medicines found.</p>
      )}
      
    </div>
  );
};

export default MedicinePage;

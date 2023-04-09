import { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';
import MedicineCreateForm from './MedicineCreateForm';
import MedicineList from './MedicineList';
import MedicineSearch from './MedicineSearch';
const BASE_URL = 'http://localhost:3000/api/medicine';

const MedicinePage = () => {
  const [medicines, setMedicines] = useState([]);

  // Fetch all medicines on component mount
  useEffect(() => {
    async function fetchMedicines() {
      try {
        const response = await axios.get(`${BASE_URL}`);
        setMedicines(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMedicines();
  }, []);

  return (
    <div>
      <Tabs
        defaultActiveKey="medicinepage"
        id="justify-tab-example"
        className="mb-3"
        justify>
        <Tab eventKey="medicineCreate" title="Create Medicine">
          <MedicineCreateForm setMedicines={setMedicines} BASE_URL={BASE_URL} />
        </Tab>
        <Tab eventKey="medicineSearch" title="Search Medicine">
          <MedicineSearch setMedicines={setMedicines} BASE_URL={BASE_URL} />
          <h1 style={{ paddingTop: '20px', paddingBottom: '30px' }}>
            Medicine List
          </h1>
          {medicines.length > 0 ? (
            <MedicineList
              medicines={medicines}
              setMedicines={setMedicines}
              BASE_URL={BASE_URL}
            />
          ) : (
            <p>No medicines found.</p>
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

export default MedicinePage;

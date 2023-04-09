import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Form, FormGroup, Button } from 'react-bootstrap';

export default function StockSearchForm({ setMedicines, BASE_URL }) {
  const [medicineOptions, setMedicineOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    brand: '',
    name: '',
    strength: '',
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSearchQuery(prevQuery => ({ ...prevQuery, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://pharmacy-app.onrender.com`, {
        params: searchQuery,
      });
      setMedicines(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchMedicineOptions = async () => {
      const response = await axios.get('https://pharmacy-app.onrender.com/api/medicine', {
        params: { name: searchQuery.name },
      });
      setMedicineOptions(response.data);
    };
    fetchMedicineOptions();
  }, [searchQuery.name]);

  return (
    <fieldset>
      <h1 style={{ textAlign: 'center', color: '#3A1730' }}>
        Search Bar for Medicine Database
      </h1>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={searchQuery.name}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>Brand:</Form.Label>
          <Form.Control
            as="select"
            name="brand"
            value={searchQuery.brand}
            onChange={handleInputChange}>
            <option value="">Any</option>
            {[...new Set(medicineOptions.map(medicine => medicine.brand))].map(
              brand => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              )
            )}
          </Form.Control>
        </FormGroup>

        <FormGroup>
          <Form.Label>Strength:</Form.Label>
          <Form.Control
            as="select"
            name="strength"
            value={searchQuery.strength}
            onChange={handleInputChange}>
            <option value="">Any</option>
            {[
              ...new Set(medicineOptions.map(medicine => medicine.strength)),
            ].map(strength => (
              <option key={strength} value={strength}>
                {strength}
              </option>
            ))}
          </Form.Control>
        </FormGroup>

        <Button
          type="submit"
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#00A0A0',
            width: '120px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
            marginTop: '20px',
          }}>
          Search
        </Button>
      </Form>
    </fieldset>
  );
}

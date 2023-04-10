import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './MedicineUpdateForm.css';

export default function MedicineUpdateForm({BASE_URL}) {
    const { id } = useParams();
    const [medicine, setMedicine] = useState({});
    const navigate = useNavigate();


    const handleInputChange = event => {
        const { name, value } = event.target;
        setMedicine({...medicine, [name]: value});
    };
    
    useEffect(() => {
        const fetchMedicine = async () => {
            try {
                const response = await axios.get(`/api/medicine/${id}`);
                const medicine = await response.data;
                setMedicine(medicine);
                console.log(medicine.price);
            } catch (err) {
                console.log(err);
        }}
        fetchMedicine();
    }, [id]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().default(medicine.name).required("Name is required"),
        brand: Yup.string().default(medicine.brand).required("Brand is required"),
        type: Yup.string().default(medicine.type).required("Type is required"),
        strength: Yup.string().default(medicine.strength).required("Strength is required"),
        country: Yup.string().default(medicine.country).required("Country is required"),
        routeOfAdmin: Yup.string().default(medicine.routeOfAdmin).required("Route of Administration is required"),
        price: Yup.number().default(Number(medicine.price))
            .typeError("Price must be a number")
            .positive("Price must be a positive number")
            .required("Price is required")
            .test('is-decimal', 'Price cannot have more than 2 decimal places', (value) => {
                if(value){
                    const decimalCount = value.toString().split('.')[1]?.length;
                    return decimalCount ? decimalCount <= 2 : true;
                }
                return true;
            }),
        expiry_date: Yup.date().default(new Date(medicine.expiry_date))
            .required("Expiry Date is required")
    });
  

  const handleFormSubmit = async (e, values) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`/api/medicine/${id}`, medicine, {
        headers: {
          'Content-Type': 'application/json',
        },
        Authorization: `Bearer ${token}`,
      });
      if (response.status === 200) {
        console.log(response.data);
        setMedicine(response.data);
        navigate('/medicine');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <fieldset>
      <h1>Update Medicine</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Formik
          initialValues={medicine}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}>
          {({ isSubmitting, isValidating, isValid }) => (
            <Form>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="name">Name:</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  value={medicine.name || ''}
                  onChange={handleInputChange}
                />
                <ErrorMessage name="name" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="brand">Brand:</label>
                <Field
                  type="text"
                  id="brand"
                  name="brand"
                  value={medicine.brand || ''}
                  onChange={handleInputChange}
                />
                <ErrorMessage name="brand" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="type">Type:</label>
                <Field
                  type="text"
                  id="type"
                  name="type"
                  value={medicine.type || ''}
                  onChange={handleInputChange}
                />
                <ErrorMessage name="type" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="strength">Strength:</label>
                <Field
                  type="text"
                  id="strength"
                  name="strength"
                  value={medicine.strength || ''}
                  onChange={handleInputChange}
                />
                <ErrorMessage name="strength" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="country">Country:</label>
                <Field
                  type="text"
                  id="country"
                  name="country"
                  value={medicine.country || ''}
                  onChange={handleInputChange}
                />
                <ErrorMessage name="country" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="routeOfAdmin">Route of Administration:</label>
                <Field
                  type="text"
                  id="routeOfAdmin"
                  name="routeOfAdmin"
                  value={medicine.routeOfAdmin || ''}
                  onChange={handleInputChange}
                />
                <ErrorMessage name="routeOfAdmin" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="price">Price:</label>
                <Field 
                    type="number" 
                    id="price" 
                    name="price" 
                    step="0.01"
                    min="0"
                    value={medicine.price || ""} 
                    onChange={handleInputChange}
                />
                <ErrorMessage name="price"/>
            </div>
            <div>
                <label htmlFor="expiry_date">Expiry Date:</label>
                <Field
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  id="expiry_date"
                  name="expiry_date"
                  value={
                    medicine.expiry_date
                      ? medicine.expiry_date.slice(0, 10)
                      : ''
                  }
                  onChange={handleInputChange}
                />
                <ErrorMessage name="expiry_date" />
              </div>
              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <Button
                  onClick={handleFormSubmit}
                  type="submit"
                  disabled={isSubmitting || isValidating || !isValid}
                  style={{ backgroundColor: '#00A0A0' }}>
                  Update Medicine
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </fieldset>
  );
}

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import React from 'react';
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Container,
} from 'react-bootstrap';

export default function MedicineUpdateForm({ BASE_URL }) {
  const { id } = useParams();
  const [medicine, setMedicine] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        const medicine = await response.data;
        setMedicine(medicine);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMedicine();
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().default(medicine.name).required('Name is required'),
    brand: Yup.string().default(medicine.brand).required('Brand is required'),
    type: Yup.string().default(medicine.type).required('Type is required'),
    strength: Yup.string()
      .default(medicine.strength)
      .required('Strength is required'),
    country: Yup.string()
      .default(medicine.country)
      .required('Country is required'),
    routeOfAdmin: Yup.string()
      .default(medicine.routeOfAdmin)
      .required('Route of Administration is required'),
    price: Yup.number()
      .default(medicine.price)
      .typeError('Price must be a number')
      .positive('Price must be a positive number')
      .required('Price is required'),
    expiry_date: Yup.date()
      .default(medicine.expiry_date)
      .required('Expiry Date is required'),
  });

  const handleInputChange = e => {
    const key = e.target.name;
    const value = e.target.value;
    setMedicine({ ...medicine, [key]: value });
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, values, {
        headers: {
          'Content-Type': 'application/json',
        },
        Authorization: `Bearer ${token}`,
      });
      if (response.status === 200) {
        setMedicine(response.data);
        navigate('/medicine');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <fieldset>
        <h1>Update Medicine</h1>
        <Formik
          initialValues={medicine}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}>
          {({ isSubmitting, isValidating, isValid }) => (
            <Form>
              <div>
                <label htmlFor="name">Name:</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  value={medicine.name}
                  onChange={handleInputChange}
                />
                <ErrorMessage name="name" />
              </div>
              <div>
                <label htmlFor="brand">Brand:</label>
                <Field
                  type="text"
                  id="brand"
                  name="brand"
                  value={medicine.brand}
                  onChange={handleInputChange}
                />
                <ErrorMessage name="brand" />
              </div>

              <div>
                <label htmlFor="type">Type:</label>
                <Field
                  type="text"
                  id="type"
                  name="type"
                  value={medicine.type}
                  onChange={handleInputChange}
                />
                <ErrorMessage name="type" />
              </div>
              <div>
                <label htmlFor="strength">Strength:</label>
                <Field
                  type="text"
                  id="strength"
                  name="strength"
                  value={medicine.strength}
                  onChange={handleInputChange}
                />
                <ErrorMessage name="strength" />
              </div>
              <div>
                <label htmlFor="country">Country:</label>
                <Field
                  type="text"
                  id="country"
                  name="country"
                  value={medicine.country}
                  onChange={handleInputChange}
                />
                <ErrorMessage name="country" />
              </div>
              <div>
                <label htmlFor="routeOfAdmin">Route of Administration:</label>
                <Field
                  type="text"
                  id="routeOfAdmin"
                  name="routeOfAdmin"
                  value={medicine.routeOfAdmin}
                  onChange={handleInputChange}
                />
                <ErrorMessage name="routeOfAdmin" />
              </div>
              <div>
                <label htmlFor="price">Price:</label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  value={medicine.price}
                  onChange={handleInputChange}
                />
                <ErrorMessage name="price" />
              </div>
              <div>
                <label htmlFor="expiry_date">Expiry Date:</label>
                <Field
                  type="date"
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
              <Button
                onClick={handleFormSubmit}
                type="submit"
                disabled={isSubmitting || isValidating || !isValid}
                style={{ backgroundColor: '#00A0A0', marginTop: '20px' }} // Add this line
              >
                Update Medicine
              </Button>
            </Form>
          )}
        </Formik>
      </fieldset>
    </>
  );
}

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default function MedicineCreateForm({ setMedicines, BASE_URL }) {
  const initialValues = {
    name: '',
    brand: '',
    type: '',
    strength: '',
    country: '',
    routeOfAdmin: '',
    price: '',
    expiry_date: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    brand: Yup.string().required('Brand is required'),
    type: Yup.string().required('Type is required'),
    strength: Yup.string().required('Strength is required'),
    country: Yup.string().required('Country is required'),
    routeOfAdmin: Yup.string().required('Route of Administration is required'),
    price: Yup.number()
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
    expiry_date: Yup.date().required("Expiry Date is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    // values.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const responseMedicine = await axios.post(`${BASE_URL}`, values, {
        headers: {
          'Content-Type': 'application/json',
        },
        Authorization: `Bearer ${token}`,
      });

      const responseLocation = await axios.get(`/api/map`, {
        headers: {
          'Content-Type': 'application/json',
        },
        Authorization: `Bearer ${token}`,
      });

      const stockItems = responseLocation.data.data.map(location => ({
        medicine: responseMedicine.data._id,
        location: location._id,
        quantity: 0,
      }));

      const responseStock = await axios.post(`/api/stock`, stockItems, {
        headers: {
          'Content-Type': 'application/json',
        },
        Authorization: `Bearer ${token}`,
      });

      console.log(responseStock);
      setMedicines(prevMedicines => [...prevMedicines, responseMedicine.data]);
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <fieldset>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting, isValidating, isValid }) => (
            <Form className="container" controlId="medicine-form">
              <div className="d-flex justify-content-center align-items-center">
                <h1
                  style={{
                    color: '#3A1730',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                  }}>
                  Add Medicine to Medicine Database
                </h1>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                <div style={{ maxWidth: '600px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}>
                    <label
                      htmlFor="name"
                      style={{
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        minWidth: '70px',
                      }}>
                      Name:
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      style={{ paddingRight: '10px', width: '100%' }}
                    />
                    <ErrorMessage name="name" />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}>
                    <label
                      htmlFor="brand"
                      style={{
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        minWidth: '70px',
                      }}>
                      Brand:
                    </label>
                    <Field
                      type="text"
                      id="brand"
                      name="brand"
                      style={{ paddingLeft: '10px', width: '100%' }}
                    />
                    <ErrorMessage name="brand" />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}>
                    <label
                      htmlFor="type"
                      style={{
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        minWidth: '70px',
                      }}>
                      Type:
                    </label>
                    <Field
                      type="text"
                      id="type"
                      name="type"
                      style={{ paddingLeft: '10px', width: '100%' }}
                    />
                    <ErrorMessage name="type" />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}>
                    <label
                      htmlFor="strength"
                      style={{
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        minWidth: '70px',
                      }}>
                      Strength:
                    </label>
                    <Field
                      type="text"
                      id="strength"
                      name="strength"
                      style={{ paddingLeft: '10px', width: '100%' }}
                    />
                    <ErrorMessage name="strength" />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}>
                    <label
                      htmlFor="country"
                      style={{
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        minWidth: '70px',
                      }}>
                      Country:
                    </label>
                    <Field
                      type="text"
                      id="country"
                      name="country"
                      style={{ paddingLeft: '10px', width: '100%' }}
                    />
                    <ErrorMessage name="country" />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}>
                    <label
                      htmlFor="routeOfAdmin"
                      style={{
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        minWidth: '70px',
                      }}>
                      Route of Administration:
                    </label>
                    <Field
                      type="text"
                      id="routeOfAdmin"
                      name="routeOfAdmin"
                      style={{ paddingLeft: '10px', width: '100%' }}
                    />
                    <ErrorMessage name="routeOfAdmin" />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}>
                    <label
                      htmlFor="price"
                      style={{ paddingLeft: '10px', width: '100px' }}>
                      Price ($):
                    </label>
                    <Field
                      type="number"
                      id="price"
                      name="price"
                      placeholder="No negative amount please"
                      step="0.01"
                      min="0"
                      title="Price must be a positive number"
                      style={{ paddingLeft: '10px', width: '100%' }}
                    />
                    <ErrorMessage name="price" />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}>
                    <label
                      htmlFor="expiry_date"
                      style={{ paddingLeft: '10px', width: '100px' }}>
                      Expiry Date:
                    </label>
                    <Field
                      type="date"
                      id="expiry_date"
                      name="expiry_date"
                      style={{ paddingLeft: '10px', width: '100%' }}
                    />
                    <ErrorMessage name="expiry_date" />
                  </div>
                  <Button
                    onSubmit={handleSubmit}
                    type="submit"
                    disabled={isSubmitting || isValidating || !isValid}
                    style={{ marginTop: '10px', backgroundColor: '#00A0A0' }}>
                    Add Medicine
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </fieldset>
    </>
  );
}

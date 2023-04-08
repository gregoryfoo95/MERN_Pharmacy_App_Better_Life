import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './MedicineCreateForm.css';

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
      .typeError('Price must be a number')
      .positive('Price must be a positive number')
      .required('Price is required'),
    expiry_date: Yup.date().required('Expiry Date is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`${BASE_URL}`, values, {
        headers: {
          'Content-Type': 'application/json',
        },
        Authorization: `Bearer ${token}`,
      });
      setMedicines(prevMedicines => [...prevMedicines, response.data]);
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <fieldset>
        {/* <legend style={{ color: '#3A1730' }}>
          Add Medicine to Medicine Database
        </legend> */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting, isValidating, isValid }) => (
            <Form
              className="container"
              controlId="medicine-form"
              onSubmit={handleSubmit}>
              <div className="d-flex justify-content-center align-items-center">
                <h1 style={{ color: '#3A1730' }}>
                  Add Medicine to Medicine Database
                </h1>
              </div>

              <div style={{ maxWidth: '500px', minHeight: '10px' }}>
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
                    htmlFor="brand"
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
                  type="submit"
                  disabled={isSubmitting || isValidating || !isValid}
                  style={{ marginTop: '20px', backgroundColor: '#00A0A0' }}>
                  Add Medicine
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </fieldset>
    </>
  );
}

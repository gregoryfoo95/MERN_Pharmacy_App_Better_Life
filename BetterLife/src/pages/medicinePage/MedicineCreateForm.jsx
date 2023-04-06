import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function MedicineCreateForm({ setMedicines, BASE_URL }) {
  const initialValues = {
    name: "",
    brand: "",
    type: "",
    strength: "",
    country: "",
    routeOfAdmin: "",
    price: "",
    expiry_date: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    brand: Yup.string().required("Brand is required"),
    type: Yup.string().required("Type is required"),
    strength: Yup.string().required("Strength is required"),
    country: Yup.string().required("Country is required"),
    routeOfAdmin: Yup.string().required("Route of Administration is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be a positive number")
      .required("Price is required"),
    expiry_date: Yup.date().required("Expiry Date is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${BASE_URL}`, values, {
        headers: {
          "Content-Type": "application/json",
        },
        Authorization: `Bearer ${token}`,
      });
      setMedicines((prevMedicines) => [...prevMedicines, response.data]);
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <fieldset>
      <legend>Add Medicine to Medicine Database</legend>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValidating, isValid }) => (
          <Form>
            <div>
              <label htmlFor="name">Name:</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" />
            </div>
            <div>
              <label htmlFor="brand">Brand:</label>
              <Field type="text" id="brand" name="brand" />
              <ErrorMessage name="brand" />
            </div>

            <div>
              <label htmlFor="type">Type:</label>
              <Field type="text" id="type" name="type" />
              <ErrorMessage name="type" />
            </div>
            <div>
              <label htmlFor="strength">Strength:</label>
              <Field type="text" id="strength" name="strength" />
              <ErrorMessage name="strength" />
            </div>
            <div>
              <label htmlFor="country">Country:</label>
              <Field type="text" id="country" name="country" />
              <ErrorMessage name="country" />
            </div>
            <div>
              <label htmlFor="routeOfAdmin">Route of Administration:</label>
              <Field type="text" id="routeOfAdmin" name="routeOfAdmin" />
              <ErrorMessage name="routeOfAdmin" />
            </div>
            <div>
              <label htmlFor="price">Price ($):</label>
              <Field
                type="number"
                id="price"
                name="price"
                placeholder="No negative amount please"
                step="0.01"
                min="0"
                title="Price must be a positive number"
              />
              <ErrorMessage name="price" />
            </div>
            <div>
              <label htmlFor="expiry_date">Expiry Date:</label>
              <Field type="date" id="expiry_date" name="expiry_date" />
              <ErrorMessage name="expiry_date" />
            </div>
            <button type="submit" onSubmit={handleSubmit} disabled={isSubmitting || isValidating || !isValid}>Add Medicine</button>
            </Form>
        )}
        </Formik>
        </fieldset>
        </>
  )}

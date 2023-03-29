import React, { useState } from 'react';
import './InventoryPage.css';

const InventoryPage = () => {
  // Set up state for the inventory
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: 'Paracetamol',
      quantity: 20,
      price: 1.5,
    },
    {
      id: 2,
      name: 'Ibuprofen',
      quantity: 10,
      price: 2.0,
    },
    {
      id: 3,
      name: 'Aspirin',
      quantity: 30,
      price: 1.0,
    },
  ]);

  // Set up state for the new product form
  const [newProduct, setNewProduct] = useState({
    id: null,
    name: '',
    quantity: 0,
    price: 0,
  });

  // Update the new product state when form inputs change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Add a new product to the inventory
  const addProduct = (e) => {
    e.preventDefault();
    setInventory([...inventory, newProduct]);
    setNewProduct({
      id: null,
      name: '',
      quantity: 0,
      price: 0,
    });
  };

  // Delete a product from the inventory
  const deleteProduct = (id) => {
    setInventory(inventory.filter((product) => product.id !== id));
  };

  return (
    <div className="inventory-page">
      <h1>Pharmacy Inventory</h1>

      {/* Display the inventory */}
      <table className="inventory-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add a new product form */}
      <form onSubmit={addProduct}>
        <h2>Add a New Product</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={newProduct.quantity}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default InventoryPage;

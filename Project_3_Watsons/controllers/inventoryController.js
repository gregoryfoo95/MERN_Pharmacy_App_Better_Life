const express = require('express');
const router = express.Router();

// Define inventory data
let inventory = [
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
];

// GET all products
router.get('/', (req, res) => {
  res.json(inventory);
});

// GET a product by id
router.get('/:id', (req, res) => {
  const product = inventory.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');
  res.json(product);
});

// POST a new product
router.post('/', (req, res) => {
  const product = {
    id: inventory.length + 1,
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
  };
  inventory.push(product);
  res.json(product);
});

// PUT (update) a product by id
router.put('/:id', (req, res) => {
  const product = inventory.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');

  product.name = req.body.name;
  product.quantity = req.body.quantity;
  product.price = req.body.price;

  res.json(product);
});

// DELETE a product by id
router.delete('/:id', (req, res) => {
  const productIndex = inventory.findIndex((p) => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).send('Product not found');

  const deletedProduct = inventory.splice(productIndex, 1)[0];
  res.json(deletedProduct);
});

module.exports = router;

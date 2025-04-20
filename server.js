// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/admin', express.static('admin'));

const filePath = path.join(__dirname, 'data', 'laptops.json');

// Get all laptops
app.get('/api/laptops', (req, res) => {
  const data = fs.readFileSync(filePath);
  res.json(JSON.parse(data));
});

// Add a new laptop
app.post('/api/laptops', (req, res) => {
  const newLaptop = req.body;
  const data = JSON.parse(fs.readFileSync(filePath));
  newLaptop.id = Date.now();
  data.push(newLaptop);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.status(201).json(newLaptop);
});

// Delete laptop by ID
app.delete('/api/laptops/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let data = JSON.parse(fs.readFileSync(filePath));
  data = data.filter(laptop => laptop.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.status(200).json({ message: 'Laptop deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();

// Middleware to parse JSON (Crucial for Postman testing)
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));

// Basic health check route
app.get('/', (req, res) => {
  res.send('Book Catalog API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
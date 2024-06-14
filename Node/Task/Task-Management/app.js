const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use(userRoutes);


app.listen(5000);
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require("./routes/taskRoutes");
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use(userRoutes);
app.use(taskRoutes);

app.listen(5000);
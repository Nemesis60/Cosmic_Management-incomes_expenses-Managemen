const express = require('express');
const dbConnection = require('../config/dbConnection');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// ROUTES IMPORT
const userRoutes = require('../routes/v1/userRoutes');
const feedBacks = require('../routes/v1/feedBackRoutes');
const authRoutes = require('../routes/v1/authRoutes');
const expenseRoutes = require('../routes/v1/expenseRoutes');
const incomeRoutes = require('../routes/v1/incomeRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
require('dotenv').config();

// USING ROUTES
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/feedbacks', feedBacks);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/expenses', expenseRoutes);
app.use('/api/v1/incomes', incomeRoutes);

// USING CONNECTION DB FUNCTION IMPORTED
dbConnection();

// LISTENING EXPRESS SERVER ON THE PORT
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server Running on port ${port}`)
});
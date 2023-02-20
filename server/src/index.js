const express = require('express');
const dbConnection = require('../config/dbConnection');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// ROUTES IMPORT
const userRoutes = require('../routes/v1/userRoutes');
const authRoutes = require('../routes/v1/authRoutes');
const expenseRoutes = require('../routes/v1/expenseRoutes');
const incomeRoutes = require('../routes/v1/incomeRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
require('dotenv').config();

// USING ROUTES
app.use('/api/v1', userRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', expenseRoutes);
app.use('/api/v1', incomeRoutes);

app.post('/api/v1/logout', (req, res) => {
    res.cookie('my cookie', 'cooookie')
    res.send('Hello world')
})


// USING CONNECTION DB FUNCTION IMPORTED
dbConnection();

// LISTENING EXPRESS SERVER ON THE PORT
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server Running on port ${port}`)
});
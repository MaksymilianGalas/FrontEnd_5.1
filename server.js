import express from 'express';
import cors from 'cors';
import expenseRoutes from './routes/expenses.js';
import { errorHandler } from './middleware/errorHandler.js';
import { transformMiddleware } from './middleware/transformMiddleware.js';
const express = require('express');
const path = require('path');
const cors = require('cors');


const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(cors());
app.use(express.json());
app.use(transformMiddleware);

app.use('/api/expenses', expenseRoutes);
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

import { check, validationResult } from 'express-validator';
import express from 'express';
//import path from 'node:path';
import fs from 'fs';

const router = express.Router();

//const __filename = new URL(import.meta.url).pathname;
//const __dirname = path.dirname(__filename);


const DATA_FILE = 'C:/Users/makse/IdeaProjects/tracking-expenses/data/expenses.json';

console.log(DATA_FILE);

const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));


const validateExpense = [
    check('title').isString().isLength({ min: 3 }).withMessage('Tytuł musi mieć co najmniej 3 znaki'),
    check('amount').isFloat({ gt: 0 }).withMessage('Kwota musi być dodatnia'),
    check('category').isString().withMessage('Kategoria jest wymagana'),
    check('date').isISO8601().withMessage('Data jest wymagana i musi być prawidłowa'),
    check('description').optional().isString().isLength({ min: 5 }).withMessage('Opis musi mieć co najmniej 5 znaków'),
];

router.get('/', (req, res) => {
    const expenses = readData();
    res.json(expenses);
});

router.post('/', validateExpense, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newExpense = { ...req.body, id: Date.now() };
    const expenses = readData();
    expenses.push(newExpense);
    writeData(expenses);
    res.status(201).json(newExpense);
});

router.put('/:id', validateExpense, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const expenses = readData();
    const expenseIndex = expenses.findIndex((exp) => exp.id === Number(id));

    if (expenseIndex === -1) {
        return res.status(404).json({ error: 'Expense not found' });
    }

    expenses[expenseIndex] = { ...expenses[expenseIndex], ...req.body };
    writeData(expenses);
    res.json(expenses[expenseIndex]);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const expenses = readData();
    const filteredExpenses = expenses.filter((exp) => exp.id !== Number(id));

    if (expenses.length === filteredExpenses.length) {
        return res.status(404).json({ error: 'Expense not found' });
    }

    writeData(filteredExpenses);
    res.status(204).send();
});

export default router;

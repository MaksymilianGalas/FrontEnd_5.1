"use client";

import { useState, useEffect } from 'react';
import ExpenseList from '../components/ExpenseList';
import ExpenseDetails from '../components/ExpenseDetails';


export default function Home() {
    const [expenses, setExpenses] = useState([]);
    const [filter, setFilter] = useState('');
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [dateFilter, setDateFilter] = useState('');

    useEffect(() => {
        const savedExpenses = localStorage.getItem('expenses');
        if (savedExpenses) {
            setExpenses(JSON.parse(savedExpenses));
        } else {
            fetch('/data.json')
                .then((res) => res.json())
                .then((data) => {
                    setExpenses(data);
                    localStorage.setItem('expenses', JSON.stringify(data));
                });
        }
    }, []);

    const updateLocalStorage = (updatedExpenses) => {
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    };

    const handleDelete = (id) => {
        setExpenses((prevExpenses) => {
            const updatedExpenses = prevExpenses.filter((expense) => expense.id !== id);
            updateLocalStorage(updatedExpenses);
            return updatedExpenses;
        });
    };

    const handleShowDetails = (expense) => {
        setSelectedExpense(expense);
    };

    const handleCloseDetails = () => {
        setSelectedExpense(null);
    };

    const handleEditExpense = (updatedExpense) => {
        setExpenses((prevExpenses) => {
            const updatedExpenses = prevExpenses.map((expense) =>
                expense.id === updatedExpense.id ? updatedExpense : expense
            );
            updateLocalStorage(updatedExpenses);
            return updatedExpenses;
        });
        setSelectedExpense(null);
    };

    const filteredExpenses = expenses.filter((expense) => {
        const matchesCategory = filter ? expense.category === filter : true;
        const matchesDate = dateFilter ? expense.date === dateFilter : true;
        return matchesCategory && matchesDate;
    });
    return (

        <div>
            <h1>Śledzenie Wydatków</h1>

            <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                <option value="">Wszystkie kategorie</option>
                <option value="Jedzenie">Jedzenie</option>
                <option value="Rachunki">Rachunki</option>
                <option value="Rozrywka">Rozrywka</option>
            </select>
            <input
                type="date"
                onChange={(e) => setDateFilter(e.target.value)}
                value={dateFilter}
            />
            <ExpenseList
                expenses={filteredExpenses}
                onDelete={handleDelete}
                onShowDetails={handleShowDetails}
            />
            {selectedExpense && (
                <ExpenseDetails
                    expense={selectedExpense}
                    onClose={handleCloseDetails}
                    onEdit={handleEditExpense}
                />
            )}
        </div>
    );
}

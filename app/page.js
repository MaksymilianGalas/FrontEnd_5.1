"use client";

import React, { useLayoutEffect } from 'react';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseDetails from '../components/ExpenseDetails';
import { useGlobalContext } from '../context/GlobalContext';
import { useNotificationContext } from '../context/NotificationContext';


export default function Home() {
    const { expenses, addExpense, deleteExpense, showExpenseDetails, selectedExpense, setFilter, setDateFilter } =
        useGlobalContext();
    const { notifications, removeNotification } = useNotificationContext();

    useLayoutEffect(() => {
        if (notifications.length > 0) {
            const timeout = setTimeout(() => {
                removeNotification(0);
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, [notifications, removeNotification]);

    const handleAddExpense = (newExpense) => {
        addExpense(newExpense);


    };

    return (
        <div>
            <h1>Śledzenie Wydatków</h1>
            <AddExpenseForm onAdd={handleAddExpense} />
            <select onChange={(e) => setFilter(e.target.value)} defaultValue="">
                <option value="">Wszystkie kategorie</option>
                <option value="Jedzenie">Jedzenie</option>
                <option value="Rachunki">Rachunki</option>
                <option value="Rozrywka">Rozrywka</option>
            </select>
            <input type="date" onChange={(e) => setDateFilter(e.target.value)} />
            <ExpenseList expenses={expenses} onDelete={deleteExpense} onShowDetails={showExpenseDetails} />
            {selectedExpense && <ExpenseDetails />}
        </div>
    );
}

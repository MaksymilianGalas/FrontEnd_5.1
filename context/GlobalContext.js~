"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [filter, setFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [selectedExpense, setSelectedExpense] = useState(null);

    useEffect(() => {
        const savedExpenses = localStorage.getItem("expenses");
        if (savedExpenses) {
            setExpenses(JSON.parse(savedExpenses));
        } else {
            fetch("/data.json")
                .then((res) => res.json())
                .then((data) => {
                    setExpenses(data);
                    localStorage.setItem("expenses", JSON.stringify(data));
                });
        }
    }, []);

    const updateLocalStorage = (updatedExpenses) => {
        localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    };

    const addExpense = (newExpense) => {
        setExpenses((prevExpenses) => {
            const updatedExpenses = [...prevExpenses, newExpense];
            updateLocalStorage(updatedExpenses);
            return updatedExpenses;
        });
    };

    const deleteExpense = (id) => {
        setExpenses((prevExpenses) => {
            const updatedExpenses = prevExpenses.filter(
                (expense) => expense.id !== id
            );
            updateLocalStorage(updatedExpenses);
            return updatedExpenses;
        });
    };

    const editExpense = (updatedExpense) => {
        setExpenses((prevExpenses) => {
            const updatedExpenses = prevExpenses.map((expense) =>
                expense.id === updatedExpense.id ? updatedExpense : expense
            );
            updateLocalStorage(updatedExpenses);
            return updatedExpenses;
        });
    };

    const showExpenseDetails = (expense) => {
        setSelectedExpense(expense);
    };

    const closeExpenseDetails = () => {
        setSelectedExpense(null);
    };

    const filteredExpenses = expenses.filter((expense) => {
        const matchesCategory = filter ? expense.category === filter : true;
        const matchesDate = dateFilter ? expense.date === dateFilter : true;
        return matchesCategory && matchesDate;
    });

    return (
        <GlobalContext.Provider
            value={{
                expenses: filteredExpenses,
                addExpense,
                deleteExpense,
                editExpense,
                showExpenseDetails,
                closeExpenseDetails,
                selectedExpense,
                setFilter,
                setDateFilter,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};

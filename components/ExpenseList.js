import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useNotificationContext } from "../context/NotificationContext";

const ExpenseList = () => {
    const { expenses, deleteExpense, showExpenseDetails, budget } = useGlobalContext();
    const listEndRef = useRef(null);
    const { addNotification } = useNotificationContext();

    const [notifiedLargeExpenses, setNotifiedLargeExpenses] = useState(new Set());
    const [isBudgetExceeded] = useState(false);

    useLayoutEffect(() => {
        listEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [expenses]);

    useEffect(() => {


        expenses.forEach((expense) => {
            if (expense.amount > 1000 && !notifiedLargeExpenses.has(expense.id)) {
                addNotification(`Duży wydatek: ${expense.title} - ${expense.amount} zł`, 'warning');
                setNotifiedLargeExpenses((prevSet) => new Set(prevSet).add(expense.id));
            }
        });
    }, [expenses, budget, addNotification, isBudgetExceeded, notifiedLargeExpenses]);

    return (
        <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
            <h2>Lista Wydatków</h2>
            {expenses.length === 0 ? (
                <p style={{ color: "#999" }}>Brak wydatków do wyświetlenia.</p>
            ) : (
                expenses.map((expense) => (
                    <div
                        key={expense.id}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "10px",
                            marginBottom: "10px",
                            backgroundColor: "#fff",
                        }}
                    >
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <tbody>
                            <tr>
                                <td style={{ fontWeight: "bold", padding: "5px" }}>Tytuł:</td>
                                <td style={{ padding: "5px" }}>{expense.title}</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: "bold", padding: "5px" }}>Kwota:</td>
                                <td style={{ padding: "5px" }}>{expense.amount} zł</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: "bold", padding: "5px" }}>Kategoria:</td>
                                <td style={{ padding: "5px" }}>{expense.category}</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: "bold", padding: "5px" }}>Data:</td>
                                <td style={{ padding: "5px" }}>{expense.date}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div style={{ marginTop: "10px" }}>
                            <button
                                onClick={() => showExpenseDetails(expense)}
                                style={{
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                    marginRight: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Szczegóły
                            </button>
                            <button
                                onClick={() => deleteExpense(expense.id)}
                                style={{
                                    backgroundColor: "#dc3545",
                                    color: "white",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Usuń
                            </button>
                        </div>
                    </div>
                ))
            )}
            <div ref={listEndRef} />
        </div>
    );
};

export default ExpenseList;

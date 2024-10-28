import React from 'react';

export default function ExpenseList({ expenses, onDelete, onShowDetails }) {
    return (
        <div>
            {expenses.map((expense) => (
                <div key={expense.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <h3>{expense.title}</h3>
                    <p>Kategoria: {expense.category}</p>
                    <p>Kwota: {expense.amount} PLN</p>
                    <p>Data: {expense.date}</p>
                    <button
                        onClick={() => onShowDetails(expense)}
                        style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}
                    >
                        Szczegóły
                    </button>
                    <button
                        onClick={() => onDelete(expense.id)}
                        style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px' }}
                    >
                        Usuń
                    </button>
                </div>
            ))}
        </div>
    );
}

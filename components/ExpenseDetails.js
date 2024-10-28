import React, { useState } from 'react';

export default function ExpenseDetails({ expense, onClose, onEdit }) {
    const [editedExpense, setEditedExpense] = useState(expense);

    if (!expense) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedExpense((prevExpense) => ({
            ...prevExpense,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onEdit(editedExpense);
    };

    return (
        <div className="modal" style={{ padding: '20px', backgroundColor: '#f4f4f4', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>Edytuj {expense.title}</h3>
            <label>
                Tytuł:
                <input type="text" name="title" value={editedExpense.title} onChange={handleChange} />
            </label>

            <label>
                Kwota:
                <input type="number" name="amount" value={editedExpense.amount} onChange={handleChange} />
            </label>

            <button onClick={handleSave} style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
                Zapisz
            </button>
            <button onClick={onClose} style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px' }}>
                Zamknij
            </button>
        </div>
    );
}

import React, { useState } from 'react';

export default function ExpenseDetails({ expense, onClose, onEdit }) {

    const [editedExpense, setEditedExpense] = useState(expense);
    const [errors, setErrors] = useState({ title: '', amount: '' });

    if (!expense) return null;


    const handleChange = (e) => {
        const { name, value } = e.target;


        setEditedExpense((prevExpense) => ({
            ...prevExpense,
            [name]: value,
        }));


        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!editedExpense.title || editedExpense.title.length < 3) {
            newErrors.title = 'Tytuł musi mieć co najmniej 3 znaki';
        }

        if (!editedExpense.amount) {
            newErrors.amount = 'Kwota jest wymagana';
        } else if (Number(editedExpense.amount) <= 0) {
            newErrors.amount = 'Kwota musi być dodatnia';
        }

        setErrors(newErrors);


        return Object.keys(newErrors).length === 0;
    };


    const handleSave = () => {
        if (validate()) {
            onEdit(editedExpense);
        }
    };

    return (
        <div className="modal" style={{ padding: '20px', backgroundColor: '#f4f4f4', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>Edytuj {expense.title}</h3>


            <div style={{ marginBottom: '10px' }}>
                <label>Tytuł:</label>
                <input
                    type="text"
                    name="title"
                    value={editedExpense.title}
                    onChange={handleChange}
                    style={{ display: 'block', marginTop: '5px', padding: '5px', width: '100%' }}
                />
                {errors.title && <div style={{ color: 'red', fontSize: '12px' }}>{errors.title}</div>}
            </div>


            <div style={{ marginBottom: '10px' }}>
                <label>Kwota:</label>
                <input
                    type="number"
                    name="amount"
                    value={editedExpense.amount}
                    onChange={handleChange}
                    style={{ display: 'block', marginTop: '5px', padding: '5px', width: '100%' }}
                />
                {errors.amount && <div style={{ color: 'red', fontSize: '12px' }}>{errors.amount}</div>}
            </div>


            <button
                onClick={handleSave}
                style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}
            >
                Zapisz
            </button>
            <button
                onClick={onClose}
                style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px' }}
            >
                Zamknij
            </button>
        </div>
    );
}

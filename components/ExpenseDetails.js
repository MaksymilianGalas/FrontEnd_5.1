import React, {useLayoutEffect, useRef, useState} from 'react';
import { useGlobalContext } from '../context/GlobalContext';

export default function ExpenseDetails() {
    const { selectedExpense, closeExpenseDetails, editExpense, addExpense } = useGlobalContext();
    const [editedExpense, setEditedExpense] = useState(selectedExpense || {});
    const [errors, setErrors] = useState({ title: '', amount: '' });
    const listEndRef = useRef(null);

    useLayoutEffect(() => { //przewijanie do najnowszego wydatku
        listEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [addExpense]);

    if (!selectedExpense) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedExpense((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!editedExpense.title || editedExpense.title.length < 3) {
            newErrors.title = 'Tytuł musi mieć co najmniej 3 znaki';
        }
        if (!editedExpense.amount || Number(editedExpense.amount) <= 0) {
            newErrors.amount = 'Kwota musi być dodatnia';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validate()) {
            editExpense(editedExpense);
            closeExpenseDetails();
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f4f4f4', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>Edytuj {selectedExpense.title}</h3>
            <div>
                <label>Tytuł:</label>
                <input
                    type="text"
                    name="title"
                    value={editedExpense.title}
                    onChange={handleChange}
                />
                {errors.title && <div style={{ color: 'red' }}>{errors.title}</div>}
            </div>
            <div>
                <label>Kwota:</label>
                <input
                    type="number"
                    name="amount"
                    value={editedExpense.amount}
                    onChange={handleChange}
                />
                {errors.amount && <div style={{ color: 'red' }}>{errors.amount}</div>}
            </div>

            <div style={{marginTop: "20px"}}>
                <button
                    onClick={closeExpenseDetails}
                    style={{
                        backgroundColor: "#007bff", // niebieski
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        marginRight: "10px",
                        cursor: "pointer",
                    }}
                >
                    Zamknij
                </button>
                <button
                    onClick={handleSave}
                    style={{
                        backgroundColor: "#28a745", // zielony
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        marginRight: "10px",
                        cursor: "pointer",
                    }}
                >
                    Zapisz
                </button>
            </div>
        </div>

)
    ;
}

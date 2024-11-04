import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddExpenseForm = ({ onAdd }) => {
  
    const validationSchema = Yup.object({
        title: Yup.string().min(3, 'Tytuł musi mieć co najmniej 3 znaki').required('Tytuł jest wymagany'),
        amount: Yup.number().positive('Kwota musi być dodatnia').required('Kwota jest wymagana'),
        category: Yup.string().required('Kategoria jest wymagana'),
        date: Yup.date().required('Data jest wymagana')
    });

    return (
        <Formik
            initialValues={{
                title: '',
                amount: '',
                category: '',
                date: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                onAdd({ ...values, id: Date.now() });
                resetForm();
            }}
        >
            {({ isSubmitting }) => (
                <Form style={{ padding: '20px', backgroundColor: '#f4f4f4', border: '1px solid #ccc', borderRadius: '8px' }}>
                    <h3>Dodaj Nowy Wydatek</h3>
                    <label>
                        Tytuł:
                        <Field type="text" name="title" />
                        <ErrorMessage name="title" component="div" style={{ color: 'red' }} />
                    </label>
                    <label>
                        Kwota:
                        <Field type="number" name="amount" />
                        <ErrorMessage name="amount" component="div" style={{ color: 'red' }} />
                    </label>
                    <label>
                        Kategoria:
                        <Field as="select" name="category">
                            <option value="">Wybierz kategorię</option>
                            <option value="Jedzenie">Jedzenie</option>
                            <option value="Rachunki">Rachunki</option>
                            <option value="Rozrywka">Rozrywka</option>
                        </Field>
                        <ErrorMessage name="category" component="div" style={{ color: 'red' }} />
                    </label>
                    <label>
                        Data:
                        <Field type="date" name="date" />
                        <ErrorMessage name="date" component="div" style={{ color: 'red' }} />
                    </label>
                    <button type="submit" disabled={isSubmitting} style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
                        Dodaj
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default AddExpenseForm;

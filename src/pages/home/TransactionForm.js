import React, {useEffect, useRef, useState} from 'react';
import {useFirestore} from "../../hooks/useFirestore";

function TransactionForm({ uid }) {
    // Form values state
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    // Firestore Hook
    const { addDocument, response } = useFirestore('transactions')

    //Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();

        //Add document to firebase
        addDocument({
            uid,
            name,
            amount,
        })
        console.log({uid, name, amount})

        //Focus name field
        console.log(response.success);
    }

    //Reset form
    useEffect(() => {
        if (response.success) {
            setName('');
            setAmount('');
        }
    }, [response.success])

    return (
        <>
            <h3>Add a transaction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transaction name:</span>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                </label>
                <label>
                    <span>Amount ($): </span>
                    <input
                        type="number"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                        required
                    />
                </label>
                <button>Add Transaction</button>
            </form>
        </>
    );
}

export default TransactionForm;
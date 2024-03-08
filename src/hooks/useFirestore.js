import {useEffect, useReducer, useState} from "react";
import {projectFirestore, timestamp} from "../firebase/config";

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch(action.type) {
        case 'IS_PENDING':
            return { document: null, isPending: true, error: null, success: false }
        case 'ADDED_DOCUMENT':
            return { document: action.payload, isPending: false, error: null, success: true }
        case 'DELETED_DOCUMENT':
            return { document: null, isPending: false, error: null, success: true}
        case 'ERROR':
            return { document: null, isPending: false, error: action.payload, success: false }
        default:
            return state
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCanceled, setIsCanceled] = useState(false);

    //collection ref
    const ref = projectFirestore.collection(collection);

    // dispatch only if canceled
    const dispatchIfNotCanceled = (action) => {
        if (!isCanceled) {
            dispatch(action);
        }
    }

    //add doc
    const addDocument = async (doc) => {
        dispatch({ type: "IS_PENDING" })

        try {
            const createdAt = timestamp.fromDate(new Date())
            const addedDocument = await ref.add({...doc, createdAt })
            dispatchIfNotCanceled({ type: "ADDED_DOCUMENT", payload: addedDocument })
        }
        catch (err) {
            dispatchIfNotCanceled({ type: "ERROR", payload: err.message })
        }

    }

    //delete doc
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' });

        try {
            await ref.doc(id).delete()
            dispatchIfNotCanceled({ type: 'DELETED_DOCUMENT' })
        } catch(err) {
            dispatchIfNotCanceled({ type: 'ERROR', payload: 'could not delete item' })
        }
    }

    //CLEANUP FUNCTION
    useEffect(() => {
        return () => setIsCanceled(true);
    }, [])

    return { addDocument, deleteDocument, response }
}
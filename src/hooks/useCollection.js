import {useEffect, useRef, useState} from "react";
import {projectFirestore} from "../firebase/config";


export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    //useRef so values dont cause infinite loop
    const query = useRef(_query).current;
    const orderBy = useRef(_orderBy).current;

    useEffect(() => {
        //ref
        let ref = projectFirestore.collection(collection);

        if (query) {
            ref = ref.where( ...query );
        }

        if (orderBy) {
            ref = ref.orderBy( ...orderBy );
        }

        const unsub = ref.onSnapshot((snapshot) => {

            //Store firestore documents
            let results = [];
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id})
            })

            //update state
            setDocuments(results);
            setError(null)

        }, (error) => { // Catch error
            console.log(error);
            setError('Could not fetch data');
        })

        // unsubscribe on unmount
        return () => unsub();

    }, [collection, query, orderBy])

    return { documents, error }
}
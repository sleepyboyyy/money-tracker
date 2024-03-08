import { useAuthContext } from "./useAuthContext";
import { useEffect, useState } from "react";
import {projectAuth} from "../firebase/config";

export const useLogin = () => {
    const [isCanceled, setIsCanceled] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);

        try {
            //login user
            const res = await projectAuth.signInWithEmailAndPassword(email, password);

            //dispatch login
            dispatch({type: 'LOGIN', payload: res.user})

            // update state
            if (!isCanceled) { // HANDLE CLEANUP
                setIsPending(false);
                setError(null)
            }

        } catch(err) {
            if (!isCanceled) { // HANDLE CLEANUP
                console.log(err.message);
                setIsPending(false);
                setError(err.message)
            }
        }
    }

    useEffect(() => { // CLEANUP FUNCTION
        return () => setIsCanceled(true);
    }, [])

    return { login, error, isPending }
}
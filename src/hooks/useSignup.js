import {useEffect, useState} from 'react'
import { projectAuth } from "../firebase/config";
import {useAuthContext} from "./useAuthContext";

export const useSignup = () => {
    const [isCanceled, setIsCanceled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            // signup user
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)

            if (!res) {
                throw new Error("Could not complete signup")
            }

            // update user display name
            await res.user.updateProfile({ displayName })

            // dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user })

            if (!isCanceled) { // HANDLE CLEANUP
                setIsPending(false);
                setError(null);
            }
        } catch(err) {
            if (!isCanceled) { // HANDLE CLEANUP
                setError(err.message);
                setIsPending(false);
                console.log(err.message);
            }
        }
    }

    useEffect(() => { // CLEANUP FUNCTION
        return () => setIsCanceled(true);
    }, []);

    return { error, isPending, signup }
}
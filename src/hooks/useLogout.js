import { projectAuth } from "../firebase/config";
import {useEffect, useState} from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [isCanceled, setIsCanceled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        try {
            // logout
            await projectAuth.signOut();

            // dispatch
            dispatch({ type: 'LOGOUT' });

            if (!isCanceled) { // HANDLE CLEANUP
                setError(null);
                setIsPending(false);
            }
        } catch (err) {
            if (!isCanceled) { // HANDLE CLEANUP
                console.log(err.message);
                setError(err);
                setIsPending(false)
            }
        }
    }

    useEffect(() => { // CLEANUP FUNCTION
        return () => setIsCanceled(true);
    }, []);

    return { logout, error, isPending }
}
import {useAuthContext} from "../../hooks/useAuthContext";
import {Navigate} from "react-router-dom";
import Signup from "../signup/Signup";

export const AuthSignup = () => {
    const { user } = useAuthContext();

    if (user) {
        return <Navigate to="/" replace />
    } if (!user) {
        return <Signup />
    }
}
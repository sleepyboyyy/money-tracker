import {useAuthContext} from "../../hooks/useAuthContext";
import {Navigate} from "react-router-dom";
import Login from "../login/Login";

export const AuthLogin = () => {
    const { user } = useAuthContext();

    if (user) {
        return <Navigate to="/" replace />
    } if (!user) {
        return <Login />
    }
}
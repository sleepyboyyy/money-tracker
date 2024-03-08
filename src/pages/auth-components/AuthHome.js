import {useAuthContext} from "../../hooks/useAuthContext";
import Home from "../home/Home";
import {Navigate} from "react-router-dom";

export const AuthHome = () => {
    const { user } = useAuthContext();

    if (user) {
        return <Home />
    } if (!user) {
        return <Navigate to="login" replace />
    }
}
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route, Navigate
} from "react-router-dom";
import {useAuthContext} from "./hooks/useAuthContext";
// Layouts
import RootLayout from "./Layouts/RootLayout";

// Pages
import {AuthHome} from "./pages/auth-components/AuthHome";
import {AuthLogin} from "./pages/auth-components/AuthLogin";
import {AuthSignup} from "./pages/auth-components/AuthSignup";



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route
                index
                element={<AuthHome />}
            />
            <Route
                path="login"
                element={<AuthLogin />}
            />
            <Route
                path="signup"
                element={<AuthSignup />}
            />
        </Route>
    )
)

function App() {
    const { authIsReady } = useAuthContext();

    return (
        <div className="App">
            {authIsReady && (
                <RouterProvider router={router} />
            )}
        </div>
    );
}

export default App

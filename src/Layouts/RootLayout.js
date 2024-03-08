import styles from './RootLayout.module.css'
import {Link, Outlet} from "react-router-dom";
import {useLogout} from "../hooks/useLogout";
import {useAuthContext} from "../hooks/useAuthContext";

function RootLayout() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    return (
        <div>
            <nav className={styles.navbar}>
                <ul>
                    <li className={styles.title}>MoneyTracker</li>

                    {!user && (
                        <>
                            <li><Link to="login">Login</Link></li>
                            <li><Link to="signup">Sign up</Link></li>
                        </>
                    )}

                    {user && (
                        <>
                            <li>Hello {user.displayName}</li>
                            <li>
                                <button onClick={logout} className="btn">Logout</button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            <Outlet />
        </div>

    );
}

export default RootLayout;
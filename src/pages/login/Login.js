import styles from './Login.module.css'
import {useRef, useState} from "react";
import {useLogin} from "../../hooks/useLogin";

function Login() {
    // Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const inputRef = useRef(null);
    const { login, error, isPending } = useLogin();

    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);

        inputRef.current.focus()
        resetForm();
    }

    //Reset form
    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    return (
        <form onSubmit={handleSubmit} className={styles['login-form']}>
            <h2>Login</h2>
            <label>
                <span>Enter your email</span>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    ref={inputRef}
                />
            </label>
            <label>
                <span>Enter your password</span>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            {!isPending && <button className="btn">Login</button>}
            {isPending && <button className="btn" disabled>loading..</button>}
            {error && <p>{error}</p>}
        </form>
    );
}

export default Login;
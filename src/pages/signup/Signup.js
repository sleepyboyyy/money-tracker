import styles from './Signup.module.css'
import {useRef, useState} from "react";
import {useSignup} from "../../hooks/useSignup";

function Signup() {
    // Form values state
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const inputRef = useRef(null);

    //useSignup hook
    const { signup, error, isPending } = useSignup();

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        signup(email, password, displayName);

        inputRef.current.focus()
        resetForm()
    }

    // Reset form
    const resetForm = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
    }

    return (
        <form onSubmit={handleSubmit} className={styles['signup-form']}>
            <h2>Sign up</h2>
            <label>
                <span>Display name:</span>
                <input
                    ref={inputRef}
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            <label>
                <span>Email</span>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>Password</span>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            {!isPending && <button className="btn">Sign up</button>}
            {isPending && <button className="btn" disabled>Loading...</button>}
            {error && <p>{error}</p>}
        </form>
    );
}

export default Signup;
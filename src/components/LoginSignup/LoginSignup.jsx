import { useState, useContext } from 'react';
import './loginSignup.css';
import AuthContext from '../../context/auth/AuthContext';


function LoginSignup() {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({ email: '', password: '' });
    const handleUpdateForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { email, password } = form;
            const json = await login({ email, password });
            console.log(json);
        } catch (e) {
            alert(e);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <section>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="text" autoComplete="email" onChange={handleUpdateForm} value={form.email} required autoFocus />
            </section>
            <section>
                <label htmlFor="current-password">Password</label>
                <input id="current-password" name="password" type="password" autoComplete="current-password" onChange={handleUpdateForm} value={form.password} required />
            </section>
            <button type="submit">Sign in</button>
        </form>
    );
}

export default LoginSignup;

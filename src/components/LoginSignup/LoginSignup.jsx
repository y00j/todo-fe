import { useState } from 'react';
import './loginSignup.css';

function LoginSignup() {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleUpdateForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                credentials: 'same-origin',
                method: 'POST',
                mode: "cors", // no-cors, *cors, same-origin
                body: JSON.stringify(form),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const json = await response.json();
            alert(JSON.stringify(json));
        } catch(e) {
            alert(e);
        }
    
    }

    return (
        <form onSubmit={handleSubmit}>
            <section>
                <label for="email">Email</label>
                <input id="email" name="email" type="text" autocomplete="email" onChange={handleUpdateForm} value={form.email} required autofocus />
            </section>
            <section>
                <label for="current-password">Password</label>
                <input id="current-password" name="password" type="password" autocomplete="current-password" onChange={handleUpdateForm} value={form.password} required />
            </section>
            <button type="submit">Sign in</button>
        </form>
    );
}

export default LoginSignup;

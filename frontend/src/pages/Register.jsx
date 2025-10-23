import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/register', form);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form className="form" onSubmit={submit}>
                <input placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
                <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} type="email" required />
                <input placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} type="password" required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

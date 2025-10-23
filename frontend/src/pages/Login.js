import { useState } from "react";
import axios from "../axiosConfig.js";

import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/login.js", { email, password }); // make sure .js extension in axiosConfig if needed
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard.js"); // update route if using .js extensions in routes (optional)
        } catch (err) {
            alert(err.response?.data?.message || "Error occurred");
        }
    };


    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;

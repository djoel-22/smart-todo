import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Dashboard from "./pages/Dashboard.js";

function App() {
    const token = localStorage.getItem("token"); // check if user is logged in

    return (
        <Router>
            <Routes>
                {/* Login Page */}
                <Route
                    path="/"
                    element={token ? <Navigate to="/dashboard" /> : <Login />}
                />

                {/* Register Page */}
                <Route
                    path="/register"
                    element={token ? <Navigate to="/dashboard" /> : <Register />}
                />

                {/* Dashboard Page */}
                <Route
                    path="/dashboard"
                    element={token ? <Dashboard /> : <Navigate to="/" />}
                />

                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;

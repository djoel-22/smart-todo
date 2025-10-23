import React from 'react';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="container">
      <h1>Smart ToDo</h1>
      <p>A simple MERN To-Do app</p>
      <div className="nav">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
}

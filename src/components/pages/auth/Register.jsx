import React from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userData } from "../../../context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { btnLoading, registerUser } = userData();

  const submitHandler = async (e) => {
    e.preventDefault();
    await registerUser(name, email, password, navigate);
  };
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled ={btnLoading} 
          className="common-btn">{
            btnLoading ? "please wait ..." : "Register"
            }</button>
        </form>
        <p>
          Have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

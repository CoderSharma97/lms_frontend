import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { userData } from "../../../context/UserContext";
import { CourseData } from "../../../context/CourseContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { btnLoading, loginUser } = userData();
  const {fetchMyCourse} = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate,fetchMyCourse);
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={submitHandler}>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button disabled={btnLoading} type="submit" className="common-btn">
            {btnLoading ? "Please wait " : "Login"}
          </button>
        </form>
        <p>
          Dont have an account ? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

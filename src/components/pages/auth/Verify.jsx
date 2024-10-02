import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userData } from "../../../context/UserContext";

const Verify = () => {
  
  const { btnLoading, verifyOtp } = userData();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(otp);
    await verifyOtp(Number(otp), navigate);
    
  };
  const [otp, setOtp] = useState("");
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Verify Account</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="otp">OTP</label>
          <input
            type="number"
            name=""
            id=""
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button disabled ={btnLoading} type="submit" className="common-btn">
            {btnLoading ? "Please wait": "Verify"}
          </button>
        </form>

        <p>
          Go to <Link to="/login">Login</Link> page
        </p>
      </div>
    </div>
  );
};

export default Verify;

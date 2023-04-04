import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword, validateEmail } from "../../../utils/email";
import { toast } from "react-toastify";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter an email");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
    };

    await forgotPassword(userData);
    setEmail("");
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={forgot}>
        <input
          type="email"
          placeholder="Email"
          required
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="--btn --btn-primary --btn-block">
          Get Reset Email
        </button>
      </form>
      <div>
        <p>
          <Link to="/">- Home</Link>
        </p>
        <p>
          <Link to="/login">- Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Forgot;

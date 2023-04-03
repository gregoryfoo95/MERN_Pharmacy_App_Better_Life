import { useState } from 'react'
import axios from "axios";


export default function RegisterPage() {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
    });

    const disable = state.password !== state.confirm;
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    
    const handleSubmit = async (e) => {
       e.preventDefault();
        try{ 
        const response = await fetch("/api/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, //Important to write this headers down, else there will be an express error. Because in react, we are not sending urlencoded, we did not require the middleware to process it. We are actually sending JSON
        //try out AXIOS in project 4 for the above as it will automatically provide the header
        body: JSON.stringify(state),
        });
        if (!response.ok) {
        throw new Error("Network Error");
        }
        const token = await response.json();
        localStorage.setItem("token",token);
        } catch(error) {
            console.log(error);
        }
    }
    return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            required
          />
          <label>Confirm</label>
          <input
            type="password"
            name="confirm"
            value={state.confirm}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={disable}>
            SIGN UP
          </button>
        </form>
      </div>
      <p className="error-message">&nbsp;{state.error}</p>
    </div>
    )
}
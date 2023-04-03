import { useState } from "react";

const BASE_URL = 'http://localhost:3000/api/user';

export default function LoginPage() {
    const [error, setError] = useState("No error");
    const [state, setState] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
        const token = await response.json();
        localStorage.setItem("token", token);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleLogin}>
      <p>{error.toString()}</p>
      <fieldset>
        <legend>Login</legend>
        <label>
          Email: <input 
                type="email"
                name="email"
                onChange={handleChange}
                required
            />
        </label>
        <label>
          Password: <input 
                type="password"
                name="password"
                onChange={handleChange}
                required 
            />
        </label>
        <button>Login</button>
      </fieldset>
    </form>
  );
}

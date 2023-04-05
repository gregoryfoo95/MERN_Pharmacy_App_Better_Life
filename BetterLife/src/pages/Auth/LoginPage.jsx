import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../utils/users-service";
const BASE_URL = 'http://localhost:3000/api/user';

export default function LoginPage({ setUser }) {
    const navigate = useNavigate();
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

    try {
      const response = await axios.post(`${BASE_URL}/login`, state);
      console.log(response);
      const role = response.data.role;
      const token = response.data.token;
      localStorage.setItem("token", token);
      setUser(getUser());
      if (role === "Pharmacist") {
        navigate("/home");
      } else if (role === "Consumer") {
        navigate("/welcome");
      } else {
        navigate("/")
      };
    } catch (error) {
      setError(error.message);
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

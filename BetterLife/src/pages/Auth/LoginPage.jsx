import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../utils/users-service';
import { Container } from 'react-bootstrap';
const BASE_URL = 'http://localhost:3000/api/user';

export default function LoginPage({ setUser }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/login`, state);
      console.log(response);
      const role = response.data.role;
      const token = response.data.token;
      localStorage.setItem('token', token);
      setUser(getUser());
      if (role === 'Pharmacist') {
        navigate('/home');
      } else if (role === 'Consumer') {
        navigate('/welcome');
      } else {
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Container
        className="form-container"
        onSubmit={handleLogin}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#F5F5F5',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
        }}>
        <p>{error.toString()}</p>
        <fieldset
          style={{
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <legend
            style={{
              color: '#3A1730',
              fontWeight: 'bold',
              fontSize: '36px',
              marginBottom: '20px',
            }}>
            Login
          </legend>
          <label style={{ marginBottom: '20px', textAlign: 'left' }}>
            Email:{' '}
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              style={{
                paddingLeft: '20px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#FFFFFF',
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
              }}
            />
          </label>
          <label style={{ marginBottom: '20px', textAlign: 'left' }}>
            Password:{' '}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              style={{
                paddingLeft: '10px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#FFFFFF',
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                marginRight: '20px',
              }}
            />
          </label>

          <button
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#00A0A0',

              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
            }}
            onClick={handleLogin}>
            Login
          </button>
        </fieldset>
      </Container>
    </div>
  );
}

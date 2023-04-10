import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../utils/users-service';
import { Col, Container, Row } from 'react-bootstrap';
// import './Auth.css';
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
axios
  const handleLogin = async event => {
    event.preventDefault();

    try {
      console.log("GREG DEBUG: BACK_END_URL:", process.env.VITE_APP_BACK_END_URL);
      const response = await axios.post(`${process.env.VITE_APP_BACK_END_URL}/api/user/login`, state);
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
      <form
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
          {/* <label style={{ marginBottom: '20px', textAlign: 'left' }}> */}
          <Container>
            <Row className="bl-form-row">
              <Col className="bl-form-left-label"> Email: </Col>
              <Col>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                  className="bl-input"
                />
              </Col>
            </Row>
            <Row className="bl-form-row">
              <Col className="bl-form-left-label"> Password: </Col>
              <Col>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  required
                  className="bl-input"
                />
              </Col>
            </Row>
          </Container>
          <button className="bl-button">Login</button>
        </fieldset>
      </form>
    </div>
  );
}

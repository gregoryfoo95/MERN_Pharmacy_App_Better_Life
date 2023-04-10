import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function RegisterPage() {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const disable = state.password !== state.confirm;

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/api/user`, state);
      const token = response.data;
      localStorage.setItem('token', token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        className="form-container"
        style={{
          backgroundColor: '#F5F5F5',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
        }}>
        <h1 style={{ color: '#3A1730',
            fontWeight: 'bold',
            fontSize: '36px',
            marginBottom: '20px'}}>Registration</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label style={{ color: '#3A1730' }} />
            <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              value={state.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label style={{ color: '#3A1730' }}/>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={state.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label style={{ color: '#3A1730' }}/>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            < Form.Label style={{ color: '#3A1730' }}/>
            <Form.Control
              type="password"
              name="confirm"
              placeholder="Confirm Password"
              value={state.confirm}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div style={{ display: 'flex', justifyContent: 'center',marginTop: '20px' }}>
            <Button
              type="submit"
              disabled={disable}
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#00A0A0',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                marginBottom: '20px',
              }}>
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
      <p className="error-message" style={{ color: '#3A1730' }}>
        {' '}
        {state.error}
      </p>
    </div>
  );
}

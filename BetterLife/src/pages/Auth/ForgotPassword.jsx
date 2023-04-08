import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  forgotPassword,
  validateEmail,
} from '../../../utils/middleWare/authService';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Forgot = () => {
  const [email, setEmail] = useState('');

  const forgot = async e => {
    e.preventDefault();
    if (!email) {
      return toast.error('Please enter an email');
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }

    const userData = {
      email,
    };

    await forgotPassword(userData);
    setEmail('');
  };

  return (
    <Container
      style={{
        backgroundColor: '#F5F5F5',
        minHeight: '50vh',
        alignItems: 'center',
        width: '100%',
      }}>
      <Col
        style={{
          backgroundColor: '#F5F5F5F',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
        }}>
        <h2
          style={{
            color: '#3A1730',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '30px',
            marginBottom: '20px',
          }}>
          Forgot Password
        </h2>
        <Form onSubmit={forgot}>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#F5F5F5',
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                marginBottom: '20px',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '16px',
              }}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="--btn --btn-primary --btn-block"
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#00A0A0',
              color: '#F5F5F5',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
              marginBottom: '20px',
            }}>
            Get Reset Email
          </Button>
        </Form>
        <Row>
          <Col>
            <Link to="/" style={{ color: '#00A0A0' }}>
              Home
            </Link>
          </Col>
          <Col>
            <Link to="/login" style={{ color: '#00A0A0' }}>
              Login
            </Link>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default Forgot;

import { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

export default function ContactForm() {
  const [state, setState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.VITE_APP_BACK_END_URL}/api/contact`, state);
      setState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      alert('Thank you for your message!');
    } catch (error) {
      console.log(error);
      alert(
        'Sorry, there was an error sending your message. Please try again later.'
      );
    }
  };

  return (
    <div>
      <div className="form-container">
        <p style={{ textAlign: "center", fontSize: "1.5rem", marginBottom: "1rem" }}>Have an enquiry? Reach out to us!</p>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="subject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              name="subject"
              value={state.subject}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="message"
              value={state.message}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="submit-container">
            <Button
              variant="primary"
              type="submit"
              style={{
                backgroundColor: '#00A0A0',
                marginTop: '10px',
                width: '150px',
              }}>
              SEND
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

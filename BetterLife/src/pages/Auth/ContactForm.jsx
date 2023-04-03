import { useState } from 'react';
import axios from "axios";

export default function ContactForm() {
  const [state, setState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/contact", state);
      setState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      alert("Thank you for your message!");
    } catch (error) {
      console.log(error);
      alert("Sorry, there was an error sending your message. Please try again later.");
    }
  };

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
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={state.subject}
            onChange={handleChange}
            required
          />
          <label>Message</label>
          <textarea
            name="message"
            value={state.message}
            onChange={handleChange}
            required
          />
          <button type="submit">
            SEND
          </button>
        </form>
      </div>
    </div>
  );
}

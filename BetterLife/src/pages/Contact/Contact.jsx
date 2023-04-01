import React, { useState } from "react";
import Card from "../../components/Card/Card";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../Auth/authService";

const Contact = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const data = {
    subject,
    message,
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/contactus`, data);
      setSubject("");
      setMessage("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="contact">
      <h3 className="--mt">Contact Us</h3>
      <div className="section">
        <form onSubmit={sendEmail}>
          <Card cardClass="card">
            <div>
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div>
              <label>Message</label>
              <textarea
                name="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="10"
                cols="30"
              ></textarea>
            </div>
            <button className="--btn --btn-primary">Send Message</button>
          </Card>
        </form>

        <div className="details">
          <Card cardClass={"card2"}>
            <h3>Our Contact Information</h3>
            <p>Fill the form or contact us via other channels listed below</p>

            <div className="icons">
              <span>
                <FaPhoneAlt />
                <p>999</p>
              </span>
              <span>
                <FaEnvelope />
                <p>Support@BetterLife.com</p>
              </span>
              <span>
                <GoLocation />
                <p>Singapore</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;

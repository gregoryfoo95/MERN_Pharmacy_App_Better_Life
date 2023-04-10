import React, { useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './AppointmentBooking.css'; 

const localizer = momentLocalizer(moment);

function AppointmentBooking() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleSelectSlot(slotInfo) {
    setSelectedDate(slotInfo.start);
  }

  function handleSelectEvent(event) {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      const updatedEvents = events.filter((e) => e !== event);
      setEvents(updatedEvents);
    }
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const newEvent = {
      start: selectedDate,
      end: moment(selectedDate).add(30, 'minutes').toDate(),
      title: name,
      email: email,
    };
    setEvents([...events, newEvent]);
    setSelectedDate(null);
    setName('');
    setEmail('');
  
    // Send email to the user
    const subject = "Appointment Booked";
    const message = `Hi ${name}, Thank you for booking an appointment with us. Your appointment is scheduled for ${moment(selectedDate).format('MMMM Do YYYY, h:mm a')} To join the video call, click on this link: https://meet.google.com/oob-iztp-ray \n\nBest regards,\nYour Pharmacy Team`;
    const send_to = email;
    const sent_from = process.env.REACT_APP_EMAIL_USER;
    try {
      const response = await fetch(`${process.env.REACT_APP_BACK_END_URL}/api/appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ subject, message, send_to, sent_from }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  

  const isFormInvalid = !selectedDate || !name.trim() || !email.trim();

  return (
    <div>
      <p style={{ textAlign: 'center' }}>We offer video consultations so you can get the help you need from the comfort of your own home.</p>
      <form className="appointment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="form-control"
          />
        </div>
        <br></br>
        <button type="submit" disabled={isFormInvalid} className="btn btn-primary">
          Book Appointment
        </button>
      </form>
      <div style={{ height: '500px' ,marginTop: '20px'}}>
        <Calendar
          localizer={localizer}
          events={events}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          defaultView="week"
          views={['week']}
          min={new Date().setHours(9, 0, 0)}
          max={new Date().setHours(18, 0, 0)}
          step={15}
          timeslots={2}
        />
      </div>
    </div>
  );
}

export default AppointmentBooking;









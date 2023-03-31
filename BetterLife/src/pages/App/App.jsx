import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import MedicinePage from '../MedicinePage/MedicinePage';
import Contact from "../Contact/Contact";
import SideBar from "../../components/SideBar/SideBar";

const userRole = "pharmacist";

function App() {
  const [user, setUser] = useState(userRole);

  return (
    <main className="container">
    { (userRole === "pharmacist") ?
      <>
        <SideBar />
        <h1>Better Life</h1>
        <Routes>
          <Route path="/medicine" element={<MedicinePage />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </>
      : 
      <h1>Everyday Drugs </h1>
    }
    </main>
  );
}

export default App;


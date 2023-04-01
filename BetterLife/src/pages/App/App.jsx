import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import MedicinePage from '../MedicinePage/MedicinePage';
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import MedicineUpdateForm from "../MedicinePage/MedicineUpdateForm";
import PharmaPage from "../Pharmapage/Pharmapage";
const BASE_URL = 'http://localhost:3000/api/medicine';
const userRole = "pharmacist";

function App() {
  const [user, setUser] = useState(userRole);

  return (
    <main className="container">
    { (userRole === "pharmacist") ?
      <>
        <NavBar />
        <SideBar />
        <h1>Better Life</h1>
        <Routes>
          <Route path="/" element = {<PharmaPage />} />
          <Route path="/medicine" element={<MedicinePage />} />
          <Route path="/medicine/:id/edit" element={<MedicineUpdateForm BASE_URL={BASE_URL}/>} />
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


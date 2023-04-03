import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import MedicinePage from '../MedicinePage/MedicinePage';
import Contact from "../Contact/Contact";
import SideBar from "../../components/SideBar/SideBar";
import Register from '../Profile/Register';
import Login from '../Profile/Login';
import Forgot from '../Profile/Forgot';
import Reset from '../Profile/Reset';
import Profile from '../Profile/Profile';
import EditProfile from '../Profile/EditProfile';
import MedicineUpdateForm from "../MedicinePage/MedicineUpdateForm";
import PharmaPage from "../Pharmapage/Pharmapage";
const BASE_URL = 'http://localhost:3000/api/medicine';

const userRole = "pharmacist";

function App() {
  const [user, setUser] = useState(userRole);

  return (
    <main className="container">
    { (userRole === "user") ?
      <>
        <SideBar />
        <h1>Better Life</h1>
        <Routes>
          <Route path="/home" element = {<PharmaPage />} />
          <Route path="/medicine" element={<MedicinePage />} />
          <Route path="/medicine/:id/edit" element={<MedicineUpdateForm BASE_URL={BASE_URL}/>} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route element={<h1>404 - Page Not Found</h1>} />
          {/* To be moved to user later, not under pharmacist */}
          <Route path="/orders/new" element={<NewOrderPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
        </Routes>
      </>
      : 
      <h1>Everyday Drugs </h1>
    }
    <div className="The Watson's Experience" style={{ width: '100vw', height: '100vh' }}>
      

        <Routes>
          <Route path="/user" element={<MainSplit />} />
          <Route path="/map" element={<MainMap />} />
          <Route path="/map/:id" element={<Directions />} />

        </Routes>

    </div>
    </main>
  );
}

export default App;


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
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import AuthPage from "../Auth/Authpage";


const BASE_URL = '/api/medicine';

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
      <>
        <SideBar />
        <h1>Better Life</h1>
        <Routes>
        <Route path="/" element = {<AuthPage />} />
        </Routes>
      </>
    }
    </main>
  );
}

export default App;


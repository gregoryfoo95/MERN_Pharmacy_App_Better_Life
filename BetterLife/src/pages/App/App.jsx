import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import MedicinePage from '../MedicinePage/MedicinePage';
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBar/NavBar";
import MedicineUpdateForm from "../MedicinePage/MedicineUpdateForm";
import PharmaPage from "../Pharmapage/Pharmapage";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import AuthPage from "../Auth/Authpage";
import { getUser } from "../../../utils/users-service";
const BASE_URL = '/api/medicine';
//onst userRole = "pharmacist";

function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="container">
    { user ?
      <>
        <NavBar user={user} setUser = {setUser}/>
        <SideBar />
        <h1>Better Life</h1>
        <Routes>
          <Route path="/home" element = {<PharmaPage />} />
          <Route path="/medicine" element={<MedicinePage />} />
          <Route path="/medicine/:id/edit" element={<MedicineUpdateForm BASE_URL={BASE_URL}/>} />
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


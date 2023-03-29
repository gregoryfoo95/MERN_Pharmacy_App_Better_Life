import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import InventoryPage from '../InventoryPage/InventoryPage';
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";

function App() {
  const [user, setUser] = useState(null);

  return (

      <main className="container">
        <NavBar />
        <SideBar />
        <h1>Everyday Drugs</h1>
        <Routes>
          <Route path="/inventory" component={InventoryPage} />
        </Routes>
      </main>

  );
}

export default App;

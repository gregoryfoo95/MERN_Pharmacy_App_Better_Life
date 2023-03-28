import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
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
   
      </Routes>
    </main>
  );
}

export default App;


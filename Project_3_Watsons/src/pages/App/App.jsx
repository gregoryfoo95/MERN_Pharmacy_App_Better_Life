import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
    return (
      <main className="container">
        <NavBar />
        <SideBar />
        <h1>Wattanamason</h1>
        <PharmaPage />
      </main>
    );

}

export default App

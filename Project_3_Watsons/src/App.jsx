import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

/*   if (user === null) {
    return (
      <main className="container">
        <NavBar />
      </main>
    );
  } else */
    return (
      <main className="container">
{/*         <NavBar />
        <Routes>
        </Routes> */}
        <h1>Wattanamason</h1>
      </main>
    );

}

export default App

import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
      <Router>
        <Switch>
          <Route path="/inventory" component={InventoryPage} />
        </Switch>
      </Router>
    </main>
  );
}

export default App;



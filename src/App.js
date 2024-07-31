import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
import Navigation from "./components/navigation";
import Todolist from "./components/Todolist";
import './App.css';

function App() {
  return (
    <Router>
      <Navigation /> {/* Assming this provides navigation links */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Todolist" element={<Todolist />} />
        

      </Routes>
    </Router>
  );
}

export default App;

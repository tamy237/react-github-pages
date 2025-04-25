
import './App.css'
import React from 'react'
import { Routes, Route } from "react-router-dom";
import Connexion from "./pages/connexion/Connexion";
import 'font-awesome/css/font-awesome.min.css';
import Admin   from "./pages/Admin/Admin";
import Dashboard from './pages/Admin/Dashboard';
import Ajout from './pages/ajout/Ajout';
import Ldon from './pages/donneurs/Ldon';
import LieuCollecte from "./pages/collectes/LieuCollecte";
import Association from './pages/benevoles/Association';
import Test from './pages/Admin/test';




function App() {

  return (
    <Routes>
      {/* <Route path="/associations" element={<Test />} /> */}
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/ldon" element={<Ldon />} />  
      <Route path="/ajouter" element={<Ajout />} />   
      <Route path="/" element={<Dashboard />} /> 
      <Route path="/dashboard" element={<Dashboard />} />      
      <Route path="/admin" element={<Admin />} />
      <Route path="/associations" element={<Association />} />
      <Route path="/collecte" element={<LieuCollecte />} />

    </Routes>
  )
}

export default App

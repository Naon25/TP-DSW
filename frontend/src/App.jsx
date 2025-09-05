/*import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AdminPanel } from './pages/adminPanel';
import Login from "./pages/Login";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/socio" element={<h1>Perfil Socio</h1>} />
      </Routes>
    </BrowserRouter>
  )
}
*/
import { AdminPanel } from './pages/adminPanel.jsx';
import React from 'react';
import './App.css'
function App() {
  return (
    <div>
      <AdminPanel />
    </div>
  );
}

export default App;
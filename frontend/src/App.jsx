import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AdminPanel } from './pages/adminPanel.jsx';
import Login from "./pages/Login";
import { SocioPanel } from './pages/socioPanel.jsx';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/socio" element={<SocioPanel />} />
      </Routes>
    </BrowserRouter>
  )
}

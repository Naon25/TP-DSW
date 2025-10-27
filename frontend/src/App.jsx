import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AdminPanel } from './pages/adminPanel.jsx';
import Login from "./pages/Login";
import { SocioPanel } from './pages/socioPanel.jsx';
import Home from './pages/landing/Home';
import About from './pages/landing/About';
import Testimonials from './pages/landing/Testimonials';
import Contact from './pages/landing/Contact';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/socio" element={<SocioPanel />} />
      </Routes>
    </BrowserRouter>
  )
}

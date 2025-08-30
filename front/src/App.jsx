import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Carrito from './components/Carrito';
import Login from './components/login';        // Nombre corregido
import AdminLogin from './components/adminlogin'; // Nombre corregido
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/admin-login" element={<AdminLogin />} /> {/* Ruta corregida */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
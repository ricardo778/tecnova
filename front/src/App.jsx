import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Carrito from './components/carrito';
import Login from './components/login';
import AdminLogin from './components/adminlogin';
import Register from './components/registro'
import Productos from './components/productos';
import Perfil from './components/perfil';
import Factura from './components/factura';
import Detalle_Producto from './components/detalle_producto';
import Home from './components/home';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/producto/:id" element={<Detalle_Producto />} />
            <Route path="/factura" element={<Factura />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
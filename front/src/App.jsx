import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Carrito from './components/Carrito';
import Login from './components/login';       
import AdminLogin from './components/adminlogin'; 
import Register from './components/registro'
import Productos from './components/productos';
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
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/productos" element={<Productos />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
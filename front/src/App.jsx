import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Carrito from './components/carrito';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
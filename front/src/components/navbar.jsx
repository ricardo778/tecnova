import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styler.css/navbar.css';

function Navbar() {
  const location = useLocation();
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <i className="fas fa-laptop-code"></i>
        Tecnova
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active-link' : ''}>
            <i className="fas fa-home"></i>
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/productos" className={location.pathname === '/productos' ? 'active-link' : ''}>
            <i className="fas fa-box-open"></i>
            Productos
          </Link>
        </li>
        <li>
          <Link to="/carrito" className={location.pathname === '/carrito' ? 'active-link' : ''}>
            <i className="fas fa-shopping-cart"></i>
            Carrito
            <span className="cart-badge">3</span>
          </Link>
        </li>
        <li className="dropdown-container">
          <button 
            className={`dropdown-toggle ${showLoginDropdown ? 'active' : ''}`}
            onClick={() => setShowLoginDropdown(!showLoginDropdown)}
          >
            <i className="fas fa-sign-in-alt"></i>
            Iniciar sesión
            <i className={`fas fa-chevron-${showLoginDropdown ? 'up' : 'down'}`}></i>
          </button>
          {showLoginDropdown && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/login" onClick={() => setShowLoginDropdown(false)}>
                  <i className="fas fa-user"></i>
                  Usuario
                </Link>
              </li>
              <li>
                <Link to="/admin-login" onClick={() => setShowLoginDropdown(false)}>
                  <i className="fas fa-cog"></i>
                  Administrador
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/registro" className={location.pathname === '/registro' ? 'active-link' : ''}>
            <i className="fas fa-user-plus"></i>
            Registro
          </Link>
        </li>
      </ul>
      <div className="nav-profile">
        <div className="profile-icon-container">
          <i className="fas fa-user-circle profile-icon"></i>
        </div>
        <Link to="/perfil" className="profile-link">
          Perfil
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
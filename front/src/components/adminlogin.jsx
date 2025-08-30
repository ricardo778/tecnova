import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styler.css/loguin_admin.css';

function AdminLogin() {
  const [formData, setFormData] = useState({
    adminCode: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validaciones básicas
    if (!formData.adminCode || !formData.password) {
      setError('Por favor, completa todos los campos');
      setIsLoading(false);
      return;
    }

    // Simular proceso de login de administrador
    setTimeout(() => {
      // Simular credenciales válidas (en una app real esto vendría del backend)
      const isValidAdmin = formData.adminCode === 'ADMIN2024' && formData.password === 'AdminTecnova123!';
      
      if (isValidAdmin) {
        console.log('Login administrativo exitoso');
        navigate('/admin/dashboard'); // Redirigir al panel de administración
      } else {
        setError('Código de administrador o contraseña incorrectos');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-logo">
            <i className="fas fa-shield-alt"></i>
            <h1>Tecnova Admin</h1>
          </div>
          <h2>Acceso Administrativo</h2>
          <p>Área restringida para personal autorizado</p>
        </div>

        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="adminCode">
              <i className="fas fa-key"></i>
              Código de Administrador
            </label>
            <div className="input-with-icon">
              <i className="fas fa-id-card"></i>
              <input
                type="text"
                id="adminCode"
                name="adminCode"
                value={formData.adminCode}
                onChange={handleChange}
                placeholder="ADMIN-XXXX-XXXX"
                required
                className={error ? 'error' : ''}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <i className="fas fa-lock"></i>
              Contraseña de Administrador
            </label>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña administrativa"
                required
                className={error ? 'error' : ''}
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className={`admin-login-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Verificando credenciales...
              </>
            ) : (
              <>
                <i className="fas fa-unlock"></i>
                Acceder al Panel
              </>
            )}
          </button>
        </form>

        <div className="security-notice">
          <div className="security-header">
            <i className="fas fa-shield-check"></i>
            <h4>Medidas de Seguridad</h4>
          </div>
          <ul>
            <li><i className="fas fa-check-circle"></i> Acceso monitoreado 24/7</li>
            <li><i className="fas fa-check-circle"></i> Encriptación de extremo a extremo</li>
            <li><i className="fas fa-check-circle"></i> Registro de todas las actividades</li>
          </ul>
        </div>

        <div className="admin-login-footer">
          <p>
            <i className="fas fa-exclamation-triangle"></i>
            Esta área es exclusiva para personal autorizado de Tecnova
          </p>
          <p>
            ¿Eres usuario regular?{' '}
            <Link to="/login" className="user-login-link">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>

      <div className="admin-login-hero">
        <div className="admin-hero-content">
          <div className="admin-badge">
            <i className="fas fa-crown"></i>
          </div>
          <h2>Panel de Control Administrativo</h2>
          <p>Gestiona productos, usuarios y pedidos desde el panel de administración</p>
          
          <div className="admin-features">
            <div className="admin-feature">
              <i className="fas fa-boxes"></i>
              <div>
                <h4>Gestión de Productos</h4>
                <p>Administra el inventario y categorías</p>
              </div>
            </div>
            <div className="admin-feature">
              <i className="fas fa-users"></i>
              <div>
                <h4>Control de Usuarios</h4>
                <p>Gestiona cuentas y permisos</p>
              </div>
            </div>
            <div className="admin-feature">
              <i className="fas fa-chart-bar"></i>
              <div>
                <h4>Reportes y Analytics</h4>
                <p>Métricas de rendimiento y ventas</p>
              </div>
            </div>
          </div>

          <div className="emergency-contact">
            <h4>
              <i className="fas fa-life-ring"></i>
              Soporte Técnico
            </h4>
            <p>soporte@tecnova.com</p>
            <p>Ext. 100</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
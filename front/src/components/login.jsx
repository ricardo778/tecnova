import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styler.css/loguin_usu.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular proceso de login
    setTimeout(() => {
      console.log('Datos de login:', formData);
      setIsLoading(false);
      navigate('/'); // Redirigir al home después del login
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <i className="fas fa-laptop-code"></i>
            <h1>Tecnova</h1>
          </div>
          <h2>Bienvenido de nuevo</h2>
          <p>Ingresa a tu cuenta para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <div className="input-with-icon">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <i className="fas fa-lock"></i>
              Contraseña
            </label>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i> {/* Icono izquierdo */}
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
                required
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

          <div className="form-options">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span className="checkmark"></span>
              Recordar mi cuenta
            </label>

            <Link to="/forgot-password" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            className={`login-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Iniciando sesión...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Iniciar sesión
              </>
            )}
          </button>
        </form>

        <div className="login-divider">
          <span>o continúa con</span>
        </div>

        <div className="social-login">
          <button className="social-btn google-btn">
            <i className="fab fa-google"></i>
            Google
          </button>
          <button className="social-btn facebook-btn">
            <i className="fab fa-facebook-f"></i>
            Facebook
          </button>
        </div>

        <div className="login-footer">
          <p>
            ¿No tienes una cuenta?{' '}
            <Link to="/registro" className="register-link">
              Regístrate ahora
            </Link>
          </p>
        </div>
      </div>

      <div className="login-hero">
        <div className="hero-content">
          <h2>Descubre el mundo de la tecnología</h2>
          <p>Accede a las mejores ofertas y productos tecnológicos con tu cuenta Tecnova</p>
          <div className="hero-features">
            <div className="feature">
              <i className="fas fa-shield-alt"></i>
              <span>Cuenta segura</span>
            </div>
            <div className="feature">
              <i className="fas fa-bolt"></i>
              <span>Acceso rápido</span>
            </div>
            <div className="feature">
              <i className="fas fa-heart"></i>
              <span>Lista de deseos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
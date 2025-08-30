import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styler.css/registro.css';

function Register() {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    direccion: '',
    municipio: '',
    departamento: '',
    fechaNacimiento: '',
    genero: '',
    tipoDocumento: '',
    numeroDocumento: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const departamentosColombia = [
    'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá',
    'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó',
    'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila',
    'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander',
    'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia',
    'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada'
  ];

  const tiposDocumento = [
    'Cédula de Ciudadanía',
    'Cédula de Extranjería',
    'Pasaporte',
    'Tarjeta de Identidad',
    'Permiso Por Proteccion Temporal',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombreCompleto.trim()) {
      newErrors.nombreCompleto = 'El nombre completo es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!/^[0-9]{10}$/.test(formData.telefono)) {
      newErrors.telefono = 'El teléfono debe tener 10 dígitos';
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es requerida';
    }

    if (!formData.municipio.trim()) {
      newErrors.municipio = 'El municipio es requerido';
    }

    if (!formData.departamento) {
      newErrors.departamento = 'El departamento es requerido';
    }

    if (!formData.tipoDocumento) {
      newErrors.tipoDocumento = 'El tipo de documento es requerido';
    }

    if (!formData.numeroDocumento.trim()) {
      newErrors.numeroDocumento = 'El número de documento es requerido';
    }

    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida';
    } else {
      const birthDate = new Date(formData.fechaNacimiento);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 18) {
        newErrors.fechaNacimiento = 'Debes ser mayor de 18 años para registrarte';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simular proceso de registro
    setTimeout(() => {
      console.log('Datos de registro:', formData);
      setIsLoading(false);
      alert('¡Registro exitoso! Bienvenido a Tecnova');
      navigate('/');
    }, 2000);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <div className="register-logo">
            <i className="fas fa-laptop-code"></i>
            <h1>Crear Cuenta</h1>
          </div>
          <p>Únete a la comunidad Tecnova Colombia</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombreCompleto">
                <i className="fas fa-user"></i>
                Nombre Completo *
              </label>
              <input
                type="text"
                id="nombreCompleto"
                name="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={handleChange}
                placeholder="Juan Pérez García"
                className={errors.nombreCompleto ? 'error' : ''}
              />
              {errors.nombreCompleto && <span className="error-text">{errors.nombreCompleto}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <i className="fas fa-envelope"></i>
                Correo Electrónico *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tipoDocumento">
                <i className="fas fa-id-card"></i>
                Tipo de Documento *
              </label>
              <select
                id="tipoDocumento"
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleChange}
                className={errors.tipoDocumento ? 'error' : ''}
              >
                <option value="">Seleccionar tipo</option>
                {tiposDocumento.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
              {errors.tipoDocumento && <span className="error-text">{errors.tipoDocumento}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="numeroDocumento">
                <i className="fas fa-id-card"></i>
                Número de Documento *
              </label>
              <input
                type="text"
                id="numeroDocumento"
                name="numeroDocumento"
                value={formData.numeroDocumento}
                onChange={handleChange}
                placeholder="Número de documento"
                className={errors.numeroDocumento ? 'error' : ''}
              />
              {errors.numeroDocumento && <span className="error-text">{errors.numeroDocumento}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">
                <i className="fas fa-lock"></i>
                Contraseña *
              </label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mínimo 8 caracteres"
                  className={errors.password ? 'error' : ''}
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                <i className="fas fa-lock"></i>
                Confirmar Contraseña *
              </label>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repite tu contraseña"
                  className={errors.confirmPassword ? 'error' : ''}
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="telefono">
                <i className="fas fa-phone"></i>
                Teléfono *
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="10 dígitos"
                className={errors.telefono ? 'error' : ''}
              />
              {errors.telefono && <span className="error-text">{errors.telefono}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="fechaNacimiento">
                <i className="fas fa-calendar"></i>
                Fecha de Nacimiento *
              </label>
              <input
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                className={errors.fechaNacimiento ? 'error' : ''}
              />
              {errors.fechaNacimiento && <span className="error-text">{errors.fechaNacimiento}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="genero">
              <i className="fas fa-venus-mars"></i>
              Género
            </label>
            <select
              id="genero"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
            >
              <option value="">Seleccionar género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
              <option value="prefiero-no-decir">Prefiero no decir</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="direccion">
              <i className="fas fa-map-marker-alt"></i>
              Dirección *
            </label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              placeholder="Calle, número, barrio"
              className={errors.direccion ? 'error' : ''}
            />
            {errors.direccion && <span className="error-text">{errors.direccion}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="municipio">
                <i className="fas fa-building"></i>
                Municipio/Ciudad *
              </label>
              <input
                type="text"
                id="municipio"
                name="municipio"
                value={formData.municipio}
                onChange={handleChange}
                placeholder="Nombre del municipio o ciudad"
                className={errors.municipio ? 'error' : ''}
              />
              {errors.municipio && <span className="error-text">{errors.municipio}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="departamento">
                <i className="fas fa-map"></i>
                Departamento *
              </label>
              <select
                id="departamento"
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                className={errors.departamento ? 'error' : ''}
              >
                <option value="">Seleccionar departamento</option>
                {departamentosColombia.map(depto => (
                  <option key={depto} value={depto}>{depto}</option>
                ))}
              </select>
              {errors.departamento && <span className="error-text">{errors.departamento}</span>}
            </div>
          </div>

          <div className="form-terms">
            <label className="checkbox-container">
              <input type="checkbox" required />
              <span className="checkmark"></span>
              Acepto los <Link to="/terminos">Términos y Condiciones</Link> y la <Link to="/privacidad">Política de Privacidad</Link> *
            </label>
          </div>

          <button 
            type="submit" 
            className={`register-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Creando cuenta...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus"></i>
                Crear Cuenta
              </>
            )}
          </button>
        </form>

        <div className="register-footer">
          <p>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="login-link">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>

      <div className="register-hero">
        <div className="hero-content">
          <h2>Únete a Tecnova Colombia</h2>
          <p>Disfruta de estos beneficios al crear tu cuenta</p>
          
          <div className="benefits-list">
            <div className="benefit">
              <i className="fas fa-truck"></i>
              <div>
                <h4>Envío Gratis</h4>
                <p>En compras mayores a $200.000 COP</p>
              </div>
            </div>
            <div className="benefit">
              <i className="fas fa-percentage"></i>
              <div>
                <h4>Ofertas Exclusivas</h4>
                <p>Descuentos especiales para miembros</p>
              </div>
            </div>
            <div className="benefit">
              <i className="fas fa-heart"></i>
              <div>
                <h4>Lista de Deseos</h4>
                <p>Guarda tus productos favoritos</p>
              </div>
            </div>
            <div className="benefit">
              <i className="fas fa-history"></i>
              <div>
                <h4>Historial de Pedidos</h4>
                <p>Revisa tus compras anteriores</p>
              </div>
            </div>
          </div>

          <div className="security-notice">
            <i className="fas fa-shield-alt"></i>
            <p>Protegemos tus datos con encriptación de última generación</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
import React, { useState, useEffect } from 'react';
import '../styler.css/perfil.css';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [changePassword, setChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Datos de ejemplo del usuario
  useEffect(() => {
    const mockUserData = {
      personalInfo: {
        nombreCompleto: 'María González Rodríguez',
        email: 'maria.gonzalez@email.com',
        telefono: '+57 321 456 7890',
        fechaNacimiento: '1990-05-15',
        genero: 'Femenino',
        tipoDocumento: 'Cédula de Ciudadanía',
        numeroDocumento: '10.234.567.890'
      },
      address: {
        direccion: 'Carrera 45 # 26-85',
        municipio: 'Medellín',
        departamento: 'Antioquia',
        barrio: 'El Poblado'
      },
      orders: [
        {
          id: 'ORD-001',
          date: '2024-01-15',
          status: 'Entregado',
          total: 4299000,
          items: 3,
          products: [
            { name: 'Laptop Gaming ASUS ROG', quantity: 1 },
            { name: 'Mouse Inalámbrico', quantity: 1 },
            { name: 'Mouse Pad', quantity: 1 }
          ]
        },
        {
          id: 'ORD-002',
          date: '2024-01-10',
          status: 'En camino',
          total: 1599000,
          items: 1,
          products: [
            { name: 'Audífonos Sony WH-1000XM5', quantity: 1 }
          ]
        }
      ]
    };

    setTimeout(() => {
      setUserData(mockUserData);
      setLoading(false);
    }, 1000);
  }, []);

  // Formatear precio en pesos colombianos
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Manejar cambio en los campos de contraseña
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar errores al escribir
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validar formulario de contraseña
  const validatePasswordForm = () => {
    const errors = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'La contraseña actual es requerida';
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = 'La nueva contraseña es requerida';
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'Confirma tu nueva contraseña';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    return errors;
  };

  // Enviar formulario de cambio de contraseña
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    const errors = validatePasswordForm();
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }
    
    // Simular envío de formulario (en una app real, aquí se haría una petición al backend)
    console.log('Cambiando contraseña:', {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    });
    
    // Simular éxito
    setPasswordSuccess(true);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    // Ocultar mensaje de éxito después de 3 segundos
    setTimeout(() => {
      setPasswordSuccess(false);
      setChangePassword(false);
    }, 3000);
  };

  // Cancelar cambio de contraseña
  const handleCancelPassword = () => {
    setChangePassword(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordErrors({});
    setPasswordSuccess(false);
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Header del perfil */}
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            <i className="fas fa-user"></i>
          </div>
          <div className="profile-info">
            <h1>{userData.personalInfo.nombreCompleto}</h1>
            <p className="profile-email">{userData.personalInfo.email}</p>
            <div className="membership-badge">
              <i className="fas fa-user-circle"></i>
              Cliente
            </div>
          </div>
        </div>
        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-number">{userData.orders.length}</div>
            <div className="stat-label">Pedidos</div>
          </div>
        </div>
      </div>

      {/* Navegación por pestañas */}
      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          <i className="fas fa-user"></i>
          Información Personal
        </button>
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <i className="fas fa-shopping-bag"></i>
          Mis Pedidos
        </button>
        <button 
          className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <i className="fas fa-shield-alt"></i>
          Seguridad
        </button>
      </div>

      {/* Contenido de las pestañas */}
      <div className="profile-content">
        {activeTab === 'personal' && (
          <div className="tab-content">
            <div className="info-card">
              <h3>Información Personal</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Nombre Completo</label>
                  <p>{userData.personalInfo.nombreCompleto}</p>
                </div>
                <div className="info-item">
                  <label>Correo Electrónico</label>
                  <p>{userData.personalInfo.email}</p>
                </div>
                <div className="info-item">
                  <label>Teléfono</label>
                  <p>{userData.personalInfo.telefono}</p>
                </div>
                <div className="info-item">
                  <label>Fecha de Nacimiento</label>
                  <p>{formatDate(userData.personalInfo.fechaNacimiento)}</p>
                </div>
                <div className="info-item">
                  <label>Género</label>
                  <p>{userData.personalInfo.genero}</p>
                </div>
                <div className="info-item">
                  <label>Tipo de Documento</label>
                  <p>{userData.personalInfo.tipoDocumento}</p>
                </div>
                <div className="info-item">
                  <label>Número de Documento</label>
                  <p>{userData.personalInfo.numeroDocumento}</p>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>Dirección</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Dirección</label>
                  <p>{userData.address.direccion}</p>
                </div>
                <div className="info-item">
                  <label>Municipio/Ciudad</label>
                  <p>{userData.address.municipio}</p>
                </div>
                <div className="info-item">
                  <label>Departamento</label>
                  <p>{userData.address.departamento}</p>
                </div>
                <div className="info-item">
                  <label>Barrio</label>
                  <p>{userData.address.barrio}</p>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button className="edit-btn">
                <i className="fas fa-edit"></i>
                Editar Información
              </button>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="tab-content">
            <h3>Historial de Pedidos</h3>
            {userData.orders.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-shopping-bag"></i>
                <p>No tienes pedidos realizados</p>
              </div>
            ) : (
              <div className="orders-list">
                {userData.orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <span className="order-id">Pedido #{order.id}</span>
                        <span className="order-date">{formatDate(order.date)}</span>
                      </div>
                      <div className="order-status">
                        <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="order-details">
                      <div className="order-products">
                        {order.products.map((product, index) => (
                          <span key={index} className="product-name">
                            {product.name} {product.quantity > 1 ? `(x${product.quantity})` : ''}
                          </span>
                        ))}
                      </div>
                      <div className="order-total">
                        {formatPrice(order.total)}
                      </div>
                    </div>
                    <div className="order-actions">
                      <button className="view-order-btn">
                        <i className="fas fa-eye"></i>
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'security' && (
          <div className="tab-content">
            <div className="info-card">
              <h3>Configuración de Seguridad</h3>
              <div className="security-settings">
                {passwordSuccess && (
                  <div className="security-message success">
                    <i className="fas fa-check-circle"></i>
                    <div className="message-content">
                      <h4>¡Contraseña actualizada!</h4>
                      <p>Tu contraseña ha sido cambiada exitosamente.</p>
                    </div>
                  </div>
                )}
                
                {!changePassword ? (
                  <div className="security-option">
                    <div className="security-info">
                      <i className="fas fa-lock"></i>
                      <div className="security-details">
                        <h4>Cambiar Contraseña</h4>
                        <p>Actualiza tu contraseña de acceso regularmente para mantener tu cuenta segura</p>
                      </div>
                    </div>
                    <button 
                      className="change-btn"
                      onClick={() => setChangePassword(true)}
                    >
                      Cambiar
                    </button>
                  </div>
                ) : (
                  <form className="password-form" onSubmit={handlePasswordSubmit}>
                    <div className="form-group">
                      <label htmlFor="currentPassword">Contraseña Actual</label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className={passwordErrors.currentPassword ? 'error' : ''}
                        placeholder="Ingresa tu contraseña actual"
                      />
                      {passwordErrors.currentPassword && (
                        <span className="error-message">{passwordErrors.currentPassword}</span>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="newPassword">Nueva Contraseña</label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className={passwordErrors.newPassword ? 'error' : ''}
                        placeholder="Ingresa tu nueva contraseña"
                      />
                      {passwordErrors.newPassword && (
                        <span className="error-message">{passwordErrors.newPassword}</span>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className={passwordErrors.confirmPassword ? 'error' : ''}
                        placeholder="Confirma tu nueva contraseña"
                      />
                      {passwordErrors.confirmPassword && (
                        <span className="error-message">{passwordErrors.confirmPassword}</span>
                      )}
                    </div>
                    
                    <div className="form-actions">
                      <button type="button" className="cancel-btn" onClick={handleCancelPassword}>
                        Cancelar
                      </button>
                      <button type="submit" className="save-btn">
                        Guardar Cambios
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
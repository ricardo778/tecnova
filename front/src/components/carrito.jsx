import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styler.css/carrito.css';

function Carrito() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Laptop Gaming ASUS ROG",
      price: 4299000,
      originalPrice: 4799000,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxhcHRvcCUyMGdhbWluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&q=80",
      category: "laptops",
      description: "Intel Core i7, 16GB RAM, RTX 3060, 512GB SSD"
    },
    {
      id: 2,
      name: "iPhone 15 Pro Max",
      price: 5999000,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGlwaG9uZSUyMDE1JTIwcHJvfGVufDB8fDB8fHww&auto=format&fit=crop&w=100&q=80",
      category: "smartphones",
      description: "256GB, Titanio, Cámara Triple 48MP"
    }
  ]);

  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener datos del usuario desde localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      const user = JSON.parse(localStorage.getItem('tecnovaUser')) || {
        name: 'Juan Pérez',
        email: 'juan.perez@email.com',
        phone: '+57 300 123 4567',
        address: 'Calle 123 #45-67',
        city: 'Bogotá'
      };
      
      setUserData(user);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Calcular totales
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discount = discountApplied ? subtotal * 0.1 : 0; // 10% de descuento si se aplica
  const tax = (subtotal - discount) * 0.16; // 16% de impuestos
  const total = subtotal - discount + tax;

  // Formatear precio en pesos colombianos
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Eliminar producto del carrito
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Aplicar descuento
  const applyDiscount = () => {
    if (discountCode.toUpperCase() === 'TECNOVA10') {
      setDiscountApplied(true);
      alert('¡Descuento aplicado! 10% de descuento en tu compra.');
    } else {
      alert('Código de descuento inválido. Intenta con TECNOVA10');
    }
  };

  // Proceder al pago
  const handleCheckout = () => {
    if (!userData) {
      alert('Por favor inicia sesión para proceder al pago');
      navigate('/login');
      return;
    }

    // Guardar en localStorage para persistencia
    localStorage.setItem('tecnovaCart', JSON.stringify(cartItems));
    
    // Navegar a la página de factura con los datos
    navigate('/factura', { 
      state: { 
        cartItems, 
        customerInfo: userData 
      } 
    });
  };

  if (loading) {
    return (
      <div className="carrito-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Cargando información...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <div className="carrito-header">
        <h1><i className="fas fa-shopping-cart"></i> Mi Carrito</h1>
        <p>{cartItems.length} producto{cartItems.length !== 1 ? 's' : ''} en tu carrito</p>
      </div>

      <div className="carrito-content">
        <div className="carrito-items">
          {cartItems.length === 0 ? (
            <div className="carrito-vacio">
              <i className="fas fa-shopping-cart"></i>
              <h2>Tu carrito está vacío</h2>
              <p>Agrega algunos productos para comenzar</p>
              <Link to="/productos" className="btn-primary">
                <i className="fas fa-shopping-bag"></i> Ver Productos
              </Link>
            </div>
          ) : (
            <>
              {cartItems.map(item => (
                <div key={item.id} className="carrito-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    <p className="item-category">{item.category}</p>
                    <p className="item-price">{formatPrice(item.price)}</p>
                    {item.originalPrice && (
                      <p className="item-original-price">{formatPrice(item.originalPrice)}</p>
                    )}
                  </div>
                  <div className="item-quantity">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  <div className="item-total">
                    <p>{formatPrice(item.price * item.quantity)}</p>
                  </div>
                  <div className="item-actions">
                    <button 
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="carrito-summary">
            <div className="summary-card">
              <h2>Resumen de compra</h2>
              
              <div className="summary-line">
                <span>Subtotal:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              {discountApplied && (
                <div className="summary-line discount">
                  <span>Descuento (10%):</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              
              <div className="summary-line">
                <span>Impuestos (16%):</span>
                <span>{formatPrice(tax)}</span>
              </div>
              
              <div className="summary-line total">
                <span>Total:</span>
                <span>{formatPrice(total)}</span>
              </div>

              <div className="discount-input">
                <input 
                  type="text" 
                  placeholder="Código de descuento" 
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  disabled={discountApplied}
                />
                <button 
                  className="apply-btn"
                  onClick={applyDiscount}
                  disabled={discountApplied}
                >
                  {discountApplied ? 'Aplicado' : 'Aplicar'}
                </button>
              </div>

              <button 
                className="checkout-btn" 
                onClick={handleCheckout}
                disabled={!userData}
              >
                <i className="fas fa-lock"></i> 
                {userData ? 'Proceder al Pago' : 'Inicia sesión para pagar'}
              </button>

              <Link to="/productos" className="continue-shopping">
                <i className="fas fa-arrow-left"></i> Seguir comprando
              </Link>
            </div>

            <div className="security-info">
              <div className="security-item">
                <i className="fas fa-shield-alt"></i>
                <div>
                  <h4>Compra segura</h4>
                  <p>Protegemos tus datos personales</p>
                </div>
              </div>
              <div className="security-item">
                <i className="fas fa-truck"></i>
                <div>
                  <h4>Envío gratis</h4>
                  <p>En compras mayores a $500.000</p>
                </div>
              </div>
              <div className="security-item">
                <i className="fas fa-undo"></i>
                <div>
                  <h4>Devoluciones</h4>
                  <p>30 días para cambiar de opinión</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carrito;
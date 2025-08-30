import React from 'react';
import { Link } from 'react-router-dom';
import '../styler.css/carrito.css';

function Carrito() {
  // Datos de ejemplo para el carrito
  const cartItems = [
    {
      id: 1,
      name: "Laptop Gaming Pro",
      price: 1299.99,
      quantity: 1,
      image: "https://placehold.co/100x100/4776E6/FFFFFF?text=L",
      category: "Computadoras"
    },
    {
      id: 2,
      name: "Smartphone Ultra",
      price: 899.99,
      quantity: 2,
      image: "https://placehold.co/100x100/8E54E9/FFFFFF?text=S",
      category: "Celulares"
    },
    {
      id: 3,
      name: "Audífonos Bluetooth",
      price: 159.99,
      quantity: 1,
      image: "https://placehold.co/100x100/FF3366/FFFFFF?text=A",
      category: "Accesorios"
    }
  ];

  // Calcular totales
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.16; // 16% de impuestos
  const total = subtotal + tax;

  return (
    <div className="carrito-container">
      <div className="carrito-header">
        <h1><i className="fas fa-shopping-cart"></i> Mi Carrito</h1>
        <p>{cartItems.length} productos en tu carrito</p>
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
                    <p className="item-category">{item.category}</p>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="item-quantity">
                    <button className="quantity-btn">
                      <i className="fas fa-minus"></i>
                    </button>
                    <span>{item.quantity}</span>
                    <button className="quantity-btn">
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  <div className="item-total">
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="item-actions">
                    <button className="remove-btn">
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
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-line">
                <span>Impuestos (16%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div className="summary-line total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="discount-input">
                <input 
                  type="text" 
                  placeholder="Código de descuento" 
                />
                <button className="apply-btn">Aplicar</button>
              </div>

              <button className="checkout-btn">
                <i className="fas fa-lock"></i> Proceder al Pago
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
                  <p>En compras mayores a $500</p>
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
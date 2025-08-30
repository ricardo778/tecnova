import React, { useState } from 'react';
import '../styler.css/factura.css';

function Factura() {
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);
  const [metodoPago, setMetodoPago] = useState('tarjeta');

  // Datos de ejemplo
  const productos = [
    {
      id: 1,
      nombre: "Laptop Gaming Pro",
      descripcion: "Intel Core i7, 16GB RAM, RTX 3060",
      categoria: "COMPUTADORAS",
      precio: 4299000,
      cantidad: 1,
      imagen: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 2,
      nombre: "Smartphone Ultra",
      descripcion: "256GB, Titanio, Cámara Triple 48MP",
      categoria: "CELULARES",
      precio: 2999000,
      cantidad: 1,
      imagen: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  ];

  const datosCliente = {
    nombre: "Juan Pérez",
    email: "juan.perez@email.com",
    telefono: "+57 300 123 4567",
    direccion: "Calle 123 #45-67, Bogotá"
  };

  const subtotal = productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  const impuestos = subtotal * 0.16;
  const total = subtotal + impuestos;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleConfirmarPedido = () => {
    setPedidoConfirmado(true);
    // Aquí iría la lógica para procesar el pedido
  };

  return (
    <div className="factura-container">
      <div className="factura-content">
        {/* Encabezado de la factura */}
        <div className="factura-header">
          <div className="logo">
            <i className="fas fa-laptop"></i>
            <h1>Tecnova</h1>
          </div>
          <div className="invoice-info">
            <h2>Factura de Compra</h2>
            <p>Nº: TN-2023-00125</p>
            <p>Fecha: {new Date().toLocaleDateString('es-ES')}</p>
          </div>
        </div>

        {/* Información del cliente */}
        <div className="customer-section">
          <h3><i className="fas fa-user"></i> Información del Cliente</h3>
          <div className="customer-details">
            <div className="detail-group">
              <label>Nombre:</label>
              <span>{datosCliente.nombre}</span>
            </div>
            <div className="detail-group">
              <label>Email:</label>
              <span>{datosCliente.email}</span>
            </div>
            <div className="detail-group">
              <label>Teléfono:</label>
              <span>{datosCliente.telefono}</span>
            </div>
            <div className="detail-group">
              <label>Dirección de envío:</label>
              <span>{datosCliente.direccion}</span>
            </div>
          </div>
        </div>

        {/* Productos */}
        <div className="products-section">
          <h3><i className="fas fa-shopping-cart"></i> Productos</h3>
          <table className="products-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(producto => (
                <tr key={producto.id}>
                  <td>
                    <div className="product-info">
                      <img src={producto.imagen} alt={producto.nombre} />
                      <div>
                        <div className="product-name">{producto.nombre}</div>
                        <div className="product-description">{producto.descripcion}</div>
                        <div className="product-category">{producto.categoria}</div>
                      </div>
                    </div>
                  </td>
                  <td>{formatPrice(producto.precio)}</td>
                  <td>{producto.cantidad}</td>
                  <td>{formatPrice(producto.precio * producto.cantidad)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Resumen de compra */}
        <div className="payment-summary">
          <h3><i className="fas fa-receipt"></i> Resumen de Compra</h3>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Impuestos (16%):</span>
            <span>{formatPrice(impuestos)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        {/* Métodos de pago */}
        <div className="payment-methods">
          <h3><i className="fas fa-credit-card"></i> Método de Pago</h3>
          <p>Selecciona tu método de pago preferido:</p>
          
          <div className="payment-options">
            <div 
              className={`payment-option ${metodoPago === 'tarjeta' ? 'selected' : ''}`}
              onClick={() => setMetodoPago('tarjeta')}
            >
              <div className="payment-icon">
                <i className="fas fa-credit-card"></i>
              </div>
              <div className="payment-details">
                <h4>Tarjeta de Crédito/Débito</h4>
                <p>Pago seguro con tarjeta</p>
              </div>
              {metodoPago === 'tarjeta' && <div className="payment-check"><i className="fas fa-check-circle"></i></div>}
            </div>
            
            <div 
              className={`payment-option ${metodoPago === 'transferencia' ? 'selected' : ''}`}
              onClick={() => setMetodoPago('transferencia')}
            >
              <div className="payment-icon">
                <i className="fas fa-university"></i>
              </div>
              <div className="payment-details">
                <h4>Transferencia Bancaria</h4>
                <p>Transferencia directa desde tu banco</p>
              </div>
              {metodoPago === 'transferencia' && <div className="payment-check"><i className="fas fa-check-circle"></i></div>}
            </div>
          </div>

          {metodoPago === 'tarjeta' && (
            <div className="credit-card-form">
              <h4>Información de Tarjeta</h4>
              <div className="form-group">
                <label>Número de Tarjeta</label>
                <input type="text" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Fecha de Expiración</label>
                  <input type="text" placeholder="MM/AA" />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input type="text" placeholder="123" />
                </div>
              </div>
              <div className="form-group">
                <label>Nombre del Titular</label>
                <input type="text" placeholder="Como aparece en la tarjeta" />
              </div>
            </div>
          )}

          {metodoPago === 'transferencia' && (
            <div className="payment-instructions">
              <h4>Instrucciones para Transferencia</h4>
              <p>Realiza la transferencia a la siguiente cuenta:</p>
              <p><strong>Banco:</strong> Banco Nacional</p>
              <p><strong>Tipo de Cuenta:</strong> Corriente</p>
              <p><strong>Número de Cuenta:</strong> 123-456789-00</p>
              <p><strong>Titular:</strong> Tecnova SAS</p>
              <p><strong>Referencia:</strong> TN-2023-00125</p>
              <p>Una vez realizada la transferencia, tu pedido será procesado en un plazo de 24 horas.</p>
            </div>
          )}
        </div>

        {/* Confirmación de pedido */}
        <div className="confirmation-section">
          {pedidoConfirmado ? (
            <div className="confirmation-success">
              <i className="fas fa-check-circle"></i>
              <h2>¡Pedido Confirmado!</h2>
              <p>Tu pedido ha sido procesado exitosamente. Hemos enviado un correo con los detalles de tu compra.</p>
              <p>Número de seguimiento: <strong>TN-2023-00125</strong></p>
              <button className="btn print-btn" onClick={() => window.print()}>
                <i className="fas fa-print"></i> Imprimir Factura
              </button>
            </div>
          ) : (
            <>
              <h2>Confirmar Pedido</h2>
              <p>Revisa que toda la información sea correcta antes de confirmar tu pedido.</p>
              <div className="action-buttons">
                <button className="btn print-btn" onClick={() => window.print()}>
                  <i className="fas fa-print"></i> Imprimir
                </button>
                <button className="btn confirm-payment-btn" onClick={handleConfirmarPedido}>
                  <i className="fas fa-check"></i> Confirmar Pedido
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Factura;
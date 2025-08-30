import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styler.css/detalle_producto.css';

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Datos de ejemplo de productos
  const mockProducts = [
    {
      id: 1,
      name: 'Laptop Gaming ASUS ROG',
      price: 4299000,
      originalPrice: 4799000,
      description: 'Intel Core i7, 16GB RAM, RTX 3060, 512GB SSD',
      detailedDescription: 'La Laptop Gaming ASUS ROG es una máquina de alto rendimiento diseñada para gamers y profesionales. Cuenta con un procesador Intel Core i7 de última generación, 16GB de RAM DDR4, tarjeta gráfica NVIDIA GeForce RTX 3060 con 6GB GDDR6 y almacenamiento SSD NVMe de 512GB para tiempos de carga ultrarrápidos.',
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxaptG9wJTIwZ2FtaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80',
      category: 'laptops',
      stock: 15,
      rating: 4.8,
      reviews: 124,
      isNew: true,
      discount: 10,
      features: [
        'Procesador Intel Core i7 de 11va generación',
        '16GB RAM DDR4 3200MHz',
        'NVIDIA GeForce RTX 3060 6GB GDDR6',
        'SSD NVMe PCIe de 512GB',
        'Pantalla IPS 15.6" Full HD 144Hz',
        'Teclado RGB retroiluminado',
        'Sistema de enfriamiento avanzado',
        'Windows 11 preinstalado'
      ],
      specifications: {
        'Marca': 'ASUS',
        'Modelo': 'ROG Strix G15',
        'Pantalla': '15.6" IPS Full HD 144Hz',
        'Procesador': 'Intel Core i7-11800H',
        'Gráficos': 'NVIDIA GeForce RTX 3060 6GB',
        'RAM': '16GB DDR4 3200MHz',
        'Almacenamiento': '512GB NVMe SSD',
        'Sistema Operativo': 'Windows 11 Home',
        'Puertos': 'USB-C, USB 3.2, HDMI, Ethernet',
        'Conectividad': 'Wi-Fi 6, Bluetooth 5.1',
        'Batería': '4 celdas, 90Wh'
      }
    },
    {
      id: 2,
      name: 'iPhone 15 Pro Max',
      price: 5999000,
      description: '256GB, Titanio, Cámara Triple 48MP',
      detailedDescription: 'El iPhone 15 Pro Max redefine lo que un smartphone puede hacer. Fabricado en titanio aerospace-grade, ofrece una durabilidad excepcional con un diseño ligero. Su sistema de cámaras Pro permite capturar fotos con increíble detalle y videos cinematográficos.',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGlwaG9uZSUyMDE1JTIwcHJvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80',
      category: 'smartphones',
      stock: 8,
      rating: 4.9,
      reviews: 89,
      isNew: true,
      features: [
        'Chip A17 Pro con GPU más rápida',
        'Diseño de titanio aerospace-grade',
        'Sistema de cámara Pro con 48MP',
        'Video cinematográfico en 4K',
        'Dynamic Island para alertas en tiempo real',
        'Pantalla Super Retina XDR con ProMotion',
        'USB-C para carga y transferencia de datos',
        'iOS 17 con nuevas funciones'
      ],
      specifications: {
        'Marca': 'Apple',
        'Modelo': 'iPhone 15 Pro Max',
        'Pantalla': '6.7" Super Retina XDR OLED',
        'Procesador': 'A17 Pro chip',
        'Almacenamiento': '256GB',
        'Cámaras': '48MP Principal, 12MP Ultra Wide, 12MP Telephoto',
        'Video': '4K HDR Dolby Vision',
        'Conectividad': '5G, Wi-Fi 6E, Bluetooth 5.3',
        'Materiales': 'Titanio aerospace-grade',
        'Resistencia': 'IP68 agua y polvo',
        'Biometría': 'Face ID'
      }
    },
    {
      id: 3,
      name: 'Samsung Galaxy Tab S9',
      price: 2899000,
      originalPrice: 3299000,
      description: '12.4", 8GB RAM, 256GB, S Pen incluido',
      detailedDescription: 'La Samsung Galaxy Tab S9 es la tableta definitiva para productividad y entretenimiento. Con una impresionante pantalla Dynamic AMOLED 2X de 12.4", potenciada por el Snapdragon 8 Gen 2 y 8GB de RAM, ofrece un rendimiento excepcional para multitarea y aplicaciones exigentes.',
      image: 'https://images.unsplash.com/photo-1626700051175-681801c01b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Ftc3VuZyUyMHRhYlxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80',
      category: 'tablets',
      stock: 22,
      rating: 4.7,
      reviews: 67,
      discount: 12,
      features: [
        'Pantalla Dynamic AMOLED 2X de 12.4"',
        'Procesador Snapdragon 8 Gen 2',
        '8GB RAM y 256GB almacenamiento',
        'S Pen incluido con baja latencia',
        'Batería de 11200 mAh',
        'Cámaras traseras de 13MP + 6MP',
        'Cámara frontal ultra wide de 12MP',
        'Quad speakers con sonido Dolby Atmos'
      ],
      specifications: {
        'Marca': 'Samsung',
        'Modelo': 'Galaxy Tab S9',
        'Pantalla': '12.4" Dynamic AMOLED 2X, 120Hz',
        'Procesador': 'Snapdragon 8 Gen 2',
        'RAM': '8GB',
        'Almacenamiento': '256GB (expandible)',
        'Cámaras Traseras': '13MP + 6MP ultra wide',
        'Cámara Frontal': '12MP ultra wide',
        'Batería': '11200 mAh',
        'Sistema Operativo': 'Android 13 con One UI',
        'Conectividad': 'Wi-Fi 6E, Bluetooth 5.3',
        'Incluye': 'S Pen, Cargador rápido'
      }
    }
  ];

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        // Obtener productos relacionados (misma categoría)
        const related = mockProducts.filter(p => 
          p.id !== parseInt(id) && p.category === foundProduct.category
        );
        setRelatedProducts(related.slice(0, 3));
      }
      setLoading(false);
    }, 500);
  }, [id]);

  // Formatear precio en pesos colombianos
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart(product, quantity);
      alert(`¡${quantity} ${product.name} añadido al carrito!`);
    } else {
      alert('Funcionalidad de carrito no disponible');
    }
  };

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <i className="fas fa-exclamation-circle"></i>
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no está disponible.</p>
        <Link to="/productos" className="back-to-products">
          <i className="fas fa-arrow-left"></i>
          Volver a productos
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <nav className="breadcrumb">
        <Link to="/">Inicio</Link>
        <span>/</span>
        <Link to="/productos">Productos</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      <div className="product-detail-content">
        {/* Imagen del producto (solo una) */}
        <div className="product-image-single">
          <div className="main-image">
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        {/* Información del producto */}
        <div className="product-info-detail">
          {/* Badges */}

          <h1 className="product-title">{product.name}</h1>

          {/* Precio */}
          <div className="product-price-detail">
            {product.originalPrice ? (
              <>
                <span className="current-price">{formatPrice(product.price)}</span>
                <span className="original-price">{formatPrice(product.originalPrice)}</span>
                {product.discount && (
                  <span className="discount-amount">Ahorras {formatPrice(product.originalPrice - product.price)}</span>
                )}
              </>
            ) : (
              <span className="current-price">{formatPrice(product.price)}</span>
            )}
          </div>

          {/* Descripción corta */}
          <p className="product-description">{product.description}</p>

          {/* Descripción detallada */}
          <div className="product-description-detail">
            <h3>Descripción</h3>
            <p>{product.detailedDescription}</p>
          </div>

          {/* Características principales */}
          {product.features && (
            <div className="product-features">
              <h3>Características principales</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>
                    <i className="fas fa-check"></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stock y cantidad */}
          <div className="product-stock-detail">
            <div className="stock-info">
              <i className="fas fa-box"></i>
              <span className={product.stock < 5 ? 'low-stock' : 'in-stock'}>
                {product.stock < 5 ? `Solo ${product.stock} disponibles` : 'En stock'}
              </span>
            </div>

            <div className="quantity-selector">
              <label htmlFor="quantity">Cantidad:</label>
              <div className="quantity-controls">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <input 
                  type="number" 
                  id="quantity"
                  min="1" 
                  max={product.stock} 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                />
                <button 
                  onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                  disabled={quantity >= product.stock}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Acciones - SOLO AÑADIR AL CARRITO */}
          <div className="product-actions-detail">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <i className="fas fa-shopping-cart"></i>
              Añadir al carrito
            </button>
          </div>

          {/* Garantía y envío */}
          <div className="product-benefits">
            <div className="benefit">
              <i className="fas fa-truck"></i>
              <span>Envío gratis en órdenes superiores a $200.000</span>
            </div>
            <div className="benefit">
              <i className="fas fa-shield-alt"></i>
              <span>Garantía de 12 meses con el fabricante</span>
            </div>
            <div className="benefit">
              <i className="fas fa-undo"></i>
              <span>Devoluciones gratis dentro de los 30 días</span>
            </div>
          </div>
        </div>
      </div>

      {/* Especificaciones técnicas */}
      {product.specifications && (
        <div className="product-specifications">
          <h2>Especificaciones técnicas</h2>
          <div className="specs-grid">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="spec-item">
                <span className="spec-name">{key}:</span>
                <span className="spec-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Productos relacionados */}
      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h2>Productos relacionados</h2>
          <div className="related-grid">
            {relatedProducts.map(relatedProduct => (
              <div key={relatedProduct.id} className="related-item">
                <Link to={`/producto/${relatedProduct.id}`}>
                  <img src={relatedProduct.image} alt={relatedProduct.name} />
                  <h4>{relatedProduct.name}</h4>
                  <div className="related-price">
                    {formatPrice(relatedProduct.price)}
                    {relatedProduct.originalPrice && (
                      <span className="related-original-price">
                        {formatPrice(relatedProduct.originalPrice)}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
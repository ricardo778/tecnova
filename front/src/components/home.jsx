import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styler.css/home.css';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Datos de ejemplo
  useEffect(() => {
    const timer = setTimeout(() => {
      // Productos destacados
      const products = [
        {
          id: 1,
          name: 'Laptop Gaming ASUS ROG',
          price: 4299000,
          originalPrice: 4799000,
          description: 'Intel Core i7, 16GB RAM, RTX 3060, 512GB SSD',
          image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxhcHRvcCUyMGdhbWluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
          category: 'laptops',
          stock: 15,
          rating: 4.8,
          reviews: 124,
          isNew: true,
          discount: 10
        },
        {
          id: 2,
          name: "iPhone 15 Pro Max",
          price: 5999000,
          description: "256GB, Titanio, Cámara Triple 48MP",
          image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGlwaG9uZSUyMDE1JTIwcHJvfGVufDB8fDB8fHww&auto=format&fit=crop&w=100&q=80",
          category: "smartphones",
          stock: 8,
          rating: 4.9,
          reviews: 89,
          isNew: true
        },
        {
          id: 3,
          name: 'Samsung Galaxy Tab S9',
          price: 2899000,
          originalPrice: 3299000,
          description: '12.4", 8GB RAM, 256GB, S Pen incluido',
          image: 'https://images.unsplash.com/photo-1623125016174-8b3b527d0e63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRhYmxldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
          category: 'tablets',
          stock: 22,
          rating: 4.7,
          reviews: 67,
          discount: 12
        }
      ];

      // Categorías
      const categoriesData = [
        {
          id: 1,
          name: 'Laptops',
          icon: 'fas fa-laptop',
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80',
          count: 24
        },
        {
          id: 2,
          name: 'Smartphones',
          icon: 'fas fa-mobile-alt',
          image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80',
          count: 36
        },
        {
          id: 3,
          name: 'Tablets',
          icon: 'fas fa-tablet-alt',
          image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGFibGV0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80',
          count: 18
        },
        {
          id: 4,
          name: 'Audio',
          icon: 'fas fa-headphones',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80',
          count: 42
        }
      ];

      setFeaturedProducts(products);
      setCategories(categoriesData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Formatear precio
  const formatPrice = (price) => {
    return `$ ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  if (loading) {
    return (
      <div className="home-loading">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Bienvenido a <span className="brand">Tecnova</span></h1>
            <p>Descubre la mejor tecnología al mejor precio. Encuentra laptops, smartphones, tablets y más con envío gratis y garantía.</p>
            <div className="hero-buttons">
              <Link to="/productos" className="btn-primary">
                <i className="fas fa-shopping-bag"></i> Ver Productos
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRlY2hub2xvZ2lhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80" alt="Tecnología" />
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Categorías Populares</h2>
          <p>Explora nuestras categorías más populares</p>
        </div>
        <div className="categories-grid">
          {categories.map(category => (
            <Link key={category.id} to={`/productos?category=${category.name.toLowerCase()}`} className="category-card">
              <div className="category-image">
                <img src={category.image} alt={category.name} />
                <div className="category-overlay">
                  <i className={category.icon}></i>
                </div>
              </div>
              <div className="category-info">
                <h3>{category.name}</h3>
                <p>{category.count} productos</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="featured-products-section">
        <div className="section-header">
          <h2>Productos Destacados</h2>
          <p>Los productos más populares de nuestra tienda</p>
        </div>
        <div className="home-products-grid">
          {featuredProducts.map(product => (
            <div key={product.id} className="home-product-card">
              <div className="home-product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="home-product-info">
                <h3>{product.name}</h3>
                <p className="home-product-description">{product.description}</p>
                <div className="home-product-rating">
                  <span className="home-rating-text">({product.reviews})</span>
                </div>
                <div className="home-product-price">
                  {product.originalPrice ? (
                    <>
                      <span className="home-current-price">{formatPrice(product.price)}</span>
                      <span className="home-original-price">{formatPrice(product.originalPrice)}</span>
                    </>
                  ) : (
                    <span className="home-current-price">{formatPrice(product.price)}</span>
                  )}
                </div>
              </div>
              <div className="home-product-actions">
                <Link to={`/producto/${product.id}`} className="home-view-details-btn">
                  <i className="fas fa-info-circle"></i> Ver detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="section-footer">
          <Link to="/productos" className="btn-primary">
            Ver todos los productos
          </Link>
        </div>
      </section>

      {/* Beneficios */}
      <section className="benefits-section">
        <div className="section-header">
          <h2>¿Por qué elegir Tecnova?</h2>
          <p>Las ventajas de comprar en nuestra tienda</p>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-truck"></i>
            </div>
            <h3>Envío Gratis</h3>
            <p>En compras superiores a $200.000 en todo Colombia</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Garantía</h3>
            <p>12 meses de garantía en todos nuestros productos</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-undo"></i>
            </div>
            <h3>Devoluciones</h3>
            <p>30 días para cambiar de opinión sin problemas</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-lock"></i>
            </div>
            <h3>Pago Seguro</h3>
            <p>Procesamos tus pagos con la máxima seguridad</p>
          </div>
        </div>
      </section>

      {/* Ofertas Especiales */}
      <section className="offers-section">
        <div className="offer-banner">
          <div className="offer-content">
            <h2>Oferta Especial</h2>
            <h3>Hasta 40% OFF en Laptops Gaming</h3>
            <p>Solo por tiempo limitado. Aprovecha ahora mismo.</p>
            <Link to="/productos?category=laptops" className="btn-primary">
              Ver Ofertas
            </Link>
          </div>
          <div className="offer-image">
            <img src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bGFwdG9wJTIwZ2FtaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80" alt="Oferta Laptops" />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Suscríbete a nuestro newsletter</h2>
          <p>Recibe las últimas novedades, ofertas exclusivas y descuentos especiales</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Tu correo electrónico" />
            <button className="btn-primary">Suscribirse</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
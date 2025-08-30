import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styler.css/productos.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Categorías de productos
  const categories = [
    'todos',
    'laptops',
    'smartphones',
    'tablets',
    'accesorios',
    'audio',
    'gaming'
  ];

  // Datos de ejemplo de productos
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: 'Laptop Gaming ASUS ROG',
        price: 4299000,
        originalPrice: 4799000,
        description: 'Intel Core i7, 16GB RAM, RTX 3060, 512GB SSD',
        image: 'https://placehold.co/300x200/4776E6/FFFFFF?text=Laptop+Gaming',
        category: 'laptops',
        stock: 15,
        rating: 4.8,
        reviews: 124,
        isNew: true,
        discount: 10
      },
      {
        id: 2,
        name: 'iPhone 15 Pro Max',
        price: 5999000,
        description: '256GB, Titanio, Cámara Triple 48MP',
        image: 'https://placehold.co/300x200/8E54E9/FFFFFF?text=iPhone+15',
        category: 'smartphones',
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
        image: 'https://placehold.co/300x200/FF3366/FFFFFF?text=Tablet+S9',
        category: 'tablets',
        stock: 22,
        rating: 4.7,
        reviews: 67,
        discount: 12
      },
      {
        id: 4,
        name: 'Audífonos Sony WH-1000XM5',
        price: 1599000,
        description: 'Cancelación de ruido, 30h batería',
        image: 'https://placehold.co/300x200/43cea2/FFFFFF?text=Audífonos+Sony',
        category: 'audio',
        stock: 30,
        rating: 4.8,
        reviews: 156
      },
      {
        id: 5,
        name: 'Teclado Mecánico Razer',
        price: 899000,
        originalPrice: 1099000,
        description: 'RGB, switches mecánicos, anti-ghosting',
        image: 'https://placehold.co/300x200/185a9d/FFFFFF?text=Teclado+Razer',
        category: 'accesorios',
        stock: 45,
        rating: 4.6,
        reviews: 203,
        discount: 18
      },
      {
        id: 6,
        name: 'PlayStation 5',
        price: 2599000,
        description: '1TB, Control DualSense, 4K',
        image: 'https://placehold.co/300x200/FF8A5B/FFFFFF?text=PS5',
        category: 'gaming',
        stock: 5,
        rating: 4.9,
        reviews: 312,
        isNew: true
      },
      {
        id: 7,
        name: 'Monitor LG UltraGear',
        price: 1899000,
        originalPrice: 2199000,
        description: '27" 4K, 144Hz, IPS, G-Sync',
        image: 'https://placehold.co/300x200/4776E6/FFFFFF?text=Monitor+LG',
        category: 'accesorios',
        stock: 18,
        rating: 4.7,
        reviews: 98,
        discount: 14
      },
      {
        id: 8,
        name: 'Smartwatch Apple Watch Series 9',
        price: 2199000,
        description: 'GPS, 45mm, Resistente al agua',
        image: 'https://placehold.co/300x200/8E54E9/FFFFFF?text=Apple+Watch',
        category: 'accesorios',
        stock: 25,
        rating: 4.8,
        reviews: 167,
        isNew: true
      }
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrar productos por categoría y término de búsqueda
  useEffect(() => {
    let filtered = products;

    // Filtrar por categoría
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products]);

  // Formatear precio en pesos colombianos
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Obtener icono por categoría
  const getCategoryIcon = (category) => {
    const icons = {
      'todos': 'fa-grid',
      'laptops': 'fa-laptop',
      'smartphones': 'fa-mobile-alt',
      'tablets': 'fa-tablet-alt',
      'accesorios': 'fa-keyboard',
      'audio': 'fa-headphones',
      'gaming': 'fa-gamepad'
    };
    return icons[category] || 'fa-box';
  };

  if (loading) {
    return (
      <div className="products-loading">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Nuestros Productos</h1>
        <p>Descubre la mejor tecnología al mejor precio</p>
      </div>

      {/* Barra de búsqueda */}
      <div className="search-bar-container">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Buscar productos, categorías, marcas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm('')}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
        <div className="search-results-info">
          {searchTerm && (
            <p>
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''} para "{searchTerm}"
            </p>
          )}
        </div>
      </div>

      {/* Filtros de categoría */}
      <div className="categories-filter">
        <div className="categories-scroll">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              <i className={`fas ${getCategoryIcon(category)}`}></i>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Mensaje si no hay resultados */}
      {filteredProducts.length === 0 && !loading && (
        <div className="no-products">
          <i className="fas fa-search"></i>
          <h3>No se encontraron productos</h3>
          <p>Intenta con otros términos de búsqueda o categorías</p>
          <button
            className="reset-filters"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('todos');
            }}
          >
            <i className="fas fa-refresh"></i>
            Reiniciar filtros
          </button>
        </div>
      )}

      {/* Grid de productos */}
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">

            {/* Imagen del producto */}
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <div className="product-overlay">
                <button className="quick-view">
                  <i className="fas fa-eye"></i> Vista rápida
                </button>
              </div>
            </div>

            {/* Información del producto */}
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>

              {/* Precio */}
              <div className="product-price">
                {product.originalPrice ? (
                  <>
                    <span className="current-price">{formatPrice(product.price)}</span>
                  </>
                ) : (
                  <span className="current-price">{formatPrice(product.price)}</span>
                )}
              </div>

              {/* Stock */}
              <div className="product-stock">
                <i className="fas fa-box"></i>
                <span className={product.stock < 5 ? 'low-stock' : ''}>
                  {product.stock} disponibles
                </span>
              </div>

              {/* Acciones - SOLO BOTÓN VER MÁS */}
              <div className="product-actions">
                <Link to={`/producto/${product.id}`} className="view-details full-width">
                  <i className="fas fa-info-circle"></i>
                  Ver más
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
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
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxapacHRvcCUyMGdhbWluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
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
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGlwaG9uZSUyMDE1JTIwcHJvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
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
        image: 'https://images.unsplash.com/photo-1623125016174-8b3b527d0e63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRhYmxldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
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
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
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
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGtleWJvYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
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
        image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHM1fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
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
        image: 'https://images.unsplash.com/photo-1610484826967-09c5720778c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9uaXRvciUyMGdhbWluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
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
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
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

    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

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
      <div className="prod-loading">
        <div className="prod-loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="prod-container">
      <div className="prod-header">
        <h1>Nuestros Productos</h1>
        <p>Descubre la mejor tecnología al mejor precio</p>
      </div>

      {/* Barra de búsqueda */}
      <div className="prod-search-bar-container">
        <div className="prod-search-bar">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Buscar productos, categorías, marcas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="prod-search-input"
          />
          {searchTerm && (
            <button
              className="prod-clear-search"
              onClick={() => setSearchTerm('')}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
        <div className="prod-search-results-info">
          {searchTerm && (
            <p>
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''} para "{searchTerm}"
            </p>
          )}
        </div>
      </div>

      {/* Filtros de categoría */}
      <div className="prod-categories-filter">
        <div className="prod-categories-scroll">
          {categories.map(category => (
            <button
              key={category}
              className={`prod-category-btn ${selectedCategory === category ? 'prod-active' : ''}`}
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
        <div className="prod-no-products">
          <i className="fas fa-search"></i>
          <h3>No se encontraron productos</h3>
          <p>Intenta con otros términos de búsqueda o categorías</p>
          <button
            className="prod-reset-filters"
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
      <div className="prod-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="prod-card">

            {/* Imagen del producto */}
            <div className="prod-image">
              <img src={product.image} alt={product.name} />
              <div className="prod-overlay">
                <button className="prod-quick-view">
                  <i className="fas fa-eye"></i> Vista rápida
                </button>
              </div>
            </div>

            {/* Información del producto */}
            <div className="prod-info">
              <h3 className="prod-title">{product.name}</h3>
              <p className="prod-description">{product.description}</p>

              {/* Precio */}
              <div className="prod-price">
                {product.originalPrice ? (
                  <>
                    <span className="prod-current-price">{formatPrice(product.price)}</span>
                  </>
                ) : (
                  <span className="prod-current-price">{formatPrice(product.price)}</span>
                )}
              </div>

              {/* Stock */}
              <div className="prod-stock">
                <i className="fas fa-box"></i>
                <span className={product.stock < 5 ? 'prod-low-stock' : ''}>
                  {product.stock} disponibles
                </span>
              </div>

              {/* Acciones - SOLO BOTÓN VER MÁS */}
              <div className="prod-actions">
                <Link to={`/producto/${product.id}`} className="prod-view-details">
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
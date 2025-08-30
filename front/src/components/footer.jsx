import React from 'react';
import '../styler.css/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Tecnova</h3>
          <p>Tu tienda de tecnología de confianza</p>
          <div className="social-links">
            <a href="#" className="social-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Contacto</h4>
          <div className="contact-info">
            <p>
              <i className="fas fa-envelope"></i>
              <span>tecnova@gmail.com</span>
            </p>
            <p>
              <i className="fas fa-phone"></i>
              <span>+57 324 780 5341</span>
            </p>
            <p>
              <i className="fas fa-map-marker-alt"></i>
              <span>Av. Tecnología #123, Ciudad Digital</span>
            </p>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Enlaces Rápidos</h4>
          <ul className="footer-links">
            <li><a href="#">Sobre Nosotros</a></li>
            <li><a href="#">Preguntas Frecuentes</a></li>
            <li><a href="#">Política de Privacidad</a></li>
            <li><a href="#">Términos y Condiciones</a></li>
            <li><a href="#">Soporte Técnico</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Suscríbete</h4>
          <p>Recibe las últimas novedades y ofertas</p>
          <div className="subscribe-form">
            <input 
              type="email" 
              placeholder="Tu correo electrónico" 
              className="email-input"
            />
            <button className="subscribe-btn">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Tecnova. Todos los derechos reservados.</p>
        <p>
          <a href="#">Términos y Condiciones</a> | 
          <a href="#"> Política de Privacidad</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
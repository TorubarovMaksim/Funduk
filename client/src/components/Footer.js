import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Подключаем стили для футера

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 Фундук - магазин восточных сладостей</p>
        <nav className="footer-nav">
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;

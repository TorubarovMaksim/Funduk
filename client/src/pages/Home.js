import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="home-page">
      <h1>Фундук</h1>
      <h2>магазин восточных сладостей</h2>
      <div className="product-list">
        {products.map(product => (
          <div
            className="product-card"
            key={product._id}
            onClick={() => openModal(product)}
          >
            <img
              className="product-image"
              src={product.imageUrl || 'https://via.placeholder.com/300x200'}
              alt={product.name}
            />
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              {product.description && <p className="product-description">{product.description}</p>}
              {product.overview && <p className="product-overview">{product.overview.substring(0, 100) + '...'}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className={`modal-overlay ${selectedProduct ? 'show' : ''}`} onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={closeModal}>×</button>
          <h2 className="modal-title">{selectedProduct?.name}</h2>
          <img
            className="modal-image"
            src={selectedProduct?.imageUrl || 'https://via.placeholder.com/300x200'}
            alt={selectedProduct?.name}
          />
          <p className="modal-price">${selectedProduct?.price.toFixed(2)}</p>
          <p className="modal-description">{selectedProduct?.description}</p>
          <p className="modal-overview">{selectedProduct?.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;

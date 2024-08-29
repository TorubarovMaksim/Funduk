import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css'; // Подключаем CSS файл для стилей

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showNews, setShowNews] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', imageUrl: '', price: '', overview: '', category: '' });
  const [newArticle, setNewArticle] = useState({ title: '', content: '', author: '', imageUrl: '' });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchNews();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const response = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchNews = async () => {
    try {
      const res = await axios.get('/api/news');
      setNews(res.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleToggleUsers = () => setShowUsers(prev => !prev);
  const handleToggleStats = () => setShowStats(prev => !prev);
  const handleToggleAddProduct = () => setShowAddProduct(prev => !prev);
  const handleToggleNews = () => setShowNews(prev => !prev);

  const handleAddProduct = async () => {
    setIsAdding(true);
    try {
      const token = localStorage.getItem('token');
      const productToSend = {
        ...newProduct,
        price: parseFloat(newProduct.price),
      };

      if (!productToSend.name || !productToSend.price || !productToSend.overview || !productToSend.category) {
        alert('Name, price, overview, and category are required.');
        return;
      }

      const res = await axios.post(
        '/api/products',
        productToSend,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProducts(prev => [...prev, res.data]);
      setNewProduct({ name: '', imageUrl: '', price: '', overview: '', category: '' });
      setShowAddProduct(false);
      alert('Product added successfully');
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(prev => prev.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddArticle = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!newArticle.title || !newArticle.content || !newArticle.author) {
        alert('Title, content, and author are required.');
        return;
      }

      const res = await axios.post(
        '/api/news',
        newArticle,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNews(prev => [...prev, res.data]);
      setNewArticle({ title: '', content: '', author: '', imageUrl: '' });
      setShowNews(false);
      alert('Article added successfully');
    } catch (err) {
      console.error('Error adding article:', err);
      alert('Failed to add article');
    }
  };

  const handleDeleteArticle = async (articleId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/news/${articleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNews(prev => prev.filter(article => article._id !== articleId));
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  // Определяем функцию handleInputChange
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="admin-panel">
      <h1>Панель Администратора</h1>
      <div className="button-container">
        <button className="toggle-button" onClick={handleToggleUsers}>
          {showUsers ? 'Закрыть' : 'Открыть панель пользователей'}
        </button>
        <button className="toggle-button" onClick={handleToggleStats}>
          {showStats ? 'Закрыть' : 'Открыть сведения по продуктам'}
        </button>
        <button className="toggle-button" onClick={handleToggleAddProduct}>
          {showAddProduct ? 'Закрыть' : 'Панель добавления продуктов'}
        </button>
        <button className="toggle-button" onClick={handleToggleNews}>
          {showNews ? 'Закрыть' : 'Добавить новость'}
        </button>
      </div>

      {showUsers && (
        <div className="section">
          <h2>Пользователи</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Логин</th>
                <th>Почта</th>
                <th>Последний вход</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.lastSeen).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddProduct && (
        <div className="section add-product-form">
          <h2>Добавление продукта</h2>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={(e) => setNewProduct(prev => ({ ...prev, imageUrl: e.target.value }))}
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Overview"
            value={newProduct.overview}
            onChange={(e) => setNewProduct(prev => ({ ...prev, overview: e.target.value }))}
          />
          <button onClick={handleAddProduct} disabled={isAdding}>
            {isAdding ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      )}

      {showNews && (
        <div className="section add-news-form">
          <h2>Добавление новостей</h2>
          <input
            type="text"
            placeholder="Title"
            value={newArticle.title}
            onChange={(e) => setNewArticle(prev => ({ ...prev, title: e.target.value }))}
          />
          <textarea
            placeholder="Content"
            value={newArticle.content}
            onChange={(e) => setNewArticle(prev => ({ ...prev, content: e.target.value }))}
          ></textarea>
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={newArticle.imageUrl}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={newArticle.author}
            onChange={handleInputChange}
          />
          <button onClick={handleAddArticle}>
            Добавить новость
          </button>
        </div>
      )}

      {showStats && (
        <div className="section">
          <h2>Сведения по продуктам - удаление продуктов</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Наименование</th>
                <th>Цена</th>
                <th>Удаление</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>
                    <button className="delete-button" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showNews && (
        <div className="section">
          <h2>Список новостей</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Тема</th>
                <th>Автор</th>
                <th>Удаление</th>
              </tr>
            </thead>
            <tbody>
              {news.map(article => (
                <tr key={article._id}>
                  <td>{article.title}</td>
                  <td>{article.author}</td>
                  <td>
                    <button className="delete-button" onClick={() => handleDeleteArticle(article._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

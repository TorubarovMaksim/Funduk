import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './News.css'; // Подключаем CSS файл для стилей

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('/api/news');
        setNews(res.data); // Храним новости в исходном порядке
      } catch (err) {
        console.error('Failed to fetch news:', err);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <h2 className="news-header">Новости</h2>
      <div className="news-list">
        {news.slice().reverse().map(article => ( // Создаем новый массив с перевернутым порядком
          <div className="news-card" key={article._id}>
            {article.imageUrl && <img src={article.imageUrl} alt={article.title} className="news-image" />}
            <h3 className="news-title">{article.title}</h3>
            <p className="news-content">{article.content}</p>
            <div className="news-footer">
              <span className="news-author">By {article.author}</span>
              <span className="news-date">{new Date(article.publishedDate).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;

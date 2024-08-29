import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

// Найдите контейнер с id 'root'
const rootElement = document.getElementById('root');

// Проверьте, что контейнер существует
if (rootElement) {
  // Создайте корневой объект и отрендерите приложение
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Target container is not a DOM element.');
}

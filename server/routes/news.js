import express from 'express';
import News from '../models/News.js';

const router = express.Router();

// Получение всех новостей
router.get('/', async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Добавление новости
router.post('/', async (req, res) => {
  try {
    const { title, content, author, imageUrl } = req.body;
    const news = new News({ title, content, author, imageUrl });
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

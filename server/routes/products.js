import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Получение всех продуктов
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удаление продукта
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Логируем тело запроса

    const { name, description, price, overview, category, imageUrl } = req.body;

    // Примитивная проверка обязательных полей
    if (!name || !price || !category || !overview) {
      return res.status(400).json({ error: 'Name, price, and category are required.' });
    }

    const product = new Product({ name, description, price, category, overview, imageUrl });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error while saving product:', error.message); // Логируем ошибку на сервере
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

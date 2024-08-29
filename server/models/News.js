import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: { type: Date, default: Date.now },
  imageUrl: { type: String }, // Новое поле для URL изображения
}, { timestamps: true });

export default mongoose.model('News', newsSchema);

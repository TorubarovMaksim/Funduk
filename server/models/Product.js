import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  overview: { type: String },
  category: { type: String, required: true },
  imageUrl: { type: String },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);

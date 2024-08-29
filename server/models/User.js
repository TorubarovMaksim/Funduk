import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastSeen: {
    type: Date,
    default: Date.now,
  },
  role: { // Добавлено поле роли
    type: String,
    enum: ['user', 'admin'], // Роль может быть либо 'user', либо 'admin'
    default: 'user',
  },
});

const User = mongoose.model('User', UserSchema);

export default User;

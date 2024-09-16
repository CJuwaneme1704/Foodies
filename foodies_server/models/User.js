import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User schema
const userSchema = new mongoose.Schema({
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String},
  googleId: { type: String }, // To store Google ID for Google login users
  favorites: [
    {
      mealId: { type: String, required: true }, // Store meal ID
      name: { type: String }, // Optionally store meal name
      image: { type: String }, // Optionally store meal image URL
    }
  ], // Array of favorite meals
});

// Hash the password before saving the user model
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

export { User };

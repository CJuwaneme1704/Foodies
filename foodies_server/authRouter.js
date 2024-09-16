import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library'; // Import OAuth2Client for Google authentication
import { User } from './models/User.js';

const authRouter = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Initialize Google OAuth2Client

// Register a new user
authRouter.post('/SignUp', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({  firstname, lastname, email, password });
    await user.save();

    // Generate JWT
    const token = jwt.sign({ id: user._id, firstname: user.firstname }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ 
      token, 
      user: { id: user._id, firstname: user.firstname, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.log(error);
  }
});

// Login a user
authRouter.post('/LogIn', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, firstname: user.firstname }, process.env.JWT_SECRET);

    res.status(200).json({
      token,
      user: { id: user._id, firstname: user.firstname, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Google Login route
authRouter.post('/google', async (req, res) => {
  const { token } = req.body;
  
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (user && !user.googleId) {
      return res.status(400).json({ message: 'Please log in with email and password' });
    }

    if (!user) {
      user = new User({
        googleId: sub,
        email,
        firstname: name.split(' ')[0],
        lastname: name.split(' ')[1] || '',
      });
      await user.save();
    }

    const authToken = jwt.sign(
      { id: user._id, firstname: user.firstname, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      token: authToken,
      user: { id: user._id, firstname: user.firstname, email: user.email }
    });

  } catch (error) {
    console.error('Google login error:', error);
    res.status(401).json({ message: 'Invalid Google token' });
  }
});

export default authRouter;

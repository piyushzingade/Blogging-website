import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';

export const userRouter = express.Router();

// Sign-up route
userRouter.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });

    res.json({ jwt: token });
  } catch (e) {
    console.error(e);
    res.status(403).json({ error: 'Error while signing up' });
  }
});

// Sign-in route
userRouter.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(403).json({ error: 'Incorrect credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });

    res.json({ jwt: token });
  } catch (e) {
    console.error(e);
    res.status(411).json({ error: 'Error while signing in' });
  }
});

export default userRouter;

import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { signupInput, signinInput } from "@piyush555/medium-common";

// Mongoose User Schema
import { User} from '../models/user.model';

export const userRouter = express();
userRouter.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'piyush';



// Signup Route
userRouter.post('/signup', async (req, res) => {
    const body = req.body;
    const { success } = signupInput.safeParse(body);
    
    if (!success) {
        return res.status(400).json({ message: "Inputs not correct" });
    }

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = new User({
            username: body.username,
            password: hashedPassword,
            name: body.name
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ jwt: token });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error creating user' });
    }
});

// Signin Route
userRouter.post('/signin', async (req, res) => {
    const body = req.body;
    const { success } = signinInput.safeParse(body);

    if (!success) {
        return res.status(400).json({ message: "Inputs not correct" });
    }

    try {
        const user = await User.findOne({ username: body.username });

        if (!user || !(await bcrypt.compare(body.password, user.password))) {
            return res.status(403).json({ message: "Incorrect credentials" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ jwt: token });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error signing in' });
    }
});


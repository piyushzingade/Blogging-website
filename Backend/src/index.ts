import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from './route/user';
import { blogRouter } from './route/blog';
import connectDB from './config/db';

// Initialize environment variables
dotenv.config();

// Connect to the database
connectDB();

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());

// Mounting routers
app.use('/api/v1/user', userRouter);
app.use('/api/v1/blog', blogRouter);

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;

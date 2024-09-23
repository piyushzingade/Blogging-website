import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Blog } from '../models/blog.model'; // Assuming Blog model is already defined
import { createBlogInput, updateBlogInput } from '@piyush555/medium-common'; // Assuming these are the same validation schemas

const blogRouter = express.Router();
blogRouter.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'piyush';

// Extend Request interface to include userId
interface AuthenticatedRequest extends Request {
  userId?: string;
}

// Middleware for JWT verification and setting userId in request
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || "";
  try {
    const user = jwt.verify(authHeader, JWT_SECRET) as { id: string };
    if (user) {
      req.body.userId = user.id;
      next();
    } else {
      res.status(403).json({ message: "You are not logged in" });
    }
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// Create a new blog post
blogRouter.post('/', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  const { title, content } = req.body;
  const { success, error } = createBlogInput.safeParse({ title, content });

  if (!success) {
    return res.status(400).json({ message: error?.issues[0]?.message || 'Invalid input' });
  }

  try {
    const blog = new Blog({
      title,
      content,
      author: req.body.userId, // Set the author from the authenticated user
    });

    await blog.save();

    return res.status(201).json({ id: blog._id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Error creating blog post' });
  }
});

// Update an existing blog post
blogRouter.put('/:id', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const { success, error } = updateBlogInput.safeParse({ title, content });

  if (!success) {
    return res.status(400).json({ message: error?.issues[0]?.message || 'Invalid input' });
  }

  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: id, author: req.body.userId }, // Ensure the blog belongs to the authenticated user
      { title, content },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found or unauthorized' });
    }

    return res.status(200).json({ id: blog._id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Error updating blog post' });
  }
});

// Delete an existing blog post
blogRouter.delete('/:id', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findOneAndDelete({ _id: id, author: req.body.userId });

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found or unauthorized' });
    }

    return res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Error deleting blog post' });
  }
});

// Get a list of blog posts
blogRouter.get('/bulk', async (_req: Request, res: Response) => {
  try {
    const blogs = await Blog.find({})
      .select('title content')
      .populate('author', 'name');

    return res.status(200).json({ blogs });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Error fetching blog posts' });
  }
});

// Get a single blog post by ID
blogRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id).populate('author', 'name');

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    return res.status(200).json({ blog });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Error fetching blog post' });
  }
});

export { blogRouter };

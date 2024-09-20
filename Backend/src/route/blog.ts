import express , { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Blog } from '../models/blog.model';
import { createBlogInput } from "@piyush555/medium-common";

// Middleware for JWT verification and setting userId
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authorHeader = req.headers.authorization || "";
  try {
    const user = jwt.verify(authorHeader, process.env.JWT_SECRET as string) as { id: string };
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

export const blogRouter = express.Router();

blogRouter.use(verifyToken);

// POST: Create a new blog post
blogRouter.post("/", async (req: Request, res: Response) => {
  const { userId, title, content } = req.body;

  const { success, error } = createBlogInput.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: "Input not correct", error });
  }

  try {
    const blog = new Blog({ title, content, authorId: userId });
    await blog.save();
    res.json({ id: blog._id });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog post", error });
  }
});

// PUT: Update an existing blog post
blogRouter.put("/:id", async (req: Request, res: Response) => {
  const { userId, title, content } = req.body;
  const blogId = req.params.id;

  const { success, error } = createBlogInput.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: "Input not correct", error });
  }

  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: blogId, authorId: userId },
      { title, content },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found or not authorized" });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog post", error });
  }
});

// GET: Fetch a single blog post by ID
blogRouter.get("/:id", async (req: Request, res: Response) => {
  const blogId = req.params.id;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog post", error });
  }
});

// GET: Fetch multiple blog posts (bulk)
blogRouter.get("/", async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog posts", error });
  }
});

export default blogRouter;


import {  userRouter } from './route/user';
import { blogRouter } from './route/blog';
import { Hono } from 'hono';

// Create the main Hono app
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();

app.route('/api/v1/user' , userRouter);
app.route('api/v1/blog' , blogRouter);



export default app;

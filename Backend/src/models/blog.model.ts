import mongoose, { Document, Schema } from 'mongoose';

interface PostDocument extends Document {
  title: string;
  content: string;
  published: boolean;
  author: Schema.Types.ObjectId;
}

const blogSchema = new Schema<PostDocument>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  published: { type: Boolean, default: false },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

export const Blog = mongoose.model<PostDocument>('Blog', blogSchema);


import mongoose, { Document, Schema } from 'mongoose';

interface UserDocument extends Document {
  username: string;
  name?: string;
  password: string;
  posts: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<UserDocument>('User', UserSchema);

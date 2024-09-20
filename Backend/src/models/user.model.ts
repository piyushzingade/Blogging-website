import mongoose, { Document, Schema } from 'mongoose';

interface UserDocument extends Document {
  email: string;
  name?: string;
  password: string;
  posts: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  password: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
}, {
  timestamps: true
});

export const User = mongoose.model<UserDocument>('User', UserSchema);



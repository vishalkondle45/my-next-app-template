import bcrypt from 'bcryptjs';
import { Model, model, models, Schema, Types } from 'mongoose';

export interface UserDocument extends Document {
  _id?: Types.ObjectId;
  name: string;
  image?: string;
  dob: Date;
  bio?: string;
  interests?: string[];
  city?: string;
  username?: string;
  mobile?: string;
  email: string;
  password: string;
  isPrivate: boolean;
  isAdmin: boolean;
  isVerified: boolean;
}

interface Methods {
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<UserDocument, {}, Methods>(
  {
    name: {
      type: String,
      required: true,
      collation: { locale: 'en', strength: 2 },
      index: true,
    },
    bio: {
      type: String,
      default: '',
    },
    dob: {
      type: Date,
      required: true,
    },
    interests: {
      type: [String],
      default: [],
    },
    city: {
      type: String,
      default: '',
    },
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    image: {
      type: String,
      unique: true,
      default: null,
      index: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

userSchema.methods.comparePassword = async function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

const User = models.User || model('User', userSchema);

export default User as Model<UserDocument, {}, Methods>;

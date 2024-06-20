import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import { logInfo } from "../util/logging.js";

interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  toJSON(): IUser;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
      message:
        "Password must be at least 8 characters long and contain both numbers and letters",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
});

userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    logInfo(`Hashing password for user: ${this.username}`);
    this.password = await bcrypt.hash(this.password, 12);
    logInfo(`Password hashing completed for user: ${this.username}`);
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  logInfo(`Comparing password for user: ${this.username}`);
  const match = await bcrypt.compare(candidatePassword, this.password);
  logInfo(`Password comparison result for user: ${this.username}: ${match}`);
  return match;
};

userSchema.methods.toJSON = function (): IUser {
  const user = this.toObject();
  delete user.password;
  logInfo(`Serializing user data for user: ${user.username}`);
  return user;
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;

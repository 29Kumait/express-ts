import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { logError, logInfo } from "../util/logging.js";

interface UserData {
  email: string;
  username: string;
  password: string;
}

export const handleSignUp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { email, username, password } = req.body;
  logInfo(`Signup attempt for username: ${username}, email: ${email}`);

  try {
    logInfo(`Checking if user already exists: ${username}`);
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      logInfo(`User already exists: ${userExists.username}`);
      return res.status(400).json({ message: "User already exists" });
    }

    logInfo(`Creating user: ${username}`);
    const user = await createUser({ email, username, password });

    const token = generateAuthToken(user._id as string);
    logInfo(`Token generated for user: ${user.username}, ID: ${user._id}`);

    return res.status(201).send({ token });
  } catch (err) {
    logError(`Sign up error for user ${username}: ${(err as Error).message}`);
    next(err);
  }
};

export const handleSignIn = async (req: Request, res: Response): Promise<Response | void> => {
  const { username, password } = req.body;
  logInfo(`Sign-in attempt for username: ${username}`);

  try {
    logInfo(`Finding user by credentials for username: ${username}`);
    const user = await findUserByCredentials(username, password);

    if (!user) {
      logInfo(`Authentication failed for username: ${username}`);
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = generateAuthToken(user._id as string);
    logInfo(`Token generated for successful sign-in: ${user.username}, ID: ${user._id}`);

    return res.send({ token });
  } catch (err) {
    logError(`Sign in error for user ${username}: ${(err as Error).message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createUser = async (userData: UserData) => {
  try {
    const { email, username } = userData;
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      throw new Error(
        userExists.email === email
          ? "User with this email already exists"
          : "User with this username already exists"
      );
    }
    const user = new User(userData);
    await user.save();
    logInfo(`User saved to the database: ${user.username}`);
    return user;
  } catch (error) {
    logError(`Error creating user ${userData.username} with email ${userData.email}: ${(error as Error).message}`);
    throw error;
  }
};

const generateAuthToken = (userId: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const findUserByCredentials = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (user && (await user.comparePassword(password))) {
    return user;
  }
  return null;
};

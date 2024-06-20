import mongoose from 'mongoose';

const connectDB = (): Promise<typeof mongoose> => mongoose.connect(String(process.env.MONGODB_URL));

export default connectDB;
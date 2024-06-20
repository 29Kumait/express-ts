import mongoose from 'mongoose';
const connectDB = () => mongoose.connect(String(process.env.MONGODB_URL));
export default connectDB;
//# sourceMappingURL=connectDB.js.map
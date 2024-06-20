import mongoose, { Document, Schema, Model } from "mongoose";

interface IContent extends Document {
  description: string;
}

const contentSchema: Schema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
});

const Content: Model<IContent> = mongoose.model<IContent>("contents", contentSchema);
export default Content;

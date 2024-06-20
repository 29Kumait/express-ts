import mongoose from "mongoose";
const contentSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
});
const Content = mongoose.model("contents", contentSchema);
export default Content;
//# sourceMappingURL=Content.js.map
import Content from "../models/Content.js";
export const createContent = async (req, res) => {
    try {
        const { description } = req.body;
        if (!description) {
            return res.status(400).json({ error: "Description is required" });
        }
        const newContent = new Content({ description });
        await newContent.save();
        return res.status(201).json(newContent);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
export const getContent = async (req, res) => {
    try {
        const content = await Content.find();
        return res.status(200).json(content);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
//# sourceMappingURL=content.js.map
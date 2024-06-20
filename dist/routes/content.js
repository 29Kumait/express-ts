import express from "express";
import { createContent, getContent } from "../controllers/content.js";
const routerContent = express.Router();
routerContent.get("/", getContent);
routerContent.post("/create", createContent);
export default routerContent;
//# sourceMappingURL=content.js.map
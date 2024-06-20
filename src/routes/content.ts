import express, { Router, Request, Response } from "express";
import { createContent, getContent } from "../controllers/content.js";

const routerContent: Router = express.Router();

routerContent.get("/", getContent);
routerContent.post("/create", createContent);

export default routerContent;
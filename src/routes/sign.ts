import express, { Router } from "express";
import { handleSignUp, handleSignIn } from "../controllers/sign.js";

const routerSign: Router = express.Router();

routerSign.post("/signup", handleSignUp);
routerSign.post("/signin", handleSignIn);
export default routerSign;

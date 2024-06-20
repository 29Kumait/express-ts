import express from "express";
import { handleSignUp, handleSignIn } from "../controllers/sign.js";
const routerSign = express.Router();
routerSign.post("/signup", handleSignUp);
routerSign.post("/signin", handleSignIn);
export default routerSign;
//# sourceMappingURL=sign.js.map
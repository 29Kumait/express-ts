import express, { Router, Request, Response } from "express";
const rootRouter: Router = express.Router();

rootRouter.get("/", (req: Request, res: Response) => {
  res.send("Server !");
});

export default rootRouter;
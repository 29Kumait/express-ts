import express from "express";
const rootRouter = express.Router();
rootRouter.get("/", (req, res) => {
    res.send("Server !");
});
export default rootRouter;
//# sourceMappingURL=root.js.map
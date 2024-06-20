import express from "express";
import cors from "cors";
import { logError } from "./util/logging.js";
import rootRouter from "./routes/root.js";
import routerSign from "./routes/sign.js";
import routerContent from "./routes/content.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", rootRouter);
app.use("/api", routerSign);
app.use("/api", routerContent);
app.use((err, req, res, next) => {
    logError(err);
    res.status(500).send("ERROR handling middleware!");
});
export default app;
//# sourceMappingURL=app.js.map
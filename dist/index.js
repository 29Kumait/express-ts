import * as dotenv from 'dotenv';
import app from './app.js';
import { logInfo, logError } from './util/logging.js';
import connectDB from './db/connectDB.js';
dotenv.config();
const port = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => logInfo(`Server started on port ${port}`));
    }
    catch (error) {
        logError(error);
    }
};
startServer();
//# sourceMappingURL=index.js.map
import * as dotenv from 'dotenv';
import app from './app.js';
import { logInfo, logError } from './util/logging.js';
import connectDB from './db/connectDB.js';

dotenv.config();

const port: string | number = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(port, () => logInfo(`Server started on port ${port}`));
  } catch (error) {
    logError(error as Error);
  }
};

startServer();

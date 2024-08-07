// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import http from 'http';
import connectDB from './config/db.js';
import { logError, logInfo } from './config/logger.js';
import routes from './routes/index.js';
import './listeners/emailListener.js';

const app = express();
app.disable('x-powered-by');

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

connectDB();

const whitelist = (process.env.ALLOW_CORS || '').split(',');
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

// Create HTTP server
const httpServer = http.createServer(app);

// Apply routes
app.use('/api/v1', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:', { error: err.message, stack: err.stack });
  logError.error('Error occurred:', { error: err.message, stack: err.stack });
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start listening for HTTP and socket connections
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.info(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  logInfo.info(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

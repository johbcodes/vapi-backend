import winston from 'winston';
import fs from 'fs';
import path from 'path';

const logsDir = 'logs'; // Create a 'logs' directory in your project

// Create the 'logs' directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Define log file paths
const errorLogPath = path.join(logsDir, 'error.log');
const infoLogPath = path.join(logsDir, 'info.log');
const paymentLogPath = path.join(logsDir, 'subscriptions.log');
const apiLogPath = path.join(logsDir, 'api.log');

// Create loggers for error and info logs
const logError = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }), // Display stack traces
    winston.format.prettyPrint(),
    winston.format.json()
  ),
  transports: [new winston.transports.File({ filename: errorLogPath, level: 'error' })],
});

const logInfo = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json()
  ),
  transports: [new winston.transports.File({ filename: infoLogPath, level: 'info' })],
});

const logPayments = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
    // winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: paymentLogPath, level: 'info' }),
  ],
});

const logApi = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
    // winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: paymentLogPath, level: 'info' }),
  ],
});

export { logError, logInfo, logPayments, logApi };

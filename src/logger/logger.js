const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Default logging level
  format: winston.format.combine(
    winston.format.colorize(), // Add colors to console output
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(), // log to console
    new winston.transports.File({ filename: 'Logging.log' }) // all logs go to this single file
  ]
});

module.exports = logger;
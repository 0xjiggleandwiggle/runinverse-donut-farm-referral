
const { createLogger, format, transports } = require('winston');
const chalk = require("chalk");

// Create the logger
const logger = createLogger({
    level: 'info', // Set log level (info, error, debug, etc.)
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp
        format.printf(({ timestamp, level, message }) => {
            let colorizedMessage;

            // Apply colors based on log level using Chalk
            if (level === 'info') {
                colorizedMessage = chalk.green(message); // Green for info
                return `${chalk.green(timestamp)} [${chalk.bold(level.toUpperCase())}]: ${colorizedMessage}`;
            } else if (level === 'error') {
                colorizedMessage = chalk.red(message);   // Red for error
                return `${chalk.red(timestamp)} [${chalk.bold(level.toUpperCase())}]: ${colorizedMessage}`;
            } else {
                colorizedMessage = message; // Default color for other levels
                return `${timestamp} [${chalk.bold(level.toUpperCase())}]: ${colorizedMessage}`;
            }
        })
    ),
    transports: [
        new transports.Console(),  // Log to console
        // You can also add more transports like file-based logging
        // new transports.File({ filename: 'app.log' })
    ]
});

module.exports = logger;
import * as path from 'path'
import * as winston from 'winston'
import { config } from "./config";

winston.handleExceptions(new winston.transports.File({ filename: path.join(config.logdir, 'uncaught_exceptions.log') }));

// False - Application to continue execution even after an exception is caught
winston.exitOnError = false; 							

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      json: true,
      meta: false,
      colorize: true,
      handleExceptions: true
    }),
    new (winston.transports.File)({
      filename: path.join(config.logdir, `${config.servicename}.log`),	// The filename of the logfile to write output to
      level: 'DEBUG',									// Level of messages that this transport should log // Level of messages: FATAL,ERROR,WARNING,INFO,DEBUG,TRACE
      json: true,										// If true, messages will be logged as JSON
      timestamp: true,									// Boolean flag indicating if we should prepend output with timestamps
      maxFiles: 5,										// Max number of files to contain logs
      maxsize: '5000000', 								// Max size of files containing logs (bytes)
      prettyPrint: true									// Make logs human-readable
    })  
  ]
});

export { logger }
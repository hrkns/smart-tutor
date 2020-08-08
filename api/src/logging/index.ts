import {
  Environment
} from '../configuration';
import {
  EnviromentsIdentifiers,
  LoggingLevels
} from '../utils';

const {
  createLogger,
  format,
  transports
} = require('winston'), {
    combine,
    timestamp,
    printf
  } = format,
  customFormat = printf((parameters: any) => {
    const {
      level,
      message,
      label,
      timestamp
    } = parameters;
    return `${timestamp} ${level}: ${message}`;
  }),
  winstonLogger = createLogger({
    format: combine(
      timestamp(),
      customFormat
    ),
  }),
  logsFilesPath = './logs/',
  logFileExtension = '.log',
  infoLog = (message: string) => {
    winstonLogger.debug(message);
  },
  successLog = (message: string) => {
    winstonLogger.info(message);
  },
  warningLog = (message: string) => {
    winstonLogger.warning(message);
  },
  errorLog = (message: string) => {
    winstonLogger.error(message);
  };

let _ = (level: string) => {

  return new transports.Console({
    level: level,
  });
};

winstonLogger.add(_(LoggingLevels.debug));
winstonLogger.add(_(LoggingLevels.info));
winstonLogger.add(_(LoggingLevels.warning));
winstonLogger.add(_(LoggingLevels.error));

switch (Environment) {

  case EnviromentsIdentifiers.development: {

    let _ = (file: string, type ? : string) => {

      return new transports.File({
        filename: `${logsFilesPath}${file}${logFileExtension}`,
        level: type,
      });
    };

    winstonLogger.add(_(LoggingLevels.info, LoggingLevels.debug));
    winstonLogger.add(_(LoggingLevels.success, LoggingLevels.info));
    winstonLogger.add(_(LoggingLevels.warning));
    winstonLogger.add(_(LoggingLevels.error));
  }
  break;
}

const logger = {
  info: infoLog,
  success: successLog,
  warning: warningLog,
  error: errorLog,
};

export {
  infoLog,
  successLog,
  warningLog,
  errorLog,
  logger,
};

import LoggerService from './common/logger/logger.js';
import Application from './app/application.js';

const logger = new LoggerService();

const app = new Application(logger);
app.init();

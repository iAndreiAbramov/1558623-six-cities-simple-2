import LoggerService from './common/logger/logger.js';
import Application from './app/application.js';
import { AppConfigService } from './common/app-config/app-config.service.js';

const logger = new LoggerService();
const config = new AppConfigService(logger);

const app = new Application(logger, config);
app.init();

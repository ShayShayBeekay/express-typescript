// set promise definition globally
import * as Promise from 'bluebird'

// import express
import express = require('express') 
const app = express();

// set the body parsers
import * as bodyparser from 'body-parser'
app.use(bodyparser.json());

// get a logger
import { logger } from './config/winston';
import { config } from './config/config';

// add the routes
import { router } from './server/routes/index';
app.use('/api', router);

// import swagger and swagger doc
import YAML = require('yamljs')
import swaggerUi = require('swagger-ui-express')

// add swagger endpoints
const swaggerDoc = YAML.load('./swagger.yml');
app.use('/endpoints', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// add common routes for health-check and version
app.get('/health-check', (req: any, res: any) => { 
  const uptime = process.uptime();
  res.json( 
    { status: `${config.servicename}: OK`, 
      uptime: `${Math.floor(uptime/3600)} : ${Math.floor((uptime%3600)/60)} : ${Math.floor(uptime%60)}`
    });
});

logger.info('app listening');
app.listen(config.port, () => logger.info(`App listening on port ${config.port}!`));

export { app }

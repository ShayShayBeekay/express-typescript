import * as bodyparser from "body-parser";
import * as swaggerUi from "swagger-ui-express";
import * as YAML from "yamljs";

import { config } from "./config/config";
import { logger } from "./config/winston";
import { router } from "./server/routes/index";

// import express
import express = require("express");
const app = express();

// set the body parsers
app.use(bodyparser.json());

// add the routes
app.use("/api", router);

// add swagger endpoints
const swaggerDoc = YAML.load("./swagger.yml");
app.use("/endpoints", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// add common routes for health-check and version
app.get("/health-check", (req: express.Request, res: express.Response) => {
  const uptime = process.uptime();
  res.json(
    { status: `${config.servicename}: OK`,
      uptime: `${Math.floor(uptime / 3600)} : ${Math.floor((uptime % 3600) / 60)} : ${Math.floor(uptime % 60)}`
    });
});

logger.info("app listening");
app.listen(config.port, () => logger.info(`App listening on port ${config.port}!`));

export { app };

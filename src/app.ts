import * as express from "express";
import "reflect-metadata";
import cors from "cors";
import { InversifyExpressServer } from "inversify-express-utils";
import { ContainerConfigLoader } from "./ioc/container";
import { port, url } from "./config/env.config";
import Logger from "./config/logger.config";
import { MongoDbConnection } from "./config/mongodb.config";
import { TYPES } from "./ioc/types";

const serverBootstrap = async () => {
  try {
    const container = ContainerConfigLoader.Load();
    const server = new InversifyExpressServer(container);

    // db
    const mongodb = container.get<MongoDbConnection>(TYPES.MongoDbConnection);
    await mongodb.connectDb();

    server.setConfig((app) => {
      app.use(cors());
      app.use(express.urlencoded({ extended: true }));
      app.use(express.json());
    });

    const serverInstance = server.build();
    serverInstance.listen(port, () => {
      Logger.info(`[bootstrap] server running on: http://localhost:${port}${url}`);
    });
  } catch (err) {
    Logger.error(`error starting server, "${err.message}"`);
    process.exit(1);
  }
};

serverBootstrap();

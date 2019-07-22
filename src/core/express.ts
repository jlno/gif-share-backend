import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express, { Express as App } from 'express';
import fileUpload from 'express-fileupload';

/**
 * Express
 */
export namespace Express {
  const app = express();
  const servicePath = {};
  const mb100 = 100 * 1024 * 1024;
  const mb30 = 30 * 1024 * 1024;

  app.use(cors({ origin: '*' }));
  app.use(compression());
  app.use(bodyParser.json({ limit: mb30 }));

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  app.use(
    fileUpload({
      limits: { fileSize: mb100, files: 1 },
      abortOnLimit: true
    })
  );

  /**
   * getApp
   */
  export function getApp(): App {
    return app;
  }

  /**
   * getPathList
   *
   * @param key
   */
  export function getPathList(key: string): any[] {
    return servicePath[key];
  }

  /**
   * setPathList
   *
   * @param key
   * @param value
   */
  export function setPathList(key: string, value: any[]): void {
    servicePath[key] = value;
  }
}

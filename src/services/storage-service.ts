import express, { Request, Response } from 'express';
import { UNAUTHORIZED, GONE } from 'http-status-codes';
import { STORAGE_PATH } from '../config';
import { ImageController } from '../controllers/image-controller';
import { Inject } from '../core/decorators';
import { Express } from '../core/express';

/**
 * StorageService
 */
export class StorageService {
  /**
   * imageController
   */
  @Inject
  private imageController: ImageController;

  /**
   * constructor
   */
  constructor() {
    const app = Express.getApp();
    const path = '/storage';

    app.use(
      path,
      (req, res, next) => this.checkImageData(req, res, next),
      express.static(STORAGE_PATH)
    );
  }

  /**
   * checkImageData
   *
   * @param request
   * @param response
   * @param next
   */
  async checkImageData(request: Request, response: Response, next: Function) {
    const fileName = request.path.replace('/', '');
    const password = request.header('password');

    const pw = await this.imageController.checkPassword(fileName, password);
    const ex = await this.imageController.checkExpiration(fileName);

    if (!pw) {
      response.sendStatus(UNAUTHORIZED);
    } else if (!ex) {
      response.sendStatus(GONE);
    } else {
      next();
    }
  }
}

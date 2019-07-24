import express, { Request, Response } from 'express';
import { GONE, UNAUTHORIZED } from 'http-status-codes';
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
      express.static(__dirname + '/../..' + path)
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

    const image = await this.imageController.search(fileName, false);
    const pw = this.imageController.checkPassword(image, password);
    const ex = this.imageController.checkExpiration(image);

    if (!pw) {
      response.sendStatus(UNAUTHORIZED);
    } else if (!ex) {
      response.sendStatus(GONE);
    } else {
      next();
    }
  }
}

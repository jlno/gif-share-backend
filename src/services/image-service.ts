import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { ImageController } from '../controllers/image-controller';
import { Get, Inject, Path, Post } from '../core/decorators';

/**
 * ImageService
 */
@Path('/image')
export class ImageService {
  /**
   * imageController
   */
  @Inject
  private imageController: ImageController;

  /**
   * search
   *
   * @param request
   * @param response
   */
  @Get('/:filename')
  async search(request: Request, response: Response): Promise<void> {
    try {
      const result = await this.imageController.search(request.params.filename);
      response.send(result);
    } catch (e) {
      response.status(INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  /**
   * findPublicImages
   *
   * @param request
   * @param response
   */
  @Get('/public')
  async findPublicImages(request: Request, response: Response): Promise<void> {
    try {
      const result = await this.imageController.findPublicImages();
      response.json(result);
    } catch (e) {
      response.status(INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  /**
   * save
   *
   * @param request
   * @param response
   */
  @Post()
  async save(request: Request, response: Response): Promise<void> {
    try {
      const result = await this.imageController.save(request.body);
      response.send(result);
    } catch (e) {
      response.status(INTERNAL_SERVER_ERROR).send(e.message);
    }
  }
}

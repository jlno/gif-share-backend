import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { VideoController } from '../controllers/video-controller';
import { Inject, Path, Post } from '../core/decorators';

/**
 * VideoService
 */
@Path('/video')
export class VideoService {
  /**
   * videoController
   */
  @Inject
  private videoController: VideoController;

  /**
   * converter
   *
   * @param request
   * @param response
   */
  @Post('/converter')
  async converter(request: Request, response: Response): Promise<void> {
    try {
      const result = await this.videoController.videoToBase64Gif(
        request.body,
        request.files
      );
      response.send(result);
    } catch (e) {
      response.status(INTERNAL_SERVER_ERROR).send(e.message);
    }
  }
}

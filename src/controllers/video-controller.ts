import { FileController } from './file-controller';
import { Inject } from '../core/decorators';

/**
 * VideoController
 */
export class VideoController {
  /**
   * fileController
   */
  @Inject
  private fileController: FileController;

  /**
   * videoToBase64GIF
   *
   * @param options
   * @param file
   */
  async videoToBase64GIF(options: any, file: any): Promise<string> {
    this.validate(options, file);

    const opts = {
      start: options.start,
      duration: options.end - options.start
    };

    return await this.fileController.createBase64GIF(file.video, opts);
  }

  /**
   * validate
   *
   * @param options
   * @param file
   */
  private validate(options: any, file: any): void {
    if (!file || !file.video) {
      throw new Error('[video] is required.');
    }
    if (isNaN(options.start)) {
      throw new Error('[start] is required.');
    } else {
      options.start = +options.start;
    }
    if (isNaN(options.end)) {
      throw new Error('[end] is required.');
    } else {
      options.end = +options.end;
    }
  }
}

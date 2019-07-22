import fs from 'fs';
import gify from 'gify';
import { STORAGE_PATH } from '../config';

export class FileController {
  /**
   * saveGIF
   *
   * @param base64
   */
  saveGIF(base64: string): any {
    const buffer = this.decodeBase64Image(base64);
    const path = this.createFilePath('gif');

    if (buffer.type !== 'image/gif') {
      throw new Error('[base64] is accept only gif type.');
    }

    fs.writeFileSync(path, buffer.data);

    const fileName = path.substr(path.lastIndexOf('/') + 1, path.length - 1);

    return {
      name: fileName,
      type: buffer.type
    };
  }

  /**
   * saveVideo
   *
   * @param file
   */
  saveVideo(file: any): Promise<string> {
    return new Promise((resolve: Function) => {
      const typeVideo = file.name.split('.').pop();
      const pathVideo = this.createFilePath(typeVideo);

      file.mv(pathVideo, err => {
        if (err) {
          throw new Error(err);
        }
        resolve(pathVideo);
      });
    });
  }

  /**
   * createBase64GIF
   *
   * @param video
   * @param opts
   */
  async createBase64GIF(video: any, opts: any): Promise<string> {
    const tmpVideo = await this.saveVideo(video);
    const tmpImage = this.createFilePath('gif');

    return new Promise((resolve: Function) => {
      gify(tmpVideo, tmpImage, opts, err => {
        if (err) {
          throw err;
        }
        const base64Image = this.encodeBase64Image(tmpImage);
        this.deleteFile(tmpVideo);
        this.deleteFile(tmpImage);

        resolve(base64Image);
      });
    });
  }

  /**
   * deleteFile
   *
   * @param path
   */
  deleteFile(path: string): void {
    fs.unlink(path, error => {
      if (error) {
        console.error(error);
      }
    });
  }

  /**
   * createFilePath
   *
   * @param type
   */
  createFilePath(type: string): string {
    return STORAGE_PATH.concat('/')
      .concat(
        Math.random()
          .toString(36)
          .substring(2, 15) +
          Math.random()
            .toString(36)
            .substring(2, 15)
      )
      .concat('.')
      .concat(type);
  }

  /**
   * decodeBase64Image
   *
   * @param dataString
   */
  private decodeBase64Image(dataString: string): any {
    const matches: RegExpMatchArray | null = dataString.match(
      /^data:([A-Za-z-+\/]+);base64,(.+)$/
    );
    const response: any = {};

    if (matches == null || matches.length !== 3) {
      throw new Error('[base64] is invalid input string.');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
  }

  /**
   * encodeBase64Image
   *
   * @param path
   */
  private encodeBase64Image(path: any): string {
    const image = fs.readFileSync(path);
    return 'data:image/gif;base64,' + new Buffer(image).toString('base64');
  }
}

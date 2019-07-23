import fs from 'fs';
import gify from 'gify';

export class FileController {
  /**
   * saveGif
   *
   * @param base64
   */
  saveGif(base64: string): any {
    const buffer = this.decodeBase64Gif(base64);
    const path = this.createFilePath('gif');

    fs.writeFileSync(path, buffer.data);

    const lastBar = path.lastIndexOf('/');
    const fileName = path.substr(lastBar + 1, path.length - 1);

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

      file.mv(pathVideo, error => {
        if (error) {
          throw new Error(error);
        }
        resolve(pathVideo);
      });
    });
  }

  /**
   * createBase64Gif
   *
   * @param video
   * @param options
   */
  async createBase64Gif(video: any, options: any): Promise<string> {
    const tmpVideo = await this.saveVideo(video);
    const tmpImage = this.createFilePath('gif');

    return new Promise((resolve: Function) => {
      gify(tmpVideo, tmpImage, options, async error => {
        if (error) {
          throw new Error(error);
        }
        const base64Image = await this.encodeBase64Gif(tmpImage);
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
        throw error;
      }
    });
  }

  /**
   * createFilePath
   *
   * @param type
   */
  createFilePath(type: string): string {
    return process
      .cwd()
      .concat('/storage/')
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
   * decodeBase64Gif
   *
   * @param dataString
   */
  private decodeBase64Gif(dataString: string): any {
    const matches: RegExpMatchArray | null = dataString.match(
      /^data:([A-Za-z-+\/]+);base64,(.+)$/
    );
    const response: any = {};

    if (matches == null || matches.length !== 3) {
      throw new Error('[base64] is invalid input string.');
    }

    if (matches[1] !== 'image/gif') {
      throw new Error('[base64] is accept only gif type.');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
  }

  /**
   * encodeBase64Gif
   *
   * @param path
   */
  private encodeBase64Gif(path: any): Promise<string> {
    return new Promise((resolve: Function) => {
      fs.readFile(path, (error, data) => {
        if (error) {
          throw error;
        }
        resolve('data:image/gif;base64,' + new Buffer(data).toString('base64'));
      });
    });
  }
}

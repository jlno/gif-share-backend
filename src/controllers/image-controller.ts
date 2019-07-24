import bcrypt from 'bcrypt';
import { Inject } from '../core/decorators';
import { ImageDAO } from '../dao/image-dao';
import Image from '../models/image';
import { FileController } from './file-controller';

/**
 * ImageController
 */
export class ImageController {
  /**
   * imageDAO
   */
  @Inject
  private imageDAO: ImageDAO;

  /**
   * fileController
   */
  @Inject
  private fileController: FileController;

  /**
   * search
   *
   * @param fileName
   */
  async search(fileName: string, parse: boolean = true): Promise<Image | null> {
    const image = await this.imageDAO.findByName(fileName);
    if (parse) {
      return this.parseOutput(image);
    }
    return image;
  }

  /**
   * findPublicImages
   */
  async findPublicImages(): Promise<(Image | null)[]> {
    const imageList = await this.imageDAO.findPublicImages();
    return this.parseOutputList(imageList);
  }

  /**
   * save
   *
   * @param image
   */
  async save(image: Image): Promise<Image | null> {
    this.validate(image);

    const file = await this.fileController.saveGif(image.base64);
    image.fileName = file.name;
    image.fileType = file.type;

    const result = await this.imageDAO.create(image);

    return this.parseOutput(result);
  }

  /**
   * checkPassword
   *
   * @param image
   * @param password
   */
  checkPassword(image: any, password: any): boolean {
    if (
      !image ||
      !image.private ||
      (image.private && bcrypt.compareSync(password || '', image.password))
    ) {
      return true;
    }
    return false;
  }

  /**
   * checkExpiration
   *
   * @param image
   */
  checkExpiration(image: any): boolean {
    const currentDate = new Date();

    if (!image || currentDate < image.expirationAt) {
      return true;
    }
    return false;
  }

  /**
   * parseOutput
   *
   * @param image
   */
  private parseOutput(image: Image | null): Image | null {
    if (image) {
      const output = image.get();
      output.password = null;
      output.url = `http://localhost:${process.env.APP_PORT}/storage/${
        image.fileName
      }`;
      return output;
    }
    return null;
  }

  /**
   * parseOutputList
   *
   * @param imageList
   */
  private parseOutputList(imageList: Image[]): (Image | null)[] {
    return imageList.map(data => this.parseOutput(data));
  }

  /**
   * validate
   *
   * @param data
   */
  private validate(image: Image): void {
    if (!image.base64) {
      throw new Error('[base64] is required.');
    }
    if (!image.expirationAt) {
      throw new Error('[expirationAt] is required.');
    }
    if (image.private === true) {
      if (image.password) {
        image.password = bcrypt.hashSync(image.password, 10);
      } else {
        throw new Error('[password] is required.');
      }
    }
  }
}

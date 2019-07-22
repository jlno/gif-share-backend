import Image from '../models/image';
import { Op } from 'sequelize';

/**
 * ImageDAO
 */
export class ImageDAO {
  /**
   * findByName
   *
   * @param fileName
   */
  async findByName(fileName: string): Promise<Image | null> {
    return await Image.findOne({ where: { fileName: fileName } });
  }

  /**
   * findPublicImages
   */
  async findPublicImages(): Promise<Image[]> {
    const orm: any = Image;

    return await orm.findAll({
      where: {
        private: false,
        expirationAt: {
          [Op.gt]: new Date()
        }
      },
      order: [['createdAt', 'DESC']]
    });
  }

  /**
   * create
   *
   * @param image
   */
  async create(image: Image): Promise<Image> {
    return await Image.create(image);
  }
}

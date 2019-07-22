import {
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
  Default,
  AllowNull
} from 'sequelize-typescript';

/**
 * Image
 */
@Table({ tableName: 'image' })
export default class Image extends Model<Image> {
  /**
   * name
   */
  @PrimaryKey
  @AllowNull(false)
  @Column({ field: 'ds_filename', type: DataType.STRING(255) })
  fileName: string;

  /**
   * fileType
   */
  @AllowNull(false)
  @Column({ field: 'ds_filetype', type: DataType.STRING(10) })
  fileType: string;

  /**
   * private
   */
  @Default(false)
  @AllowNull(false)
  @Column({ field: 'st_private', type: DataType.BOOLEAN })
  private: boolean;

  /**
   * password
   */
  @Column({ field: 'ds_password', type: DataType.STRING(255) })
  password: string;

  /**
   * expirationAt
   */
  @AllowNull(false)
  @Column({ field: 'dt_expirationat', type: DataType.DATE })
  expirationAt: Date;

  /**
   * createdAt
   */
  @CreatedAt
  @AllowNull(false)
  @Column({ field: 'dt_createdat', type: DataType.DATE })
  createdAt: Date;

  /**
   * updatedAt
   */
  @UpdatedAt
  @AllowNull(false)
  @Column({ field: 'dt_updatedat', type: DataType.DATE })
  updatedAt: Date;

  /**
   * Url
   */
  url: string;

  /**
   * base64
   */
  base64: string;
}

import { Sequelize } from 'sequelize-typescript';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from '../config';

/**
 * Database
 */
export class Database {
  private sequelize: Sequelize;

  /**
   * constructor
   */
  constructor() {
    this.init();
    this.sync();
  }

  /**
   * init
   */
  init(): void {
    this.sequelize = new Sequelize({
      dialect: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      modelPaths: [__dirname + '/../models/*.ts']
    });
  }

  /**
   * sync
   */
  sync(): void {
    this.sequelize.sync({ force: true, logging: true });
  }
}

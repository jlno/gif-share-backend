import { Sequelize } from 'sequelize-typescript';

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
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      modelPaths: [__dirname + '/../models/*']
    } as any);
  }

  /**
   * sync
   */
  sync(): void {
    const dropTables = false;

    this.sequelize.sync({
      force: dropTables,
      logging: log => console.log(log)
    });
  }
}

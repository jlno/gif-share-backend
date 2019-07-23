import * as dotenv from 'dotenv';

export class Config {
  static setEnvironments(): void {
    let path: string;

    switch (process.env.NODE_ENV) {
      case 'test':
        path = `${__dirname}/.env.test`;
        break;
      case 'prod':
        path = `${__dirname}/.env.prod`;
        break;
      default:
        path = `${__dirname}/.env.dev`;
    }

    dotenv.config({ path: path });
  }
}

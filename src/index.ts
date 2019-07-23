import { Config } from './config';
import { Database } from './core/database';
import { Express } from './core/express';
import { ImageService } from './services/image-service';
import { StorageService } from './services/storage-service';
import { VideoService } from './services/video-service';

// Define environments
Config.setEnvironments();

// Start app
Express.getApp().listen(process.env.APP_PORT, () => {
  new Database();
  new ImageService();
  new VideoService();
  new StorageService();
});

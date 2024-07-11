import { join } from 'path';
import { existsSync } from 'fs';
import { ConfigService } from '@nestjs/config';

export const filePath = (
  req: Express.Request,
  file: Express.Multer.File,
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function,
) => {
  const configService = new ConfigService();
  if (!file) return callback(new Error('No file provided'), false);
  const path = join(__dirname, `../../../${configService.get('STATIC_FILES_PATH')}`);
  if (!existsSync(path)) return callback(new Error('File path not found'), false);
  callback(null, path);
};

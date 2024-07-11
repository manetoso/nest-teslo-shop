import { join } from 'path';
import { existsSync } from 'fs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesService {
  constructor(private readonly configService: ConfigService) {}
  getstaticProductImage(imageName: string) {
    const path = join(__dirname, `../../${this.configService.get('STATIC_FILES_PATH')}`, imageName);

    if (!existsSync(path))
      throw new BadRequestException(`Not product found with name ${imageName}`);
    return path;
  }
}

import { Response } from 'express';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';

import { FilesService } from './files.service';
import { fileFilter, fileNamer, filePath } from './helpers';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('product/:imageName')
  findProductImage(@Res() res: Response, @Param('imageName') imageName: string) {
    const path = this.filesService.getstaticProductImage(imageName);
    res.status(200).sendFile(path);
  }

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: filePath,
        filename: fileNamer,
      }),
      // limits: { fileSize: 1024 * 1024 },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file provided');
    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`;
    return { secureUrl };
  }
}

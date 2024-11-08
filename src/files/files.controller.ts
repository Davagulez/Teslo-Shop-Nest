import { Response } from 'express';
import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { fileFilter, fileNamer } from './helpers';
import { ok } from 'assert';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) {}

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {
    const path = this.filesService.getStaticProductImage( imageName );

  return res.sendFile( path );
  }

  @Post('product')
  @UseInterceptors( FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/uploads/products',
      filename: fileNamer
    })
  }))
  uploadProductImage(
    @UploadedFile()  file: Express.Multer.File
  ){

    if (!file) throw new BadRequestException('make sure that the file is an image')

    const secureUrl = `${ this.configService.get('HOST_API') }/files/product/${ file.filename}`

    return { secureUrl };
  }
}

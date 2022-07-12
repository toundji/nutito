import { FileService } from './../services/file.service';
import { BadRequestException, Controller, Delete, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { Request, Response } from 'express';
import { Fichier } from '../entities/fichier.entity';
import { getMulterOptions } from 'src/utilities/helpers/multer.helper';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { UserService } from '../../user/services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { join } from 'path';

@Controller('files')
@ApiTags('files')
export class FileController{
    constructor(
        private fileService: FileService,
        private userService: UserService
    ){}

    // @Post('/create')
    // async createCarrer(@Body() createFileDto : CreateFileDto): Promise<File>{
    //     return await this.fileService.create(createFileDto);
    // }

    @Post('upload/:userId')
  @UseInterceptors(FileInterceptor('file', getMulterOptions()))
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File, 
    @Param('userId') userId: number, 
    @Req() request: any
  ) {
    if (file) {
      let dto = {
        entity_id: userId,
        name: `${file.filename}`,
        location: file.path,
        mimetype: file.mimetype,
        entity_name: "user"
      }
      await this.fileService.create(dto)
      return { message: "File Uploaded" }
    }
    if (request.fileValidationError) {
        throw new BadRequestException(request.fileValidationError)
    }
    if (!file) {
        throw new BadRequestException(`No file uploaded`)
    }
  }

  @Get('get/:userId')
  async seeUploadedMedia(
    @Param('userId') userId: number, 
    @Res() response: Response
  ) {
    const user = await this.userService.findOneById(userId)
    if (user) {
      response.sendFile(join(process.cwd(), user.profile.location))
    } else {
      console.log("blablalbla")
      //response.status(404).send("Sorry ! No user object matching id given in parameter");
    } 
  }

  
    @Get()
    async getAllFile(): Promise<Fichier[]>{
        return await this.fileService.findAll();
    }
  
    @Get('/:id')
    async getFileById(
        @Param('id') id :number
    ): Promise<Fichier>{
        return await this.fileService.findOnById(id);
    } 
    
    // @Put('update/:id')
    // async updateAccount(@Param('id') id : number, @Body() updateFileDto : UpdateFileDto){
    //     return await this.fileService.update(updateFileDto, id);
    // }
  
    @Delete('delete/:id')
    async deleteAccount(@Param('id') id : number){
        return await this.fileService.delete(id);
    }
}
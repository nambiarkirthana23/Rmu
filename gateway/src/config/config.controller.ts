import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { CONSTANT_MSG } from "src/common-dto/const";

@Controller('config')
export class ConfigController{
    constructor(
        private readonly configService:ConfigService
    ){ }

    @Get('configs')
    async getConfigs(@Res() res: any){
        try{
          console.log("get")
            let resp = await this.configService.getConfigs()
            if (resp.code == 'ECONNREFUSED') {
                res
                  .status(HttpStatus.INTERNAL_SERVER_ERROR)
                  .send({ error: 'Device Microservice ECONNREFUSED' });
              } else if (resp.statusCode === HttpStatus.OK) {
                res
                  .status(resp.statusCode)
                  .send({ success: resp.message, data: resp.data });
              } else {
                res.status(resp.statusCode).send({ error: resp.message });
              }

        }catch(err){
            console.log("err",err)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
                statusCode: false,
              });
            
        }
    }

    @Get('/:ref_id')
    async getConfig(@Res() res:any,@Param('ref_id') ref_id:number){
      try{
        console.log("ref_id",ref_id)
      let resp = await this.configService.getConfig(ref_id)
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res
          .status(resp.statusCode)
          .send({ success: resp.message, data: resp.data });
      } else {
        res.status(resp.statusCode).send({ error: resp.message });
      }
      }catch(err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
          statusCode: false,
        });
      

      }
    }
//ridtbl
    @Post('add')
    async addConfig(@Req() req:any,@Res() res:any,@Body() body:any){
      try{
        console.log("gw",body)
      let resp = await this.configService.addConfig(body);
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res
          .status(resp.statusCode)
          .send({ success: resp.message});
      } else {
        res.status(resp.statusCode).send({ error: resp.message });
      }
      
      }catch(err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
          statusCode: false,
        });
      }
    }
  
    @Put('update/:id')
    async updateConfig(@Req() req:any,@Res() res:any,@Param('id') id:any,@Body() body:any){
      try{
       console.log("gw",body,id)
       let resp = await this.configService.updateConfig(body,id);
       if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res
          .status(resp.statusCode)
          .send({ success: resp.message, data: resp.data });
      } else {
        res.status(resp.statusCode).send({ error: resp.message });
      }
      }catch(err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
          statusCode: false,
        });
      }
    }

    @Delete('delete/:id')
    async deleteConfig(@Req() req:any,@Res() res:any,@Param('id') id:any){
      try{
       console.log("id",id)
       let resp = await this.configService.deleteConfig(id);
       if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res
          .status(resp.statusCode)
          .send({ success: resp.message});
      } else {
        res.status(resp.statusCode).send({ error: resp.message });
      }
      }catch(err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
          statusCode: false,
        });
      }
    }

}
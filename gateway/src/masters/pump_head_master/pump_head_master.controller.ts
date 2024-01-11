import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, ValidationPipe } from "@nestjs/common";

import { CONSTANT_MSG } from "src/common-dto/const";
import { GatewayPumpMasterService } from "./pump_head_master.service";

@Controller('pump')
export class GatewayPumpMasterController
{
    constructor(private readonly pumpMasterService:GatewayPumpMasterService ){}
  

    @Post('/add')
    async addPump(@Res() res: any, @Body() body:any) {
      try {
        console.log("body",body)
        let resp = await this.pumpMasterService.addPump(body);
        console.log(resp);
        if (resp.code == 'ECONNREFUSED') {
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({ error: 'Device Microservice ECONNREFUSED' });
        } else if (resp.statusCode === HttpStatus.CREATED) {
          res
            .status(resp.statusCode)
            .send({ success: resp.message});
        } else {
          res.status(resp.statusCode).send({ error: resp.message });
        }
      } catch (err) {
        console.log(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
          statusCode: false,
        });
      }
    }
    @Get('/pumps')
    async getPumpMasterDetails(@Res() res: any) {
      try {
        let resp = await this.pumpMasterService.getPumps();
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
      } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
          statusCode: false,
        });
      }
    }


    @Get('/:id')
  async getPump(@Res() res: any, @Param('id') id: number) {
    try {
      let resp = await this.pumpMasterService.getPump(id);
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
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }


  @Put('update/:id')
  async updatePump(@Param('id') id: number, @Res() res: any,@Req() req:any, @Body() body: any) {
    try {
      console.log('id', id);
      // let id=param.id
      
      const {code,description } = body;
      console.log("body of update controller",body);
      let resp = await this.pumpMasterService.updatePump(
       id,body
      );
      console.log(resp);
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.ACCEPTED) {
        res
          .status(resp.statusCode)
          .send({ success: resp.message});
      } else {
        res.status(resp.statusCode).send({ error: resp.message });
      }
    } catch (err) {
      console.log('err', err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }


  @Delete('delete/:id')
  async deleteController(@Param('id') id:number,@Res() res:any){
    try{
      console.log("id",id)

      let resp = await this.pumpMasterService.deletePump(id);
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.NO_CONTENT) {
        res
          .status(resp.statusCode)
          .send({ success: resp.message, data: resp.data });
      } else {
        res.status(resp.statusCode).send({ error: resp.message });
      }

    }catch(err){
      console.log('err', err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }
}



  

  





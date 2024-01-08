import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, ValidationPipe } from "@nestjs/common";
import { GatewayControllerMasterService } from "./controller-master.service";
import { CONSTANT_MSG } from "src/common-dto/const";

@Controller('controller')
export class GatewayControllerMaster
{
    constructor(private readonly controllerMasterService:GatewayControllerMasterService ){}
  

    @Post('/add')
    async addController(@Res() res: any, @Body() body:any) {
      try {
        console.log("body",body)
        let resp = await this.controllerMasterService.addController(body);
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
    @Get('/controllers')
    async getControllerMasterDetails(@Res() res: any) {
      try {
        let resp = await this.controllerMasterService.getControllers();
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


    @Get('/:ref_id')
  async getController(@Res() res: any, @Param('ref_id') ref_id: number) {
    try {
      let resp = await this.controllerMasterService.getController(ref_id);
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
  async updateController(@Param('id') id: number, @Res() res: any,@Req() req:any, @Body() body: any) {
    try {
      console.log('id', id);
      // let id=param.id
      
      const {code,description } = body;
      console.log("body of update controller",body);
      let resp = await this.controllerMasterService.updateController(
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

      let resp = await this.controllerMasterService.deleteController(id);
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



  

  





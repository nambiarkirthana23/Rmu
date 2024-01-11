import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { GatewayOemMasterService } from "./oem_master.service";
import { CONSTANT_MSG } from "src/common-dto/const";

@Controller('oem')
export class GatewayOemMasterController
{
    constructor(private readonly oemMasterService:GatewayOemMasterService ){}
    
    @Post('/add')
    async addOem(@Res() res: any, @Body() body:any) {
      try {
        console.log("body",body)
        let resp = await this.oemMasterService.addOem(body);
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


    @Get('/oems')
    async getOems(@Res() res: any) {
      try {
        let resp = await this.oemMasterService.getOems();
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
    async getOem(@Res() res:any,@Param('id') id:number)
    {
      try {
        console.log("id of oem",id);
        let resp = await this.oemMasterService.getOem(id);
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


    @Put('update/:id')
    async updateOem(@Res() res:any,@Param('id') id:number,@Body() body:any)
    {
      try {
        console.log("id of oem",id);
        let resp = await this.oemMasterService.updateOem(id,body);
        if (resp.code == 'ECONNREFUSED') {
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({ error: 'Device Microservice ECONNREFUSED' });
        } else if (resp.statusCode === HttpStatus.ACCEPTED) {
          res
            .status(resp.statusCode)
            .send({ success: resp.message });
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
     





    @Delete('delete/:id')
    async deleteOem(@Param('id') id:number,@Res() res:any){
      try{
        console.log("id",id)
  
        let resp = await this.oemMasterService.deleteOem(id);
        console.log(resp);
        if (resp.code == 'ECONNREFUSED') {
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({ error: 'Device Microservice ECONNREFUSED' });
        } else if (resp.statusCode === HttpStatus.ACCEPTED) {
          res
            .status(resp.statusCode)
            .send({ success: resp.message });
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
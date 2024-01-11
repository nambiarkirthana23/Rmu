import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, ValidationPipe } from "@nestjs/common";

import { CONSTANT_MSG } from "src/common-dto/const";
import { GatewayAgencyMasterService } from "./agency-service";
@Controller('agency')
export class GatewayAgencyController
{
    constructor(private readonly agencyMasterService: GatewayAgencyMasterService) { }
   
    @Post('add')
    async addAgency(
      @Body() body: any,
      @Res() res: any,
      @Req() req: any,
    ) {
      try {
        const resp = await this.agencyMasterService.addAgency(body);
  
        console.log("res",resp)
        //console.log("gc",device)
        if (resp.code == 'ECONNREFUSED') {
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({ error: 'device MicroService ECONNREFUSED' });
        } else {
          console.log('gateway');
          console.log(resp.statusCode, resp.message);
          res.status(resp.statusCode).send({ message: resp.message });
        }
      } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
          statusCode: false,
        });
      }
    }
     //let resp = await this.agencyMasterService.getAllAgencies();
    @Get('/agencies')
    async getAllAgencies(@Req() req: any, @Res() res: any) {
        try{
            let resp = await this.agencyMasterService.getAllAgencies();
             console.log("get all agencies",resp)
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
           @Get('/agencies')
    async getAgency(@Req() req: any, @Res() res: any) {
        try{
            let resp = await this.agencyMasterService.getAgency();
             console.log("get all agencies",resp)
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

//   @Put('/:id')
//   async updateAgency(@Body() body:any,@Param('id') id:number,@Req() req: any, @Res() res: any) {
//     // let params: any = req.body;
//     //const id = req.query.id;
//     let resp = await this.agencyMasterService.updateAgency(body, id);
//     console.log("update agency",resp)
//     if (resp.code == 'ECONNREFUSED') {
//         res
//           .status(HttpStatus.INTERNAL_SERVER_ERROR)
//           .send({ error: 'Device Microservice ECONNREFUSED' });
//       }  else {
//         res
//         .status(resp.statusCode)
//         .send({ message: resp.message, data: resp.data });
        
//       }
//     }
//     catch(error)
//     {
//         console.log(error);
//     }
//     //res.status(resp.status).send();
//   }

@Put('/:id')
async updateAgency(@Res() res: any, @Body() body: any, @Param('id') id: any) {
  try {
    console.log("id",id);
    const{ref_id,name}=body;
    console.log(body);
    let resp = await this.agencyMasterService.updateAgency(body, id);
   
    console.log(resp)
    if (resp.code === 'ECONNREFUSED') {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'Device Microservice ECONNREFUSED' });
    } else if (resp.statusCode === HttpStatus.ACCEPTED) {
      res.status(resp.statusCode).send({ success: resp.message });
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
//   @Delete('')
//   async deleteAgency(@Param('id')id:number,@Req() req: any, @Res() res: any) {
//     // const id = req.query.id;
//     let resp = await this.agencyMasterService.deleteAgency(id);
//     res.status(resp.status).send();
//   }

  
  @Delete('/:id')
  async deleteAgency(@Param('id') id:number,@Res() res:any){
    try{
      console.log("id",id)

      let resp = await this.agencyMasterService.deleteAgency(id);
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
   



        











   
   






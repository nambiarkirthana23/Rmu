import { Body, Controller, HttpStatus, Post, Req, Res, ValidationPipe } from "@nestjs/common";

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


    // @Post('add')
    // async addAgency(@Body() body: any, @Res() res: any) {
    //   try {
    //     let resp = await this.agencyMasterService.addAgency(body);
  
    //     if (resp.code === 'ECONNREFUSED') {
    //       res
    //         .status(HttpStatus.INTERNAL_SERVER_ERROR)
    //         .send({ error: 'Device Microservice ECONNREFUSED' });
    //     } else if (resp.statusCode === HttpStatus.CREATED) {
    //       res.status(resp.statusCode).send({ success: resp.message });
    //     } else {
    //       res.status(resp.statusCode).send({ error: resp.message });
    //     }
    //   } catch (err) {
    //     res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
    //       message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
    //       statusCode: false,
    //     });
    //   }
    // }

}
import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { CONSTANT_MSG } from "src/common-dto/const";
import { GatewaySolarPumpMasterService } from "./solar_pump_masters.service";

@Controller('solarPump')
export class GatewaySolarPumpMasterController
{
    constructor(private readonly solarPumpMasterController:GatewaySolarPumpMasterService ){}
  

    @Post('/add')
    async addSolarPump(@Res() res: any, @Body() body:any) {
      try {
        console.log("body",body)
        let resp = await this.solarPumpMasterController.addSolarPump(body);
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
}
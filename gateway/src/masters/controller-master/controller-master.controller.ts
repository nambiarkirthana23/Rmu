import { Body, Controller, HttpStatus, Post, Req, Res, ValidationPipe } from "@nestjs/common";
import { GatewayControllerMasterService } from "./controller-master.service";
import { CONSTANT_MSG } from "src/common-dto/const";

@Controller('controller-master')
export class GatewayControllerMaster
{
    constructor(private readonly controllerMasterService:GatewayControllerMasterService ){}
    
   
    @Post('add')
    async addController(
      @Body() body: any,
      @Res() res: any,
      @Req() req: any,
    ) {
      try {
        const resp = await this.controllerMasterService.addController(body);
        console.log(body);
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
}
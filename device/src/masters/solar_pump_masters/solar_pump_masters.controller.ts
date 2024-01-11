import { Body } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { SolarPumpMasterService } from "./solar_pump_masters.service";

export class SolarPumpMasterController
{
    constructor(private controllerMasterService:SolarPumpMasterService){}
    @MessagePattern({ cmd: 'addControllerMaster' })
    async addPumpMaster(@Body() body:any): Promise<any> {
      try {
        console.log(body);
        const resp = await this.controllerMasterService.addSolarPump(body);
        console.log('controller master response', resp);
        return resp;
      } catch (err) {
        console.log('dc', err);
        return err;
      }
    }
}
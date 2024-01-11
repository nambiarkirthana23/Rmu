import { Body } from "@nestjs/common";

import { MessagePattern } from "@nestjs/microservices";
import { PumpModelMasterService } from "./pump_model_service.service";
export class PumpModelMasterController{
    constructor(private pumpModelMasterService:PumpModelMasterService){}
    @MessagePattern({ cmd: 'addPumpModel' })
    async addPump( body:any): Promise<any> {
      try {
        console.log("body ",body);
        const resp = await this.pumpModelMasterService.addPump(body);
        console.log('response', resp);
        return resp;
      } catch (err) {
        console.log('error', err);
        return err;
      }
    } 
}


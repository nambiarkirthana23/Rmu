import { Body, Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { ControllerMasterService } from "./controller-master.service";

@Controller('controller-master')
export class ControllerMasterController{
    constructor(private controllerMasterService:ControllerMasterService){}
    @MessagePattern({ cmd: 'addController' })
    async addController(@Body() body:any): Promise<any> {
      try {
        console.log(body);
        const device = await this.controllerMasterService.addController(body);
        console.log('dc', device);
        return device;
      } catch (err) {
        console.log('dc', err);
        return err;
      }
    }

}
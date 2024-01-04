import { MessagePattern } from "@nestjs/microservices";
import { AgencyMasterService } from "./agency.service";
import { Body, Controller } from "@nestjs/common";
@Controller()
export class AgencyMasterController
{
    constructor(private agencyMasterService:AgencyMasterService){}
    @MessagePattern({ cmd: 'addAgency' })
  async addAgency(@Body() body:any): Promise<any> {
    try {
      const device = await this.agencyMasterService.addAgency(body);
      console.log('dc', device);
      return device;
    } catch (err) {
      console.log('dc', err);
      return err;
    }
  }
// @MessagePattern({ cmd: 'addAgency' })
// async addAgency(body: any) {
//   try {
//     let resp = await this.agencyMasterService.addAgency(body);
//     return resp;
//   } catch (err) {
//     console.log('err', err);
//     return err;
//   }
// }



}
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



@MessagePattern({cmd:'getAllAgencies'})
async getAllAgencies():Promise<any>
{
    try{
       const resp=await this.agencyMasterService.getAllAgencies();
       console.log("get all agencies",resp);
       return resp;
    }
    catch(error)
    {
     console.log(error);
     return error;
    }
}
   

@MessagePattern({cmd:'updateAgency'})
async updateAgency(data:{body:any,id:number}):Promise<any>
{
    try{
        const{body,id}=data;
    const resp=await this.agencyMasterService.updateAgency(body,id);
    return resp;
    }
    catch(error)
    {
      console.log(error);
      return error;

    }
}


@MessagePattern({cmd:'deleteAgency'})
async deleteAgency(id:number)
{
    try{
     const resp=await this.agencyMasterService.deleteAgency(id);
     return resp;
    }
    catch(error)
    {
     console.log(error);
     return error;
    }
}




// @MessagePattern({cmd:'getAgency'})
// async getAllAgency():Promise<any>
// {
//     try{
//        const resp=await this.agencyMasterService.getAgency();
//        console.log("get all agencies",resp);
//        return resp;
//     }
//     catch(error)
//     {
//      console.log(error);
//      return error;
//     }
// }






}
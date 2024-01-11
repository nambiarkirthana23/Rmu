import { Body, Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { PumpMasterService } from "./pump_header_masters.service";


@Controller('')
export class PumpHeaderMasterController{
    constructor(private pumpHeaderMasterService:PumpMasterService){}
    @MessagePattern({ cmd: 'addPumpMaster' })
    async addPump(@Body() body:any): Promise<any> {
      try {
        console.log(body);
        const resp = await this.pumpHeaderMasterService.addPump(body);
        console.log('controller master response', resp);
        return resp;
      } catch (err) {
        console.log('dc', err);
        return err;
      }
    }

    @MessagePattern({cmd:'getPumps'})
    async getPumps()
    {
      try{
         const resp=await this.pumpHeaderMasterService.getPumps();
         return resp;
      }
      catch(error)
      {
        console.log(error);
        return error;
      }
    }

    @MessagePattern({cmd:'getPump'})
    async getPump(id:number)
    {
      try{
        const resp=await this.pumpHeaderMasterService.getPumpDetails(id);
        return resp;
      }
      catch(error)
      {
       console.log(error);
       return error;
      }
    }


    // @MessagePattern({cmd:'updateController'})
    // async updateController(id:number,body:any)
    // {
    //   try{
       
    //     const{code,description}=body;
    //     console.log("update controller",body);
    //     console.log("body",body);
    //     const resp=await this.controllerMasterService.updateController(id,body);
    //     return resp;
    //   }
    //   catch(error)
    //   {
    //     console.log(error);
    //     return error;
    //   }
    // }


    @MessagePattern({cmd:'updatePump'})
    async updatePump(data:{body:any,id:number}){
      try{
        console.log("enter device microservice")
        const {body,id}=data
        console.log(body,id,"mp")
        let resp = await this.pumpHeaderMasterService.updatePump(body,id)
        return resp;
      }catch(err){
        console.log("err",err)
        return err
      }
    }

  @MessagePattern({cmd:'delete'})
    async deletePump(id:number)
    {
      try{
       const resp=await this.pumpHeaderMasterService.deletePump(id);
       return resp;
      }
      catch(error)
      {
        console.log(error);
        return error;
      }
    }

}
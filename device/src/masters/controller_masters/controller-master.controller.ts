import { Body, Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { ControllerMasterService } from "./controller-master.service";

@Controller('controller-master')
export class ControllerMasterController{
    constructor(private controllerMasterService:ControllerMasterService){}
    @MessagePattern({ cmd: 'addControllerMaster' })
    async addController(@Body() body:any): Promise<any> {
      try {
        console.log(body);
        const resp = await this.controllerMasterService.addController(body);
        console.log('controller master response', resp);
        return resp;
      } catch (err) {
        console.log('dc', err);
        return err;
      }
    }

    @MessagePattern({cmd:'getControllers'})
    async getControllers()
    {
      try{
         const resp=await this.controllerMasterService.getControllers();
         return resp;
      }
      catch(error)
      {
        console.log(error);
        return error;
      }
    }

    @MessagePattern({cmd:'getController'})
    async getController(ref_id:number)
    {
      try{
        const resp=await this.controllerMasterService.getControllerDetails(ref_id);
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


    @MessagePattern({cmd:'updateController'})
    async updateController(data:{body:any,id:number}){
      try{
        console.log("enter device microservice")
        const {body,id}=data
        console.log(body,id,"mp")
        let resp = await this.controllerMasterService.updateController(body,id)
        return resp;
      }catch(err){
        console.log("err",err)
        return err
      }
    }

  @MessagePattern({cmd:'deleteController'})
    async deleteController(id:number)
    {
      try{
       const resp=await this.controllerMasterService.deleteController(id);
       return resp;
      }
      catch(error)
      {
        console.log(error);
        return error;
      }
    }

}
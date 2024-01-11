import { Body, Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { MotorMasterService } from "./motor-master.service";


@Controller('motor')
export class MotorMasterController{
    constructor(private motorMasterService:MotorMasterService){}
    @MessagePattern({ cmd: 'addMotorMaster' })
    async addMotor(@Body() body:any): Promise<any> {
      try {
        console.log(body);
        const resp = await this.motorMasterService.addMotor(body);
        console.log('motor master response', resp);
        return resp;
      } catch (err) {
        console.log('add motor', err);
        return err;
      }
    }

    @MessagePattern({cmd:'getMotors'})
    async getMotors()
    {
      try{
         const resp=await this.motorMasterService.getMotors();
         return resp;
      }
      catch(error)
      {
        console.log(error);
        return error;
      }
    }

    @MessagePattern({cmd:'getMotor'})
    async getMotor(ref_id:number)
    {
      try{
        const resp=await this.motorMasterService.getMotorDetails(ref_id);
        return resp;
      }
      catch(error)
      {
       console.log(error);
       return error;
      }
    }


    @MessagePattern({cmd:'updateMotor'})
    async updateMotor(id:number,body:any)
    {
      try{
       
        const{code,description}=body;
        console.log("update controller",body);
        console.log("body",body);
        const resp=await this.motorMasterService.updateMotor(id,body);
        return resp;
      }
      catch(error)
      {
        console.log(error);
        return error;
      }
    }

  @MessagePattern({cmd:'deleteMotor'})
    async deleteMotor(id:number)
    {
      try{
       const resp=await this.motorMasterService.deleteMotor(id);
       return resp;
      }
      catch(error)
      {
        console.log(error);
        return error;
      }
    }

}
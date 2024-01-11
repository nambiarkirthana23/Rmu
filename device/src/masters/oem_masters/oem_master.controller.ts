import { Body, Controller } from "@nestjs/common";
import { OemMasterService } from "./oem_master.service";
import { MessagePattern } from "@nestjs/microservices";
@Controller('oem')
export class OemMasterController
{
    constructor(private oemMasterService:OemMasterService){}
    @MessagePattern({ cmd: 'addOemMaster' })
    async addOEM(@Body() body:any): Promise<any> {
      try {
        console.log("body of add oem",body);
        const resp = await this.oemMasterService.addOEM(body);
        console.log('oem master response', resp);
        return resp;
      } catch (err) {
        console.log('add oem', err);
        return err;
      }
    } 



    @MessagePattern({cmd:'getOems'})
    async getOems(){
        try{
        let resp = await this.oemMasterService.getOems()
        return resp;
        }catch(err){
         console.log("err",err)
         return err;
        }

    }


    @MessagePattern({cmd:'getOem'})
    async getOem(id:number)
    {
      try
      {
        console.log("id",id);
        let resp=await this.oemMasterService.getOem(id);
        return resp;
      }
      catch(error)
      {
        console.log("error",error);
        return error;
      }
    }
    @MessagePattern({cmd:'updateOem'})
    async updateOem(data:{id:number,body:any})
    {
      try{
       const {id,body}=data;
       console.log(data);
        let resp=await this.oemMasterService.updateOem(id,body);
        return resp;
      }
      catch(error)
      {
       console.log(error);
       return error;
      }
    }



    @MessagePattern({cmd:'deleteOem'})
    async deleteOem(id:number)
    {
      try
      {
       console.log(id);
       let resp=await this.oemMasterService.deleteOem(id);
       return resp;
      }
      catch(error)
      {
       console.log(error);
       return error;
      }

    }



}
import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

export class GatewayMotorMasterService
{
    constructor(
        @Inject('DEVICE_SERVICE')
        private readonly deviceProxy: ClientProxy,
      ) {}
      
    async addMotor(body:any):Promise<any>{
   try{
    const resp=await this.deviceProxy.send({cmd:'addMotorMaster'},body).toPromise();
    console.log("response",resp)
    return resp;
   }
   catch(error)
   {
    console.log(error);
    return error;
   }
    }

    async getMotors():Promise<any>
    {
        try{
         const resp=await this.deviceProxy.send({cmd:'getMotors'},{}).toPromise();
         return resp;
        }
        catch(error)
        {
            console.log(error) ;
            return error; 
        }
    }



    async getMotor(ref_id:number):Promise<any>
    {
     try{
        const resp=await this.deviceProxy.send({cmd:'getMotor'},ref_id).toPromise();
        return resp;
     }
     catch(error)
     {
        console.log(error);
        return error;
     }
    }


     async updateMotor(id:number,body:any):Promise<any>
    {
       try{
        console.log("id",id);
        console.log("body",body);
         const resp=await this.deviceProxy.send({cmd:'updateMotor'},{id,body}).toPromise();
         return resp;
       }
       catch(error)
       {
        console.log(error);
        return error;
       }
    }



    async deleteMotor(id:number):Promise<any>
    {
        try{
          const resp=await this.deviceProxy.send({cmd:'deleteMotor'},id).toPromise();
          return resp;
        }
        catch(error)
        {
         console.log(error);
         return error;
        }
    }
}
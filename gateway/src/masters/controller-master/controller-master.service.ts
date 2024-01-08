import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

export class GatewayControllerMasterService
{
    constructor(
        @Inject('DEVICE_SERVICE')
        private readonly deviceProxy: ClientProxy,
      ) {}
    async addController(body:any):Promise<any>{
   try{
    const resp=await this.deviceProxy.send({cmd:'addControllerMaster'},body).toPromise();
    console.log("response",resp)
    return resp;
   }
   catch(error)
   {
    console.log(error);
    return error;
   }
    }

    async getControllers():Promise<any>
    {
        try{
         const resp=await this.deviceProxy.send({cmd:'getControllers'},{}).toPromise();
         return resp;
        }
        catch(error)
        {
            console.log(error) ;
            return error; 
        }
    }



    async getController(ref_id:number):Promise<any>
    {
     try{
        const resp=await this.deviceProxy.send({cmd:'getController'},ref_id).toPromise();
        return resp;
     }
     catch(error)
     {
        console.log(error);
        return error;
     }
    }


     async updateController(id:number,body:any):Promise<any>
    {
       try{
        console.log("id",id);
        console.log("body",body);
         const resp=await this.deviceProxy.send({cmd:'updateController'},{id,body}).toPromise();
         return resp;
       }
       catch(error)
       {
        console.log(error);
        return error;
       }
    }



    async deleteController(id:number):Promise<any>
    {
        try{
          const resp=await this.deviceProxy.send({cmd:'deleteController'},id).toPromise();
          return resp;
        }
        catch(error)
        {
         console.log(error);
         return error;
        }
    }
}
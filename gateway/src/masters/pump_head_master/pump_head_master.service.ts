import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

export class GatewayPumpMasterService
{
    constructor(
        @Inject('DEVICE_SERVICE')
        private readonly deviceProxy: ClientProxy,
      ) {}
    async addPump(body:any):Promise<any>{
   try{
    const resp=await this.deviceProxy.send({cmd:'addPumpMaster'},body).toPromise();
    console.log("response",resp)
    return resp;
   }
   catch(error)
   {
    console.log(error);
    return error;
   }
    }

    async getPumps():Promise<any>
    {
        try{
         const resp=await this.deviceProxy.send({cmd:'getPumps'},{}).toPromise();
         return resp;
        }
        catch(error)
        {
            console.log(error) ;
            return error; 
        }
    }



    async getPump(id:number):Promise<any>
    {
     try{
        const resp=await this.deviceProxy.send({cmd:'getPump'},id).toPromise();
        return resp;
     }
     catch(error)
     {
        console.log(error);
        return error;
     }
    }


     async updatePump(id:number,body:any):Promise<any>
    {
       try{
        console.log("id",id);
        console.log("body",body);
         const resp=await this.deviceProxy.send({cmd:'updatePump'},{id,body}).toPromise();
         return resp;
       }
       catch(error)
       {
        console.log(error);
        return error;
       }
    }



    async deletePump(id:number):Promise<any>
    {
        try{
          const resp=await this.deviceProxy.send({cmd:'deletePump'},id).toPromise();
          return resp;
        }
        catch(error)
        {
         console.log(error);
         return error;
        }
    }
}
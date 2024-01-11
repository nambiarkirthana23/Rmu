import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

export class GatewayPumpModelMasterService
{
    constructor(
        @Inject('DEVICE_SERVICE')
        private readonly deviceProxy: ClientProxy,
      ) {}
      
    async addOem(body:any):Promise<any>{
   try{
    const resp=await this.deviceProxy.send({cmd:'addPumpModel'},body).toPromise();
    console.log("response",resp)
    return resp;
   }
   catch(error)
   {
    console.log(error);
    return error;
   }
    }
}
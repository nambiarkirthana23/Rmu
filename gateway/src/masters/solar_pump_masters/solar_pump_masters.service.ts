import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

export class GatewaySolarPumpMasterService{
    constructor(
        @Inject('DEVICE_SERVICE')
        private readonly deviceProxy: ClientProxy,
      ) {}
    async addSolarPump(body:any):Promise<any>{
   try{
    const resp=await this.deviceProxy.send({cmd:'addSolarPump'},body).toPromise();
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
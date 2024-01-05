import { ClientProxy } from "@nestjs/microservices";

export class GatewayControllerMasterService
{
    constructor(private readonly controllerMasterProxy:ClientProxy){}
    async addController(body:any):Promise<any>{
   try{
    const resp=await this.controllerMasterProxy.send({cmd:'addController'},body).toPromise();
    
    return resp;
   }
   catch(error)
   {
    console.log(error);
    return error;
   }
    }
}
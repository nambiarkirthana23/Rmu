import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

export class GatewayOemMasterService
{
    constructor(
        @Inject('DEVICE_SERVICE')
        private readonly deviceProxy: ClientProxy,
      ) {}
      
    async addOem(body:any):Promise<any>{
   try{
    const resp=await this.deviceProxy.send({cmd:'addOemMaster'},body).toPromise();
    console.log("response",resp)
    return resp;
   }
   catch(error)
   {
    console.log(error);
    return error;
   }
    }


    async getOems() {
      try {
        let resp = await this.deviceProxy
          .send({ cmd: 'getOems' }, '')
          .toPromise();
        return resp;
      } catch (err) {
        return err;
      }
    }


    async getOem(id:number)
    {
      try
      {
      let resp=await this.deviceProxy
      .send({cmd:'getOem'},id).toPromise();
      return resp;
      }
      catch(error)
      {
        console.log(error)
        return error;
      }
    }

    


    async updateOem(id:number,body:any)
    {
      try{
        let resp=await this.deviceProxy
        .send({cmd:'updateOem'},{id,body}).toPromise();
        return resp;
      }
      catch(error)
      {
        console.log(error);
        return error;
      }
    }


    async deleteOem(id:number)
    {
      try{
        let resp=await this.deviceProxy
        .send({cmd:'deleteOem'},id).toPromise();
        return resp;
      }
      catch(error)
      {
        console.log(error);
        return error;
      }
    }
  
}
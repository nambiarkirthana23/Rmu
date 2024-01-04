import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

export class GatewayAgencyMasterService
{ constructor(
    @Inject('DEVICE_SERVICE')
    private readonly deviceProxy: ClientProxy,
  ) {
    
  }
    async addAgency(body:any): Promise<any> {
        try {
          const device = await this.deviceProxy
            .send({ cmd: 'addAgency' }, body)
            .toPromise();
          return device;
        } catch (err) {
          console.log(err);
          return err;
        }
      }

    // async addAgency(body: any) {
    //     try {
    //       let resp = await this.deviceProxy
    //         .send({ cmd: 'addAgency' }, body)
    //         .toPromise();
    //       return resp;
    //     } catch (err) {
    //       console.log('err', err);
    //       return err;
    //     }


    async getAllAgencies():Promise<any>
    {
      try{
         const resp=await this.deviceProxy.send({cmd:'getAllAgencies'},'').toPromise();
         console.log(resp);
         return resp;
      }
      catch(error)
      {
       console.log(error);
       return error;
      }
    }


    async getAgency():Promise<any>
    {
      try{
         const resp=await this.deviceProxy.send({cmd:'getAgency'},'').toPromise();
         console.log(resp);
         return resp;
      }
      catch(error)
      {
       console.log(error);
       return error;
      }
    }

     
    async updateAgency(body:any,id:number)
    {
        try{
           const resp=await this.deviceProxy.send({cmd:'updateAgency'},{body,id}).toPromise();
           console.log(resp);
           return resp;
        }
        catch(error)
        {
            console.log(error);
            return error;
        }

    }
     async deleteAgency(id:number)
     {
       try{
         const resp=await this.deviceProxy.send({cmd:'deleteAgency'},id).toPromise();
         console.log(resp);
         return resp;
       }
       catch(error)
       {
        console.log(error);
        return error;

       }
     }


      }
      

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
      }
      

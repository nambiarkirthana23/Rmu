import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { UserDto } from "./user.dto";

export class UserService{
    constructor(
        @Inject('DEVICE_SERVICE')
        private readonly deviceProxy: ClientProxy,
      ) {}
    
      async addUser(body:UserDto) {
        try {
          let resp = await this.deviceProxy.send({ cmd: 'addUser' }, body).toPromise()
          return resp;
        } catch (err) {
            return err;
        }
      }


      async getAllUser() {
        try {
          let resp = await this.deviceProxy.send({ cmd: 'getAllUser' },'').toPromise()
          return resp;
        } catch (err) {
            return err;
        }
      }

      async getUserById(id:number)
      {
        try
        {
            
        let resp=await this.deviceProxy.send({cmd:'getUserById'},id).toPromise();
        return resp;

      }
        catch(error)
        {
          console.log(error);
          return error;
        }
      }


      async updateUser(id:number,body:any) {
        try {
          let resp = await this.deviceProxy.send({ cmd: 'updateUser' },{id,body}).toPromise()
          return resp;
        } catch (err) {
            return err;
        }
      }

      async deleteUser(id:number)
      {
        try{
          console.log("user service",id);
        let resp=await this.deviceProxy.send({cmd:'deleteUser'},id).toPromise();
        return resp;
        }
        catch(error)
        {
          console.log(error);
          return error;
        }
      }



    

}
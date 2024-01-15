import { HttpStatus, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { UserDto } from "./user.dto";
import { CommonService } from "src/common-service/common-service";
import { CONSTANT_MSG } from "src/common-dto/const";
import { JwtService } from '@nestjs/jwt';

export class UserService{
    constructor(
      private readonly commonService:CommonService,
      private readonly jwtService: JwtService,
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


      async signIn(body: { email: string; password: string }) {
        try {
          console.log("signIn body",body);
          const { email, password } = body;
          const response = await this.deviceProxy.send({ cmd: 'signIn' }, { email, password }).toPromise();
          console.log("response",response)
        
         if(response && response.statusCode === HttpStatus.OK) {
            let jwtPl = {
              username: email,
           
            role: response.data.role,
              
            }
            console.log("jwt ",jwtPl);
            console.log(response.role,response.data.role)
            const token = this.generateToken(jwtPl);
            console.log("token:", token)
             return this.commonService.successMessage(
                { access_token: token },
                CONSTANT_MSG.TOKEN_GENERATED_SUCCESSFULLY,
                HttpStatus.OK
             )
          
          } else {
            return this.commonService.errorMessage(
                [],
                // CONSTANT_MSG.INVALID_CREDENTIALS,
                // HttpStatus.UNAUTHORIZED
                response.message,
                response.statusCode
            )
           
          }
        } catch (err) {
          console.log(err)
      
        return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.INTERNAL_SERVER_ERR,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    
      generateToken(payload: { username: string, role: string }): string {
        try {
            
          return this.jwtService.sign(payload);
        } catch (err) {
          console.log(err)
        }
      }



    

}
import { HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommonService } from "src/device/services/common-service";

import { Repository } from "typeorm";
import { CONSTANT_MSG } from "src/common-dto/const";
import { MotorMaster } from "./motor-master.entity";


export class MotorMasterService{
    constructor(private commonService:CommonService,
        @InjectRepository(MotorMaster)
    private readonly motorMasterRepository: Repository<MotorMaster>){}
    //addController = async (body:any) => {
       async addMotor(body:any){
        try {
          let getP = await this.getMotor(body.code);
         console.log("getP",getP);
          if (getP.statusCode === HttpStatus.OK && getP.data.length > 0) {
            return {
              status: HttpStatus.BAD_REQUEST,
              resp: 'Controller already exist'
            }
          }
          //let query = `INSERT INTO controller_master (code, description) VALUES('${code}','${description}')`;
          const{code,description}=body;
          let query=await this.motorMasterRepository.save(body);
         // let qresp = await this.db.runQuery(query, []);
         console.log("add controller query",query);
          if (query) {
            return this.commonService.successMessage(
                query,
                CONSTANT_MSG.SUCCESSFULLY_ADDED,
                HttpStatus.CREATED,
              );
            

          } else {
            return this.commonService.errorMessage(
                '',
                CONSTANT_MSG.FAILED_TO_ADD,
                HttpStatus.BAD_REQUEST,
              );
          }
    
        } catch (err) {
         
          return this.commonService.errorMessage(
            '',
            CONSTANT_MSG.INTERNAL_SERVER_ERR,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }

      async getMotor(code: any) {
        try {
           
          //let query = `select * from controller_master where code = '${code}';`;
          let query=await this.motorMasterRepository.findOne({where:{code}})
         console.log("get Controller",query);
          
    
          if (query) {
            
            return this.commonService.successMessage(
                query,
                CONSTANT_MSG.SUCCESSFULL,
                HttpStatus.OK,
              );
          } else {
            
            return this.commonService.errorMessage(
                '',
                CONSTANT_MSG.FAILED_TO_GET_DETAIL,
                HttpStatus.BAD_REQUEST,
              );
          }
    
        } catch (err) {
          
          return this.commonService.errorMessage(
            '',
            CONSTANT_MSG.INTERNAL_SERVER_ERR,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }

      async getMotors(): Promise<any> {
        try {
          let controller = await this.motorMasterRepository.find();
          console.log('controller', controller);
          if (!controller || controller.length === 0) {
            return this.commonService.errorMessage(
              [],
              CONSTANT_MSG.FETCH_ERROR,
              HttpStatus.BAD_REQUEST
            );
          } else {
            return this.commonService.successMessage(
              controller,
              CONSTANT_MSG.FETCH_SUCCESSFULLY,
              HttpStatus.OK,
            );
          }
        } catch (err) {
          console.log('err', err);
          return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.INTERNAL_SERVER_ERR,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }


      async getMotorDetails(ref_id:number): Promise<any> {
        try {
          let controller = await this.motorMasterRepository.findOne({where:{ref_id:ref_id}});
          console.log('controller', controller);
          if (!controller  ) {
            return this.commonService.errorMessage(
              [],
              CONSTANT_MSG.FETCH_ERROR,
              HttpStatus.BAD_REQUEST,
            );
          } else {
            return this.commonService.successMessage(
              controller,
              CONSTANT_MSG.FETCH_SUCCESSFULLY,
              HttpStatus.OK,
            );
          }
        } catch (err) {
          console.log('err', err);
          return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.INTERNAL_SERVER_ERR,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }


      async updateMotor(id:number,body:any){
        try {
          const{code,description}=body;
         
           let controllerToUpdate=await this.motorMasterRepository.findOne({where:{ref_id:id}});
           console.log("find",controllerToUpdate);
         // let query = `UPDATE controller_master SET code = '${data.code}',description = '${data.description}' where ref_id = ${ref_id}`;
        // // 
        // let query=await this.controllerMasterRepository.update(
        //   {ref_id:id},
        //   body
        // )
        console.log("update controller",body);
          controllerToUpdate.code=body.code;
          controllerToUpdate.description=body.description;
          let query=await this.motorMasterRepository.save(controllerToUpdate)
          console.log("controller to update",query)
          if (!query) {
            return this.commonService.errorMessage('',CONSTANT_MSG.FAIL_TO_UPDATE,HttpStatus.BAD_REQUEST);
          } else {
           
            return this.commonService.successMessage(query,CONSTANT_MSG.ABLE_TO_UPDATE_CONTROLLER,HttpStatus.ACCEPTED);
          }
    
        } catch (err) {
          console.log(err)
          return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            resp: 'Internal Server Error'
          }
        }


      }
      async deleteMotor(id:number)
      {
        try{
         let find_ref_id=await this.motorMasterRepository.findOne({where:{ref_id:id}});
         console.log(find_ref_id);
          let query=await this.motorMasterRepository.delete(find_ref_id);
          if(!query)
          {
           return this.commonService.errorMessage('',CONSTANT_MSG.FAIL_TO_DELETE_CONFIG,HttpStatus.NO_CONTENT)
          }
          else{
          return this.commonService.successMessage(query,CONSTANT_MSG.SUCCESSFULLY_DELETED_CONFIG,HttpStatus.OK)
          }
        }
        catch(error)
        {
          console.log(error)
         return this.commonService.errorMessage('',CONSTANT_MSG.INTERNAL_SERVER_ERR,HttpStatus.INTERNAL_SERVER_ERROR)
        }
      }


   
     

    
}

    

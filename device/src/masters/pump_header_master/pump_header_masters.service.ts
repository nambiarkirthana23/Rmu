import { HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommonService } from "src/device/services/common-service";

import { Repository } from "typeorm";
import { CONSTANT_MSG } from "src/common-dto/const";
import { PumpHeader } from "./pump_header_masters.entity";


export class PumpMasterService{
    constructor(private commonService:CommonService,
        @InjectRepository(PumpHeader)
    private readonly pumpMasterRepository: Repository<PumpHeader>){}
    //addController = async (body:any) => {
       async addPump(body:any){
        try {
          let getP = await this.getPump(body.code);
         console.log("getP",getP);
          if (getP.statusCode === HttpStatus.OK && getP.data.length > 0) {
            return {
              status: HttpStatus.BAD_REQUEST,
              resp: 'Controller already exist'
            }
          }
          const{code,description}=body;
          let query=await this.pumpMasterRepository.save(body);
        
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

      async getPump(code: any) {
        try {
           
         
          let query=await this.pumpMasterRepository.findOne({where:{code}})
         console.log("get ",query);
          
    
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

      async getPumps(): Promise<any> {
        try {
          let controller = await this.pumpMasterRepository.find();
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


      async getPumpDetails(id:number): Promise<any> {
        try {
          let controller = await this.pumpMasterRepository.findOne({where:{ref_id:id}});
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


      // async updateController(id:number,body:any){
      //   try {
      //     const{code,description}=body;
         
      //      let controllerToUpdate=await this.controllerMasterRepository.findOne({where:{ref_id:id}});
      //      console.log("find",controllerToUpdate);
      //    // let query = `UPDATE controller_master SET code = '${data.code}',description = '${data.description}' where ref_id = ${ref_id}`;
      //   // // 
      //   // let query=await this.controllerMasterRepository.update(
      //   //   {ref_id:id},
      //   //   body
      //   // )
      //   console.log("update controller",body);
      //     controllerToUpdate.code=body.code;
      //     controllerToUpdate.description=body.description;
      //     let query=await this.controllerMasterRepository.save(controllerToUpdate)
      //     console.log("controller to update",query)
      //     if (!query) {
      //       return this.commonService.errorMessage('',CONSTANT_MSG.FAIL_TO_UPDATE,HttpStatus.BAD_REQUEST);
      //     } else {
           
      //       return this.commonService.successMessage(query,CONSTANT_MSG.ABLE_TO_UPDATE_CONTROLLER,HttpStatus.ACCEPTED);
      //     }
    
      //   } catch (err) {
      //     console.log(err)
      //     return {
      //       status: HttpStatus.INTERNAL_SERVER_ERROR,
      //       resp: 'Internal Server Error'
      //     }
      //   }


      // }
      async deletePump(id:number)
      {
        try{
         let find_ref_id=await this.pumpMasterRepository.findOne({where:{ref_id:id}});
         console.log(find_ref_id);
          let query=await this.pumpMasterRepository.delete(find_ref_id);
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



      async updatePump(body:any,id:number){
        try{
          let ref_id = await this.pumpMasterRepository.find({where:{ref_id:id}})
                //console.log("ref_id",ref_id)
                if(!ref_id){
                  return this.commonService.errorMessage(
                    [],
                    CONSTANT_MSG.REF_ID_DOES_NOT_PRESENT,
                    HttpStatus.NOT_FOUND
                  )
                }
         let resp = await this.pumpMasterRepository.update(
          {ref_id:id},
          body
         )
    
         if(resp){
          return this.commonService.successMessage(
            [],
            CONSTANT_MSG.CONTROLLER_UPDATED_SUCCESSFULLY,
            HttpStatus.ACCEPTED
          )
         }else{
          return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.ERROR_WHILE_UPDATING,
            HttpStatus.BAD_REQUEST
          )
         }
        }catch(err){
          console.log("err",err)
          return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.INTERNAL_SERVER_ERR,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }


   
     

    
}

    

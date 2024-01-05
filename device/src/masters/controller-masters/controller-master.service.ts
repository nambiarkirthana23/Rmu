import { HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommonService } from "src/device/services/common-service";
import { ControllerMaster } from "./controller-master.entity";
import { Repository } from "typeorm";
import { CONSTANT_MSG } from "src/common-dto/const";

export class ControllerMasterService{
    constructor(private commonService:CommonService,
        @InjectRepository(ControllerMaster)
    private readonly controllerMasterRepository: Repository<ControllerMaster>){}
    addController = async (body:any) => {

        try {
          let getP = await this.getController(body.code);
    
          if (getP.statusCode === HttpStatus.OK && getP.data.length > 0) {
            return {
              status: HttpStatus.BAD_REQUEST,
              resp: 'Controller already exist'
            }
            
          }
          //let query = `INSERT INTO controller_master (code, description) VALUES('${code}','${description}')`;
          let query=await this.controllerMasterRepository.save(body.code,body.description);
         // let qresp = await this.db.runQuery(query, []);
        
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

      async getController(code: any) {
        try {
    
          //let query = `select * from controller_master where code = '${code}';`;
          let query=await this.controllerMasterRepository.findOne({where:{code}})
    
          
    
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
    
}
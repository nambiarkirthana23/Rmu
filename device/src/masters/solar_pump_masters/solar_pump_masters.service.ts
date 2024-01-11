import { InjectRepository } from "@nestjs/typeorm";
import { SolarPump } from "./solar_pump_entity";
import { CommonService } from "src/device/services/common-service";
import { HttpStatus } from "@nestjs/common";
import { Repository } from "typeorm";
import { CONSTANT_MSG } from "src/common-dto/const";

export class SolarPumpMasterService{
    constructor(private commonService:CommonService,
        @InjectRepository(SolarPump)
    private readonly solarPumpMasterRepository: Repository<SolarPump>){}
    
       async addSolarPump(body:any){
        try {
        //   let getP = await this.getController(body.code);
        //  console.log("getP",getP);
        //   if (getP.statusCode === HttpStatus.OK && getP.data.length > 0) {
        //     return {
        //       status: HttpStatus.BAD_REQUEST,
        //       resp: 'Controller already exist'
        //     }
        //   }
          //let query = `INSERT INTO controller_master (code, description) VALUES('${code}','${description}')`;
          const{description}=body;
          let query=await this.solarPumpMasterRepository.save(body);
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

      async getController(description: any) {
        try {
           
          //let query = `select * from controller_master where code = '${code}';`;
          let query=await this.solarPumpMasterRepository.findOne({where:{description}})
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
}
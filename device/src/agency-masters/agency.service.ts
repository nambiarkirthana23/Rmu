import { HttpStatus } from "@nestjs/common";
import { CONSTANT_MSG } from "src/common-dto/const";
import { CommonService } from "src/device/services/common-service";
import { AgencyMaster } from "./agency.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class AgencyMasterService{
    constructor(private commonService:CommonService,
        @InjectRepository(AgencyMaster)
    private readonly agencyRepository: Repository<AgencyMaster>){}
async addAgency(body:any)
{
  try{
    let getP=await this.getAgencyByName(body.name);
    console.log(getP);
    if (getP.statusCode === HttpStatus.OK) {

        return this.commonService.errorMessage(
            '',
            CONSTANT_MSG.AGENCY_ALREADY_EXISTS,
            HttpStatus.BAD_REQUEST,
          );
      }
      let query=await this.agencyRepository.save(body);
      console.log("saving query",query);
      if(!query)
      {
        return this.commonService.errorMessage(
            '',
            CONSTANT_MSG.FAILED_TO_ADD_AGENCY_DETAILS,
            HttpStatus.BAD_REQUEST,
          );
      }
      else{
        return this.commonService.successMessage(
            query,
            CONSTANT_MSG.AGENCY_ADDED_SUCCESSFULLY,
            HttpStatus.CREATED,
          );
      }



  }
  catch(error)
  {
    return this.commonService.errorMessage(
        '',
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }
}

getAgencyByName = async (name: any) => {
    try {

     // let query = `select * from agency_master_tbl where name = '${name}';`;
      let query=await this.agencyRepository.findOne({ where: { name } });
      //let qresp = await this.db.runQuery(query, []);

      if (!query) {
        return this.commonService.errorMessage(
            '',
            CONSTANT_MSG.BAD_REQUEST,
            HttpStatus.BAD_REQUEST,
          );
       
      } else {
        return this.commonService.successMessage
        (
            query,
            CONSTANT_MSG.ABLE_TO_GET_AGENCY_BY_NAME,
            HttpStatus.OK,
          );
      }

    } catch (err) {
      return this.commonService.errorMessage(
        '',
        CONSTANT_MSG.NOT_ABLE_TO_GET_AGENCY_BY_ITS_NAME,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}



// async addAgency(body: any) {
//     try {
//       let exist = await this.getAgencyByName(body.name);
//       if (exist.statusCode === HttpStatus.OK) {
//         return this.commonService.errorMessage(
//           [],
//           CONSTANT_MSG.ID_EXIST,
//           HttpStatus.CONFLICT,
//         );
//       } else {
//         let resp = await this.agencyRepository.save(body);
//         console.log('resp', resp);
//         if (!resp || Object.keys(resp).length === 0) {
//           return this.commonService.errorMessage(
//             [],
//             CONSTANT_MSG.UNABLE_TO_ADD,
//             HttpStatus.BAD_REQUEST,
//           );
//         } else {
//           return this.commonService.successMessage(
//             resp,
//             CONSTANT_MSG.AGENCY_ADDED_SUCCESSFULLY,
//             HttpStatus.CREATED,
//           );
//         }
//       }
//     } catch (err) {
//       console.log('err', err);
//       return this.commonService.errorMessage(
//         {},
//         CONSTANT_MSG.INTERNAL_SERVER_ERR,
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }

//   async getAgencyByName(name: string) {
//     try {
//       let exist = await this.agencyRepository.findOne({ where: { name } });
//       if (!exist || Object.keys(exist).length === 0) {
//         return this.commonService.errorMessage(
//           [],
//           CONSTANT_MSG.FETCH_ERROR,
//           HttpStatus.BAD_REQUEST,
//         );
//       } else {
//         return this.commonService.successMessage(
//           [],
//           CONSTANT_MSG.FETCH_SUCCESSFULLY,
//           HttpStatus.OK,
//         );
//       }
//     } catch (err) {
//       return this.commonService.errorMessage(
//         [],
//         CONSTANT_MSG.INTERNAL_SERVER_ERR,
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }


//     }
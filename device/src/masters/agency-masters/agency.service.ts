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


getAllAgencies= async () => {

    try {

      //let query = `select * from agency_master_tbl;`;
      let query=await this.agencyRepository.find();

      //let qresp = await this.db.runQuery(query, []);

      if (query) {
        
        return this.commonService.successMessage(
            query,
            CONSTANT_MSG.GET_AGENCIES_DETAILS_SUCCESSFULLY,
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
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        resp: []
      }
      return this.commonService.errorMessage('', CONSTANT_MSG.FAILED_TO_GET_DETAIL,
      HttpStatus.BAD_REQUEST,)
    }

  }


//   updateAgency = async (body: any, id: any) => {

//     try {

//       let query = await this.agencyRepository
//       .createQueryBuilder()
//       .update(AgencyMaster)
//       .set(body)
//       .where('ref_id=:id', { id })
//       .execute();
//       if (query) {
//         return {
//           status: HttpStatus.OK,
//         }
//       } else {
//         return {
//           status: HttpStatus.BAD_REQUEST,
//           resp: '[RMU Service] : Fail to update'
//         }
//       }

//     } catch (err) {
//       return {
//         status: HttpStatus.INTERNAL_SERVER_ERROR,
//         resp: '[RMU Service] : Internal Server Error'
//       }
//     }
//   }



async updateAgency(body: any, id: number) {
    try {
       
       
      let resp = await this.agencyRepository
        .createQueryBuilder()
        .update(AgencyMaster)
        .set(body)
        .where('ref_id=:id', { id })
        .execute();
        console.log(resp);
      if (resp) {
        return this.commonService.successMessage(
          resp,
          CONSTANT_MSG.SUCCESSFULLY_UPDATED_AGENCY,
          HttpStatus.ACCEPTED,
        );
      } else {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.UNABLE_TO_UPDATE_AGENCY,
          HttpStatus.BAD_REQUEST,
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


  deleteAgency = async (id:number) => {

    try {
     // let query = `DELETE FROM agency_master_tbl where ref_id = ${ref_id}`;
      const deleteResult = await this.agencyRepository
      .createQueryBuilder()
      .delete()
      .from(AgencyMaster)
      .where('ref_id = :id', { id })
      .execute();
     // let qresp = await this.db.runQuery(query, []);
      console.log(deleteResult)
      if(deleteResult) {
       
        return this.commonService.successMessage('deleteResult',CONSTANT_MSG.SUCCESSFULLY_DELETED_AGENCY_DETAILS,HttpStatus.ACCEPTED)

      } else {
      
        return this.commonService.errorMessage('',CONSTANT_MSG.FAIL_TO_DELETE,HttpStatus.BAD_REQUEST)
      }

    } catch (err) {
      
      return this.commonService.errorMessage('',CONSTANT_MSG.INTERNAL_SERVER_ERR,HttpStatus.INTERNAL_SERVER_ERROR)
    
    }
  }


  
// updateAgency = async (data: any, ref_id: any) => {

//     try {


//       let f = await this.getAgencyByName(data.name);
//       console.log(f);
//       if (f.statusCode === HttpStatus.OK) {
//         if (f.data.length === 0) {
//         }
//         else {
//           if (f.data[0].ref_id === ref_id) {
//             return {
//               status: HttpStatus.CONFLICT,
//               resp: 'Agency With name already exist'
//             }
//           }
//         }
//       }

//       let query = `UPDATE agency_master_tbl SET name = '${data.name}' where ref_id = ${ref_id}`
//      // let qresp = await this.db.runQuery(query, []);

//       if (query) {
//         return {
//           status: HttpStatus.OK,
//         }
//       } else {
//         return {
//           status: HttpStatus.BAD_REQUEST,
//           resp: '[RMU Service] : Fail to update'
//         }
//       }

//     } catch (err) {
//       return {
//         status: HttpStatus.INTERNAL_SERVER_ERROR,
//         resp: '[RMU Service] : Internal Server Error'
//       }
//     }
//   }










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


     }
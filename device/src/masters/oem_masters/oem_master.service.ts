import { HttpStatus } from "@nestjs/common";
import { OemMaster } from "./oem_master.entity";
import { CommonService } from "src/device/services/common-service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CONSTANT_MSG } from "src/common-dto/const";

export class OemMasterService
{
    constructor(private commonService:CommonService,
        @InjectRepository(OemMaster)
    private readonly oemMasterRepository: Repository<OemMaster>){}
   
    async addOEM(body:any){
        try {
            console.log(body);
            // const{name,email}=body;
          let getP = await this.getOEMByName(body.name);
          console.log("getP",getP);
           
          if (getP.statusCode === HttpStatus.OK && getP.data.length > 0) {
            return this.commonService.errorMessage('',CONSTANT_MSG.OEM_ALREADY_EXIST,HttpStatus.BAD_REQUEST);
            }
         // let query = `INSERT INTO oem_master (name, email) VALUES('${name}','${email}')`
          let query=await this.oemMasterRepository.save(body)
          if (query) {
            return this.commonService.successMessage(query,CONSTANT_MSG.SUCCESSFULLY_ADDED,HttpStatus.CREATED)
          } else {
             return this.commonService.errorMessage('',CONSTANT_MSG.FAIL_TO_ADD,HttpStatus.BAD_REQUEST)
          }
        } catch (err) {
          return this.commonService.errorMessage('',CONSTANT_MSG.INTERNAL_SERVER_ERR,CONSTANT_MSG.INTERNAL_SERVER_ERR)
        }
    }



      async getOEMByName(name: any) {
        try {
         console.log("getOEMByName",name);
         // let query = `select * from oem_master where name = '${name}';`;
          let query=await this.oemMasterRepository.find({where:{name:name}})
          console.log("getOEMByName",query)
          if (query) {
            return this.commonService.successMessage(query,CONSTANT_MSG.GET_OEM_DETAILS,HttpStatus.OK)
          } else {
            return this.commonService.errorMessage('',CONSTANT_MSG.FAILED_TO_GET_OEM_DETAILS,HttpStatus.BAD_REQUEST)
          }
    
        } catch (err) {
          console.log(err);
          return this.commonService.errorMessage('',CONSTANT_MSG.INTERNAL_SERVER_ERR,HttpStatus.INTERNAL_SERVER_ERROR)
        }
      }


      async getOems(): Promise<any> {
        try {
          let oem = await this.oemMasterRepository.find();
          console.log('oem', oem);
          if (!oem || oem.length === 0) {
            return this.commonService.errorMessage(
              [],
              CONSTANT_MSG.FETCH_ERROR,
              HttpStatus.BAD_REQUEST,
            );
          } else {
            return this.commonService.successMessage(
              oem,
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


      async getOem(id:number): Promise<any> {
        try {
          let oem = await this.oemMasterRepository.findOne({where:{ref_id:id}});
          console.log('oem', oem);
          if (!oem) {
            return this.commonService.errorMessage(
              [],
              CONSTANT_MSG.NOT_FOUND_REF_ID,
              HttpStatus.BAD_REQUEST,
            );
          } else {
            return this.commonService.successMessage(
              oem,
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


      async updateOem(id:number,body:any):Promise<any>
      {
        try{
        const{name,email}=body;
         console.log("id",id);
         console.log("body",body);

          let ref_id=await this.oemMasterRepository.find({where:{ref_id:id}});
          if(!ref_id)
          {
            return this.commonService.errorMessage('',CONSTANT_MSG.NOT_FOUND_REF_ID,HttpStatus.NOT_FOUND)
          }
          let resp = await this.oemMasterRepository.update(
            {ref_id:id},
            body
           );
           if(resp)
           {
            return this.commonService.successMessage(resp,CONSTANT_MSG.UPDATED_OEM_SUCCESSFULLY,HttpStatus.ACCEPTED)
           }
           else{
           return this.commonService.errorMessage('',CONSTANT_MSG.NOT_ABLE_TO_UPDATE_OEM,HttpStatus.BAD_REQUEST)
           }
        }
        catch(error)
        {
          console.log(error);
          return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.INTERNAL_SERVER_ERR,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
         
        }
      }

      async deleteOem(id:number): Promise<any> {
        try {
          let oem = await this.oemMasterRepository.findOne({where:{ref_id:id}});
          let deleteOem=await this.oemMasterRepository.delete(oem)
          console.log('oem', oem);
          if (!deleteOem) {
            return this.commonService.errorMessage(
              [],
              CONSTANT_MSG.FAILED_TO_DELETE_OEM,
              HttpStatus.BAD_REQUEST,
            );
          } else {
            return this.commonService.successMessage(
              oem,
              CONSTANT_MSG.SUCCESSFULLY_DELETED_OEM,
              HttpStatus.ACCEPTED,
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


      
      }
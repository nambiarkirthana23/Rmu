import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { YearMonth } from "./year_month.entity";
import { EntityManager, Repository } from "typeorm";
import { DateEntity } from "./date.entity";
import { CommonService } from "../services/common-service";
import { CONSTANT_MSG } from "src/common-dto/const";



@Injectable()
export class DeviceStatusService {
    constructor(@InjectRepository(YearMonth)
    private readonly yearMonthRepository: Repository<YearMonth>,
        @InjectRepository(DateEntity)
        private readonly dateRepository: Repository<DateEntity>,
        private readonly commonService: CommonService,
        @InjectEntityManager()
    private readonly entityManager: EntityManager,


    ) {
    //    this.addDeviceData({
    //   timestamp: '2023-01-17T12:30:00.000Z',
    //   imei_id: 72,
    // });

    this.getDeviceData(2023,12);
    }

    async addDeviceData(data: any) {
        try {
            let timestamp = new Date(data.timestamp);
            console.log("timestamp", timestamp);
            let month = timestamp.getMonth() + 1;
            console.log("month", month);
            let year = timestamp.getFullYear();
            console.log("year", year);
            const date = timestamp.getDate();
            console.log("date", date);

            let getYearAndMonthQuery = await this.yearMonthRepository
                .createQueryBuilder('a')
                .select(['a.id'])
                .where('a.month = :month', { month: month })
                .andWhere('a.year = :year', { year: year })
                .andWhere('a.imei_id = :imei_id', { imei_id: data.imei_id })
                .getRawOne();
            
             console.log("get year and month query",getYearAndMonthQuery);
            
            if (getYearAndMonthQuery) {
            let ymId=getYearAndMonthQuery.a_id;
                //console.log("id",getYearAndMonthQuery.data[0])
                //console.log("update year month", getYearAndMonthQuery.data)
                let getDateID = await this.dateRepository
                    .createQueryBuilder('d')
                    .select(['d.id'])
                   .where('d.ym_id = :ymId', { ymId:ymId})
                 .where('d.ym_id = :ymId', { ymId: ymId })
                    .andWhere('d.date = :date', { date: date })
                    .getRawOne();
                    console.log("getDateID",getDateID);
            
                if (getDateID) {
                    //update query
                    // let updateQuery = `UPDATE ${DB.database}.date 
                    // SET ado = '${data.ado}' WHERE id = ${getDateQuery.data[0].id}`;
                    console.log("Update Date")
                    let id=getDateID.d_id
                    let updateQuery = await this.dateRepository
                        .createQueryBuilder()
                        .update(DateEntity)
                        .set({ ado: data.ado })
                        .where('id = :id', { id:id })
                        .execute();
                        console.log("updateQuery",updateQuery)
                        if(updateQuery)
                        {
                        return this.commonService.successMessage(updateQuery,CONSTANT_MSG.UPDATED,HttpStatus.ACCEPTED)
                        }
                }
                else {
                    // insert query
                    // let insert=await this.dateRepository
                    // .createQueryBuilder()
                    // .insert()
                    // .into(Date)
                    // .values({
                    //   ym_id: getYearAndMonthQuery.data[0].id,
                    //   ado: data.ado,
                    //   date: date,
                    // })
                    let insertQuery = await this.dateRepository
                        .createQueryBuilder()
                        .insert()
                        .into(DateEntity)
                        .values({
                            ym_id: getYearAndMonthQuery[0].id,
                            ado: data.ado,
                            date: date,
                        })
                        .execute()

                        

                }
            }
            else {
                let ymquery = await this.yearMonthRepository
                    .createQueryBuilder()
                    .insert()
                    .into(YearMonth)
                    .values({
                        month: month,
                        year: year,
                        imei_id: data.imei_id
                    })
                    .execute();
                if (ymquery) {
                    let dqQuery = await this.dateRepository
                        .createQueryBuilder()
                        .insert()
                        .into(DateEntity)
                        .values({
                            ym_id: data.ym_id,
                            ado: data.ado,
                            date: date
                        })
                        .execute();

                    if (dqQuery) {
                        return this.commonService.successMessage(dqQuery, CONSTANT_MSG.ACCEPTED, HttpStatus.ACCEPTED)
                    }
                    else {
                        return this.commonService.errorMessage('', CONSTANT_MSG.BAD_REQUEST, HttpStatus.BAD_REQUEST);
                    }

                }
            }

        }

        catch (error) {
            console.log(error)
            return this.commonService.errorMessage('', CONSTANT_MSG.INTERNAL_SERVER_ERR, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async getDeviceData(year:number,id:number)
    {
     try{
        const query = this.yearMonthRepository.createQueryBuilder('ym')
        .select([`JSON_OBJECT('month': ym.month, 'year': ym.year, 'days', (SELECT JSON_ARRAYAGG(JSON_OBJECT('date', CONCAT_WS("/", d.date, ym.month, ym.year), 'ado': d.ado)) FROM date d WHERE d.ym_id = ym.id ORDER BY CAST(d.date AS SIGNED INTEGER) ASC))`, 'data'])
        .where('ym.year = :year', { year })
        .andWhere('ym.imei_id = :id', { id })
        .orderBy('ym.month', 'ASC')
        .getOne();
        console.log("query",query)
      
     }
     catch(error)
     {
        console.log(error);
    
     }
    }



   
   






}

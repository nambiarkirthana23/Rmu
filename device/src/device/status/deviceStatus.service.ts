import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectConnection, InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { YearMonth } from "./year_month.entity";
import { Connection, EntityManager, Repository } from "typeorm";
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
    private readonly entityManager: EntityManager


//done with getdevicedata method,lastdevice data used raw query and query builder 
//installed project and learned some different way to do project,learned about task scheduling and implemented,and read about sequelize and redis
  ) {
    //    this.addDeviceData({
    //   timestamp: '2023-01-17T12:30:00.000Z',
    //   imei_id: 72,
    // });

    // this.getDeviceData(2023, 72);

    // this.getData(2023,72)
    //  this.getLastADDeviceData(72)
  //  this.getLastADDeviceData(72)
  }
//
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

      console.log("get year and month query", getYearAndMonthQuery);

      if (getYearAndMonthQuery) {
        let ymId = getYearAndMonthQuery.a_id;
        //console.log("id",getYearAndMonthQuery.data[0])
        //console.log("update year month", getYearAndMonthQuery.data)
        let getDateID = await this.dateRepository
          .createQueryBuilder('d')
          .select(['d.id'])
          .where('d.ym_id = :ymId', { ymId: ymId })
          .where('d.ym_id = :ymId', { ymId: ymId })
          .andWhere('d.date = :date', { date: date })
          .getRawOne();
        console.log("getDateID", getDateID);

        if (getDateID) {
          //update query
          // let updateQuery = `UPDATE ${DB.database}.date 
          // SET ado = '${data.ado}' WHERE id = ${getDateQuery.data[0].id}`;
          console.log("Update Date")
          let id = getDateID.d_id
          let updateQuery = await this.dateRepository
            .createQueryBuilder()
            .update(DateEntity)
            .set({ ado: data.ado })
            .where('id = :id', { id: id })
            .execute();
          console.log("updateQuery", updateQuery)
          if (updateQuery) {
            return this.commonService.successMessage(updateQuery, CONSTANT_MSG.UPDATED, HttpStatus.ACCEPTED)
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
          // let insertQuery = await this.dateRepository
          //     .createQueryBuilder()
          //     .insert()
          //     .into(DateEntity)
          //     .values({
          //         ym_id: { ym_id: getYearAndMonthQuery[0].id },
          //         ado: data.ado,
          //         date: date,
          //     })
          //     .execute();




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
          // let dqQuery = await this.dateRepository
          //     .createQueryBuilder()
          //     .insert()
          //     .into(DateEntity)
          //     .values({
          //         ym_id: {},
          //         ado: data.ado,
          //         date: date
          //     })
          //     .execute();

          // if (dqQuery) {
          //     return this.commonService.successMessage(dqQuery, CONSTANT_MSG.ACCEPTED, HttpStatus.ACCEPTED)
          // }
          // else {
          //     return this.commonService.errorMessage('', CONSTANT_MSG.BAD_REQUEST, HttpStatus.BAD_REQUEST);
          // }

        }
      }

    }

    catch (error) {
      console.log(error)
      return this.commonService.errorMessage('', CONSTANT_MSG.INTERNAL_SERVER_ERR, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  // async getDeviceData(year: number, id: number) {
  //     try {
  //         // const query = await this.yearMonthRepository.createQueryBuilder('ym')
  //         //     .select([
  //         //         `JSON_OBJECT('month', ym.month, 'year', ym.year, 'days', 
  //         // (SELECT JSON_ARRAYAGG(JSON_OBJECT('date', CONCAT_WS("/", d.date, ym.month, ym.year), 'ado', d.ado)) 
  //         //  FROM date d WHERE d.ym_id = ym.id ORDER BY CAST(d.date AS SIGNED INTEGER) ASC)
  //         //  ) AS data`
  //         //     ])
  //         //     .where('ym.year = :year', { year })
  //         //     .andWhere('ym.imei_id = :id', { id })
  //         //     .orderBy('ym.month', 'ASC')
  //         //     .getMany();



  //         const query = await this.yearMonthRepository.createQueryBuilder('ym')
  //             // .leftJoin('date', 'd', 'd.ym_id = ym.id')
  //             .select([
  //                 `JSON_OBJECT('month', ym.month, 'year', ym.year, 'days', 
  //     (SELECT JSON_ARRAYAGG(JSON_OBJECT('date', CONCAT_WS("/", d.date, ym.month, ym.year), 'ado', d.ado)))
  //      ) `
  //             ])
  //             .leftJoin('date', 'd', 'd.ym_id = ym.id')
  //             .where('ym.year = :year', { year })
  //             .andWhere('ym.imei_id = :id', { id })
  //             .groupBy('ym.id')
  //             .orderBy('ym.month', 'ASC')
  //             .getMany();

  //         console.log("query", query);


  //     // const result1 = await this.yearMonthRepository
  //     // .createQueryBuilder('ym')
  //     // .select([
  //     //   'ym.month as month',
  //     //   'ym.year as year',
  //     //   'JSON_ARRAYAGG(JSON_OBJECT("date", CONCAT_WS("/", d.date, ym.month, ym.year), "ado", d.ado)) as days',
  //     // ])
  //     // .leftJoin('date', 'd', 'd.ym_id = ym.id')
  //     // .where('ym.year = :year', { year })
  //     // .andWhere('ym.imei_id = :id', { id })
  //     // .groupBy('ym.id')
  //     // .orderBy('ym.month', 'ASC')
  //     // .getRawMany();

  //     //     console.log("result1",result1);



  //     }
  //     catch (error) {
  //         console.log(error);


  //     }
  // }



  async getDeviceData(year: number, imei_id: number): Promise<any> {
    try {

      const rawQuery = `
          SELECT JSON_OBJECT(
            'month', ym.month, 
            'year', ym.year, 
            'days', (
              SELECT JSON_ARRAYAGG(JSON_OBJECT(
                'date', CONCAT_WS('/', d.date, CONCAT_WS('-', ym.month, ym.year)),
                'ado', d.ado
              ))
              FROM date d 
              WHERE d.ym_id = ym.id 
              ORDER BY CAST(d.date AS SIGNED INTEGER) ASC
            )
          ) AS data
          FROM \`year_month\` ym 
          WHERE ym.year = ${year} AND imei_id = ${imei_id}
          ORDER BY ym.month ASC;
        `;
      const result = await this.entityManager.query(rawQuery);
      console.log("get data", result);
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }


  async getLastADDeviceData(id: number) {
    try {

      // let result = await this.yearMonthRepository
      //   .createQueryBuilder('t1')
      //   .select(['t1.year', 't1.month', 't2.date', 't2.ado'])
      //   .innerJoin('DateEntity', 't2', 't1.id = t2.ym_id')
      //   .where('t1.imei_id = :id', {id: id }) 
      //   .andWhere('t2.ado<>:ado',{ado:''} ) 
      //   .orderBy('t2.id', 'DESC')
      //   .limit(1)
      //   .getOne();
      //   console.log("result",result);


      let result = await this.yearMonthRepository
        .createQueryBuilder('t1')
        .select(['t1.year', 't1.month', 't2.date', 't2.ado'])
        .leftJoin('DateEntity', 't2', 't1.id = t2.ym_id')
        .where('t1.imei_id = :id', { id: id })
        .andWhere('t2.ado != :ado', { ado: '' })
        .orderBy('t2.id', 'DESC')
        .limit(1)
        .getOne(); 

      console.log("result", result);



      //let rawQuery='SELECT t1.year, t1.month, t2.date, t2.ado FROM .year_month t1 JOIN rmucloud.date t2 ON t1.id = t2.ym_id WHERE t1.imei_id = 72 AND t2.ado <> '',ORDER BY t2.id DESC LIMIT 1;'














      // let rawQuery='SELECT t1.year,t1.month,t2.date,t2.ado FROM rmucloud.year_month t1 JOIN rmucloud.date t2 ON t1.id = t2.ym_id WHERE t1.imei_id = 72 AND t2.ado <> '' ORDER BY t2.id DESC LIMIT 1'
      //   console.log("get last ADO device data", rawQuery);
    } catch (error) {
      console.log(error);
    }
  }










}

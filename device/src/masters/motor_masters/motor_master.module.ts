import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonService } from "src/device/services/common-service";
import { MotorMaster } from "./motor-master.entity";
import { MotorMasterController } from "./motor_master.controller";
import { MotorMasterService } from "./motor-master.service";



@Module({
    imports:[
        TypeOrmModule.forFeature([MotorMaster]), 
        ClientsModule.register([
        {
          name: 'DEVICE_SERVICE',
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: 3001,
          },
        },
      ])
    ],
    controllers:[MotorMasterController],
    providers:[MotorMasterService,CommonService],
    exports:[MotorMasterService]
})

export  class MotorMasterModule{}
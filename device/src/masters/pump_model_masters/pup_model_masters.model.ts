import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonService } from "src/device/services/common-service";
import { PumpModel } from "./pump_model_masters.entity"
import { PumpModelMasterController } from "./pump_model_masters.controller";
import { PumpModelMasterService } from "./pump_model_service.service";


@Module({
    imports:[
        TypeOrmModule.forFeature([PumpModel]), 
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
    controllers:[PumpModelMasterController],
    providers:[PumpModelMasterService,CommonService],
    exports:[]
})

export  class PumpModelMasterModule{}
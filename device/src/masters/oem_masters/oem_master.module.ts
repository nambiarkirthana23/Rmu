import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonService } from "src/device/services/common-service";
import { OemMaster } from "./oem_master.entity";
import { OemMasterController } from "./oem_master.controller";
import { OemMasterService } from "./oem_master.service";
;



@Module({
    imports:[
        TypeOrmModule.forFeature([OemMaster]), 
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
    controllers:[OemMasterController],
    providers:[OemMasterService,CommonService],
    exports:[]
})

export  class OemMasterModule{}
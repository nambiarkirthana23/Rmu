import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonService } from "src/device/services/common-service";
import { ControllerMasterController } from "./conroller-master.controller";
import { ControllerMasterService } from "./controller-master.service";
import { ControllerMaster } from "./controller-master.entity";


@Module({
    imports:[
        TypeOrmModule.forFeature([ControllerMaster]), 
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
    controllers:[ControllerMasterController],
    providers:[ControllerMasterService,CommonService],
    exports:[ControllerMasterService]
})

export  class ControllerMasterModule{}
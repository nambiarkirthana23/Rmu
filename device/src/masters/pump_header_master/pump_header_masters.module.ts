import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonService } from "src/device/services/common-service";
import { PumpHeader } from "./pump_header_masters.entity";
import { PumpHeaderMasterController } from "./pump_header_masters.controller";
import { PumpMasterService } from "./pump_header_masters.service";


@Module({
    imports:[
        TypeOrmModule.forFeature([PumpHeader]), 
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
    controllers:[PumpHeaderMasterController],
    providers:[PumpMasterService,CommonService],
    exports:[PumpMasterService]
})

export  class PumpMasterModule{}
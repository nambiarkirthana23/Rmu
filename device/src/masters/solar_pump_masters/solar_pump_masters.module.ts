import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonService } from "src/device/services/common-service";
import { SolarPumpMasterController } from "./solar_pump_masters.controller";
import { SolarPumpMasterService } from "./solar_pump_masters.service";
import { SolarPump } from "./solar_pump_entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([SolarPump]), 
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
    controllers:[SolarPumpMasterController],
    providers:[SolarPumpMasterService,CommonService],
    exports:[SolarPumpMasterService]
})

export  class SolarPumpMasterModule{}
import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonService } from "src/device/services/common-service";
import { ProjectController } from "./project_master.controller";
import { ProjectService } from "./project_master.service";
import { ProjectMaster } from "./project_masters.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([ProjectMaster]), 
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
    controllers:[ProjectController],
    providers:[ProjectService,CommonService],
    exports:[]
})

export  class ProjectMasterModule{}
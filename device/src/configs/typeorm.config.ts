import {TypeOrmModuleAsyncOptions,TypeOrmModuleOptions} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Rid } from 'src/device/entities/rid.entity';
import { Device } from 'src/device/entities/device.entity';
import { RidConfig } from 'src/device/entities/rid_config.entity';
import { DeviceRid } from 'src/device/entities/rid.device.entity';
import { ConfigTable } from 'src/device/entities/config.entity';
import { FlowFormula } from 'src/device/entities/flow_formula.entity';
import { Invalid } from 'src/device/entities/invalids.entity';
import { ReconfigurationDetail } from 'src/device/entities/reconfiguration_details';
import { ReconfigurationOldConfig } from 'src/device/entities/reconfiguration_old_config.entity';
import { State } from 'src/device/entities/state.entity';
import { Vendor } from 'src/device/entities/vendor.entity';
import { Sim } from 'src/device/entities/sim.entity';
import { RidSim } from 'src/device/entities/rid.sim.entity';
;

import { ControllerMaster } from 'src/masters/controller_masters/controller-master.entity';
import { AgencyMaster } from 'src/masters/agency_masters/agency.entity';
import { OemMaster } from 'src/masters/oem_masters/oem_master.entity';
import { ProjectMaster } from 'src/masters/project_masters/project_masters.entity';
import { PumpHeader } from 'src/masters/pump_header_master/pump_header_masters.entity';
import { PumpModel } from 'src/masters/pump_model_masters/pump_model_masters.entity';
import { SolarPump } from 'src/masters/solar_pump_masters/solar_pump_entity';


export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      migrations:['migrations/**'],
      entities: [Device,Rid,RidConfig,DeviceRid,ConfigTable,FlowFormula,Invalid,ReconfigurationDetail,ReconfigurationOldConfig,State,Vendor,Sim,RidSim,AgencyMaster,ControllerMaster,OemMaster,ProjectMaster,PumpHeader,PumpModel,SolarPump],
      
        // other configurations
        "logging": true,
      
      
      //synchronize: true,
   
    };
  }
}

// const typeOrmconfig =  new TypeOrmConfig()

export const typeOrmconfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};

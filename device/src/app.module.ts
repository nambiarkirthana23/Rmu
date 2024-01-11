import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmconfigAsync } from './configs/typeorm.config';
import { RidModule } from './rid/modules/rid.module';
import { DeviceModule } from './device/modules/device.module';
import { StateModule } from './portals/states/state.module';
import { VendorModule } from './portals/vendors/vendor.module';
import { SimModule } from './sims/sim.module';
import { ConfigsModule } from './config-api/configs.module';

import { ControllerMasterModule } from './masters/controller_masters/controller-master.module';
import { AgencyModule } from './masters/agency_masters/agency.module';
import { MotorMasterModule } from './masters/motor_masters/motor_master.module';
import { OemMasterModule } from './masters/oem_masters/oem_master.module';
import { ProjectMasterModule } from './masters/project_masters/project_master.module';
import { PumpMasterModule } from './masters/pump_header_master/pump_header_masters.module';
import { PumpModelMasterModule } from './masters/pump_model_masters/pup_model_masters.model';
import { SolarPump } from './masters/solar_pump_masters/solar_pump_entity';
import { SolarPumpMasterModule } from './masters/solar_pump_masters/solar_pump_masters.module';


@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmconfigAsync),
    ClientsModule.register([
    {
      name: 'DEVICE_SERVICE',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    },
  ]),RidModule,DeviceModule,StateModule,VendorModule,SimModule,ConfigsModule,AgencyModule,ControllerMasterModule,MotorMasterModule,OemMasterModule,ProjectMasterModule,PumpMasterModule,PumpModelMasterModule,SolarPumpMasterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

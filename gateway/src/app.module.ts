import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckMicroservicesService } from './services/healthcheck.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DeviceModule } from './device/modules/device.module';
import { RIDModule } from './device/modules/rid.module';
import { StateController } from './portals/states/state.controller';
import { StateService } from './portals/states/state.service';
import { VendorController } from './portals/vendors/vendor.controller';
import { VendorService } from './portals/vendors/vendor.service';
import { SimController } from './sim/sim.controller';
import { SimService } from './sim/sim.service';
import { ConfigController } from './config/config.controller';
import { ConfigService } from './config/config.service';
import { GatewayAgencyController } from './masters/agency-master/agency-controller';
import { GatewayAgencyMasterService } from './masters/agency-master/agency-service';
import { GatewayControllerMaster } from './masters/controller-master/controller-master.controller';
import { GatewayControllerMasterService } from './masters/controller-master/controller-master.service';
import { GatewayMotorMasterController } from './masters/motor-master/motor_master.controller';
import { MotorMasterModule } from './masters/motor-master/motor-master.module';

// import { ControllerMasterController } from './masters/controller_master/controller.controller';
// import { ControllerMasterService } from './masters/controller_master/controller.service';

@Module({
  imports: [ 
    ClientsModule.register([
      {
        name: 'DEVICE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),DeviceModule,RIDModule,MotorMasterModule],
  controllers: [AppController,StateController,VendorController,SimController,ConfigController,GatewayAgencyController,GatewayControllerMaster],
  providers: [AppService,HealthCheckMicroservicesService,StateService,VendorService,SimService,ConfigService,GatewayAgencyMasterService,GatewayControllerMasterService],
})
export class AppModule {}

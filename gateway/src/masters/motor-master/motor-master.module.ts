import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GatewayMotorMasterController } from './motor_master.controller';
import { GatewayControllerMasterService } from '../controller-master/controller-master.service';
;


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
    ])],
  controllers: [GatewayMotorMasterController],
  providers: [GatewayControllerMasterService],
})
export class MotorMasterModule {}

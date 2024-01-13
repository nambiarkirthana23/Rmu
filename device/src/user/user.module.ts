import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CommonService } from "src/device/services/common-service";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserRoles } from "./user_roles.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([User,UserRoles]),
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
    controllers:[UserController],
    providers:[UserService,CommonService],
    exports:[]
})
export class UserModule{}
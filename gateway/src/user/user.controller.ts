import { Body, Controller,Delete,Get,HttpStatus,Param,Post,Put,Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { CONSTANT_MSG } from "src/common-dto/const";
import { UserDto } from "./user.dto";

@Controller('user')
export class UserController{
    constructor(private readonly userService:UserService){}
    @Post('/add')
    async addUser(@Body() body: UserDto, @Res() res: any,) {
        try {
          console.log("body ",body);
          let resp = await this.userService.addUser(body);
    
          if (resp.code === 'ECONNREFUSED') {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send({ error: 'Device Microservice ECONNREFUSED' });
          } else if (resp.statusCode === HttpStatus.CREATED) {
            res.status(resp.statusCode).send({ success: resp.message ,});
          } else {
            res.status(resp.statusCode).send({ error: resp.message });
          }
        } catch (error) {
         console.log(error);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
            statusCode: false,
          });
        }
      }


      @Get('/users')
      async getAllUser( @Res() res: any,) {
        try {
          let resp = await this.userService.getAllUser();
    
          if (resp.code === 'ECONNREFUSED') {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send({ error: 'Device Microservice ECONNREFUSED' });
          } else if (resp.statusCode === HttpStatus.OK) {
            res.status(resp.statusCode).send({ success: resp.message ,data:resp.data});
          } else {
            res.status(resp.statusCode).send({ error: resp.message });
          }
        } catch (error) {
         console.log(error);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
            statusCode: false,
          });
        }
      }



      @Get('/:id')
      async getUserById( @Res() res: any,@Param('id') id:number) {
        try {
          let resp = await this.userService.getUserById(id);
    
          if (resp.code === 'ECONNREFUSED') {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send({ error: 'Device Microservice ECONNREFUSED' });
          } else if (resp.statusCode === HttpStatus.OK) {
            res.status(resp.statusCode).send({ success: resp.message ,data:resp.data});
          } else {
            res.status(resp.statusCode).send({ error: resp.message });
          }
        } catch (error) {
         console.log(error);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
            statusCode: false,
          });
        }

}



@Put('update/:id')
async updateUser( @Res() res: any,@Param('id') id:number,@Body() body:UserDto) {
  try {
    let resp = await this.userService.updateUser(id,body);

    if (resp.code === 'ECONNREFUSED') {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'Device Microservice ECONNREFUSED' });
    } else if (resp.statusCode === HttpStatus.ACCEPTED) {
      res.status(resp.statusCode).send({ success: resp.message });
    } else {
      res.status(resp.statusCode).send({ error: resp.message });
    }
  } catch (error) {
   console.log(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
      statusCode: false,
    });
  }
}


@Delete('delete/:id')
async deleteUser( @Res() res: any,@Param('id') id:number) {
  try {
    console.log("id",id);
    let resp = await this.userService.deleteUser(id);

    if (resp.code === 'ECONNREFUSED') {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'Device Microservice ECONNREFUSED' });
    } else if (resp.statusCode === HttpStatus.ACCEPTED) {
      res.status(resp.statusCode).send({ success: resp.message });
    } else {
      res.status(resp.statusCode).send({ error: resp.message });
    }
  } catch (error) {
   console.log(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
      statusCode: false,
    });
  }
}

}
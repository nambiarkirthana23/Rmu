import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CommonService } from "src/device/services/common-service";
import { CONSTANT_MSG } from "src/common-dto/const";
import { HttpStatus } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { UserRoles } from "./user_roles.entity";
import { hash, compare } from 'bcrypt';
import * as bcrypt from 'bcrypt';

export class UserService{
  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    private readonly commonService:CommonService
  ){}


  async addUser(body: UserDto) {
    try {
      console.log("body",body)
     const{role,email,password,name,mobile,agency,department}=body;
      let exist = await this.findOneWithEmail(email);
      console.log("exist", exist);
      let hashedPassword=await hash(body.password,10);
      if (!exist) {
        return this.commonService.errorMessage('', CONSTANT_MSG.EMAIL_NOT_FOUND, HttpStatus.NOT_FOUND);
      } else {
       let user=await this.userRepository.create({role,email,password:hashedPassword,name,mobile,agency,department})
        let resp = await this.userRepository.save(user);
        if (!resp) {
          return this.commonService.errorMessage('', CONSTANT_MSG.FAIL_TOADD_USER, HttpStatus.BAD_REQUEST)
        }
        else {
          return this.commonService.successMessage(resp, CONSTANT_MSG.USER_ADDED_SUCCESSFULLY, HttpStatus.CREATED)
        }
      }
    }
    catch (error) {
      console.log(error);
      return this.commonService.errorMessage('', CONSTANT_MSG.INTERNAL_SERVER_ERR, HttpStatus.INTERNAL_SERVER_ERROR)

    }
  
  }
  



//    async addUser(body:UserDto)
//   {
//     try{

//    let exist=await this.findOneWithEmail(body.email)
//    console.log("exist",exist);
   
//    if(!exist)
//    {
//     return this.commonService.errorMessage('',CONSTANT_MSG.EMAIL_NOT_FOUND,HttpStatus.NOT_FOUND);
//    }else{
    
//     let resp=await this.userRepository.save(body);
//     if(!resp)
//     {
//      return this.commonService.errorMessage('',CONSTANT_MSG.FAIL_TOADD_USER,HttpStatus.BAD_REQUEST)
//     }
//     else{
//      return this.commonService.successMessage(resp,CONSTANT_MSG.USER_ADDED_SUCCESSFULLY,HttpStatus.CREATED)
//     }
//     }
// }
//     catch(error)
//     {
//         console.log(error);
//         return this.commonService.errorMessage('',CONSTANT_MSG.INTERNAL_SERVER_ERR,HttpStatus.INTERNAL_SERVER_ERROR)

//     }
//   }



  async findOneWithEmail(email:string)
  {
    try{
        console.log("email",email);
    let query=await this.userRepository.createQueryBuilder('a')
    .select(['a.ref_id', 'a.name', 'a.password', 'a.email', 'a.department', 'b.role as role'])
    .innerJoin('roles_tbl', 'b', 'a.role = b.ref_id')
    .where('a.email = :email', { email });
    if(!query)
    {
        return this.commonService.errorMessage('',CONSTANT_MSG.EMAIL_NOT_FOUND,HttpStatus.BAD_REQUEST);
    }
    else{
        return this.commonService.successMessage(query,CONSTANT_MSG.FOUND_EMAIL,HttpStatus.OK)
    }
  }
  catch(error)

  {
    return this.commonService.errorMessage('',CONSTANT_MSG.INTERNAL_SERVER_ERR,HttpStatus.INTERNAL_SERVER_ERROR)
  }

}


    async getAllUser()
    {
        try{
          let resp=await this.userRepository.find();
          if(!resp)
          {
            return this.commonService.errorMessage('',CONSTANT_MSG.FAIL_TO_RETRIEVE_USER_DETAILS,HttpStatus.BAD_REQUEST);
          }
          else{
            return this.commonService.successMessage(resp,CONSTANT_MSG.RETRIEVED_USER_DETAILS_SUCCESSFULLY,HttpStatus.OK);
          }
        }
        catch(error)
        {
         console.log(error);
         return this.commonService.errorMessage('',CONSTANT_MSG.INTERNAL_SERVER_ERR,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async getUserById(id:number)
    {
        try{
         let resp=await this.userRepository.findOne({where:{ref_id:id}});
       if(!resp)
       {
        return this.commonService.errorMessage('',CONSTANT_MSG.FAIL_TO_RETRIEVE_USER_DETAILS,HttpStatus.BAD_REQUEST);
    
       }
       else{
        return this.commonService.successMessage(resp,CONSTANT_MSG.RETRIEVED_USER_DETAILS_SUCCESSFULLY,HttpStatus.OK)
       }
        }
        catch(error)
        {
        return this.commonService.errorMessage('',CONSTANT_MSG.INTERNAL_SERVER_ERR,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async updateUser(id:number,body:UserDto)
    {
      try{
        let ref_id=await this.userRepository.findOne({where:{ref_id:id}});
        if(!ref_id)
          {
            return this.commonService.errorMessage('',CONSTANT_MSG.ID_NOT_FOUND,HttpStatus.NOT_FOUND);
          }
          else{
            let resp=await this.userRepository.update({ref_id:id},body);
            if(!resp)
            {
              return this.commonService.successMessage(resp,CONSTANT_MSG.FAIL_TO_UPDATE_USER,HttpStatus.BAD_REQUEST);
            }
            else{
              return this.commonService.errorMessage('',CONSTANT_MSG.UPDATED_USER_SUCCESSFULLY,HttpStatus.ACCEPTED);
            }
          }
      }
      catch(error)
      {
        console.log(error);
       return this.commonService.errorMessage('',CONSTANT_MSG.INTERNAL_SERVER_ERR,HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }


    async deleteUser(id:number)
    {
      try{
        console.log("user service",id);
      let idToDelete=await this.userRepository.findOne({where:{ref_id:id}});
      console.log("id to delete",idToDelete);
      if(!idToDelete)
      {
        return this.commonService.errorMessage('',CONSTANT_MSG.ID_NOT_FOUND,HttpStatus.BAD_REQUEST);
        
      }
      else{
        let resp=await this.userRepository.delete({ref_id:id});
        console.log(resp);
        if(resp.affected>0)
        {
        return this.commonService.successMessage(resp,CONSTANT_MSG.USER_DELETED_SUCCESSFULLY,HttpStatus.ACCEPTED)
      }
      else{
        return  this.commonService.errorMessage('',CONSTANT_MSG.FAILED_TO_DELETE_USER,HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }
  catch(error)
  {
    console.log(error);
    return this.commonService.errorMessage('',CONSTANT_MSG.INTERNAL_SERVER_ERR,HttpStatus.INTERNAL_SERVER_ERROR)
  }
}


async signIn(body: { email: string; password: string }) {
  try {
    console.log("signIn body",body);
    const { email, password } = body;

    let user = await this.userRepository
      .createQueryBuilder('a')
      .select([
        'a.ref_id as ref_id',
        'a.email as email',
        'a.password as password',
        'a.name as name',
        'a.department as department',
        'b.role as role',
      ])
      .innerJoin(UserRoles, 'b', 'a.role = b.ref_id')
      .where('a.email = :email', { email })
      .getRawOne(); 
    console.log('user', user);
  

    if (!user) {
      // return { loggedIn: false, user: null, password, role: null };
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.USER_DOES_NOT_EXIST,
        HttpStatus.NOT_FOUND,
      );
    }
    console.log("password",password);
   console.log("password",user.password);
    
    // const validPassword = password == user.password;
    const validPassword = await bcrypt.compare(password, user.password);
    
      console.log(" validpassword",validPassword)
    if (!validPassword) {
     
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.PASSWORD_DOES_NOT_MATCH,
        HttpStatus.BAD_REQUEST,
      );
    }

   
    return this.commonService.successMessage(
      user,
      CONSTANT_MSG.FETCH_SUCCESSFULLY,
      HttpStatus.OK,
    );
   
  } catch (err) {
    console.log('err', err);
    return this.commonService.errorMessage(
      [],
      CONSTANT_MSG.INTERNAL_SERVER_ERR,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

}
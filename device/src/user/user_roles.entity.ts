import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({name:'roles_tbl'})
export class UserRoles
{
 @PrimaryGeneratedColumn({name:'ref_id'})
 ref_id:number;

 @Column()
 role:string;


 @OneToMany(() => User, user => user.role) 
 users: User[];


}
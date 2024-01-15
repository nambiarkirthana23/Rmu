import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "./user_roles.entity";

@Entity({name:'users_tbl'})
export class User{

    @PrimaryGeneratedColumn({name:'ref_id'})
    ref_id:number;
    
    @Column()
    role:number

    @ManyToOne(() => UserRoles, role => role.users)
    @JoinColumn({ name: 'role' })
    roles: UserRoles;
  


    // @ManyToOne(() => UserRoles, userRole => userRole.users)
    // @JoinColumn({ name: 'role' }) 
    // role: UserRoles;

    @Column({name:'email'})
    email:string

    @Column({name:'password'})
    password:string;

    @Column({name:'name'})
    name:string;

    @Column({name:'mobile'})
    mobile:string;

    @Column({name:'agency'})
    agency:number;

    @Column({name:'department'})
    department:string;


   



}
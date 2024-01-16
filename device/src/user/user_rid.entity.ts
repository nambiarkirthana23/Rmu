import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'user_rids'})
export class UserRid{

    @PrimaryGeneratedColumn({name:'ref_id'})
    ref_id:number;

    @Column({name:'device_reg_ref_id'})
    device_reg_ref_id:number;

    @Column({name:'rid_ref_id'})
    rid_ref_id:number;

    



}
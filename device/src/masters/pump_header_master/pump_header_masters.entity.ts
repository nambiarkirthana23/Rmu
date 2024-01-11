import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('pump_head_master')
export class PumpHeader

{
    @PrimaryGeneratedColumn({name:'ref_id'})
    ref_id:number;

    @Column({name:'code'})
    code:string;
    
    @Column({name:'description'})
    description:string;


}